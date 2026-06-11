package com.uniflow.chat.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.uniflow.chat.config.DeepSeekConfig;
import java.time.Duration;
import java.util.List;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientRequestException;
import org.springframework.web.reactive.function.client.WebClientResponseException;
import reactor.core.publisher.Mono;
import reactor.util.retry.Retry;

/**
 * Service for communicating with the DeepSeek API.
 * Uses OpenAI-compatible chat completions endpoint.
 */
@Slf4j
@Service
public class DeepSeekService {

    private static final String CHAT_ENDPOINT = "/v1/chat/completions";

    private final WebClient webClient;
    private final DeepSeekConfig config;
    private final ObjectMapper objectMapper;

    public DeepSeekService(DeepSeekConfig config, ObjectMapper objectMapper) {
        this.config = config;
        this.objectMapper = objectMapper;

        this.webClient = WebClient.builder()
            .baseUrl(config.getBaseUrl())
            .defaultHeader(HttpHeaders.AUTHORIZATION, "Bearer " + config.getApiKey())
            .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
            .build();

        log.info("═══════════════════════════════════════════════════════════");
        log.info("✅ DeepSeekService initialized");
        log.info("   📍 Base URL: {}", config.getBaseUrl());
        log.info("   🤖 Model: {}", config.getModel());
        log.info("   ⏱️  Timeout: {}s", config.getTimeout().toSeconds());
        log.info("   🔑 API Key configured: {}", config.getApiKey() != null && !config.getApiKey().isEmpty() ? "Yes" : "NO");
        log.info("═══════════════════════════════════════════════════════════");
    }

    /**
     * Send a chat completion request to DeepSeek API.
     *
     * @param systemPrompt the system message content
     * @param userMessage  the user message content
     * @return the assistant's response text
     */
    public Mono<String> chatCompletion(String systemPrompt, String userMessage) {
        log.info("🚀 Sending request to DeepSeek API");
        log.debug("   System prompt: {}...", truncate(systemPrompt, 100));
        log.debug("   User message: {}", truncate(userMessage, 100));

        ObjectNode requestBody = buildRequestBody(systemPrompt, userMessage);

        return webClient.post()
            .uri(CHAT_ENDPOINT)
            .bodyValue(requestBody)
            .retrieve()
            .bodyToMono(JsonNode.class)
            .doOnSuccess(response -> log.info("✅ DeepSeek API request successful"))
            .doOnError(error -> log.error("❌ DeepSeek API request failed: {}", error.getMessage()))
            .retryWhen(Retry.backoff(2, Duration.ofSeconds(1))
                .filter(throwable -> throwable instanceof WebClientRequestException
                    || (throwable instanceof WebClientResponseException
                    && ((WebClientResponseException) throwable).getStatusCode().is5xxServerError()))
                .doAfterRetry(rs -> log.warn("🔄 Retrying DeepSeek API call, attempt {}", rs.totalRetries() + 1)))
            .map(this::extractResponseText)
            .timeout(config.getTimeout());
    }

    private ObjectNode buildRequestBody(String systemPrompt, String userMessage) {
        ObjectNode root = objectMapper.createObjectNode();
        root.put("model", config.getModel());
        root.put("temperature", 0.7);
        root.put("max_tokens", 1500);

        ArrayNode messages = root.putArray("messages");

        ObjectNode systemMsg = messages.addObject();
        systemMsg.put("role", "system");
        systemMsg.put("content", systemPrompt);

        ObjectNode userMsg = messages.addObject();
        userMsg.put("role", "user");
        userMsg.put("content", userMessage);

        return root;
    }

    private String extractResponseText(JsonNode response) {
        try {
            return response.get("choices")
                .get(0)
                .get("message")
                .get("content")
                .asText();
        } catch (Exception e) {
            log.error("Failed to extract response text from DeepSeek response: {}", response);
            throw new RuntimeException("Unexpected response format from DeepSeek API", e);
        }
    }

    private String truncate(String str, int maxLength) {
        if (str == null) return "null";
        return str.length() <= maxLength ? str : str.substring(0, maxLength) + "...";
    }
}
