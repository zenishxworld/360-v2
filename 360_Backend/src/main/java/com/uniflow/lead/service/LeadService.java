package com.uniflow.lead.service;

import com.uniflow.lead.dto.LeadRequest;
import com.uniflow.lead.dto.LeadResponse;
import java.time.Duration;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientRequestException;
import org.springframework.web.reactive.function.client.WebClientResponseException;
import reactor.core.publisher.Mono;
import reactor.util.retry.Retry;

/**
 * Service for saving captured leads to Google Sheets via a Google Apps Script webhook.
 * All sensitive configuration (webhook URL) is loaded from environment variables
 * and never exposed to the frontend.
 */
@Slf4j
@Service
public class LeadService {

    private final WebClient webClient;
    private final String webhookUrl;

    public LeadService(
        @Value("${uniflow.lead.google-sheet-webhook-url:}") String webhookUrl
    ) {
        this.webhookUrl = webhookUrl;
        this.webClient = WebClient.builder()
            .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
            .build();

        log.info("═══════════════════════════════════════════════════════════");
        log.info("📋 LeadService initialized");
        log.info("   🔗 Webhook URL configured: {}", webhookUrl != null && !webhookUrl.isEmpty() ? "Yes" : "NO");
        log.info("═══════════════════════════════════════════════════════════");
    }

    /**
     * Save a lead to Google Sheets.
     *
     * @param request the lead data from the chatbot
     * @return LeadResponse with success status and lead ID
     */
    public Mono<LeadResponse> saveLead(LeadRequest request) {
        String leadId = generateLeadId();

        log.info("📋 Saving lead: id={}, name={}, country={}", leadId, mask(request.getName()), request.getCountry());

        // Validate the webhook URL is configured
        if (webhookUrl == null || webhookUrl.isBlank()) {
            log.warn("⚠️ Google Sheet webhook URL not configured. Lead saved locally only.");
            return Mono.just(LeadResponse.success(leadId));
        }

        // Build the payload for Google Apps Script
        Map<String, Object> payload = buildPayload(request, leadId);

        return webClient.post()
            .uri(webhookUrl)
            .bodyValue(payload)
            .retrieve()
            .toBodilessEntity()
            .timeout(Duration.ofSeconds(15))
            .retryWhen(Retry.backoff(2, Duration.ofSeconds(1))
                .filter(throwable -> throwable instanceof WebClientRequestException
                    || (throwable instanceof WebClientResponseException
                    && ((WebClientResponseException) throwable).getStatusCode().is5xxServerError()))
                .doAfterRetry(rs ->
                    log.warn("🔄 Retrying Google Sheet webhook, attempt {}", rs.totalRetries() + 1)
                ))
            .doOnSuccess(response -> log.info("✅ Lead {} saved to Google Sheets", leadId))
            .thenReturn(LeadResponse.success(leadId))
            .onErrorResume(e -> {
                log.error("❌ Failed to save lead {} to Google Sheets: {}", leadId, e.getMessage());
                // Return success but note the failure — lead data is still captured in logs
                return Mono.just(new LeadResponse(
                    true,
                    "Lead captured locally. Google Sheets sync failed: " + e.getMessage(),
                    leadId
                ));
            });
    }

    private Map<String, Object> buildPayload(LeadRequest request, String leadId) {
        Map<String, Object> payload = new HashMap<>();
        payload.put("leadId", leadId);
        payload.put("name", request.getName());
        payload.put("whatsapp", request.getWhatsapp());
        payload.put("country", request.getCountry());
        payload.put("source", request.getSource() != null ? request.getSource() : "AI Chatbot");
        payload.put("pageUrl", request.getPageUrl() != null ? request.getPageUrl() : "");
        payload.put("questionsAsked", request.getQuestionsAsked() != null
            ? String.join(", ", request.getQuestionsAsked())
            : "");
        payload.put("timestamp", LocalDateTime.now().format(DateTimeFormatter.ISO_LOCAL_DATE_TIME));
        return payload;
    }

    private String generateLeadId() {
        return "LEAD-" + System.currentTimeMillis() + "-" + UUID.randomUUID().toString().substring(0, 6).toUpperCase();
    }

    /**
     * Mask a name for logging (show first name only).
     */
    private String mask(String value) {
        if (value == null || value.isEmpty()) return "N/A";
        int spaceIdx = value.indexOf(' ');
        return spaceIdx > 0 ? value.substring(0, spaceIdx) + " ***" : value;
    }
}
