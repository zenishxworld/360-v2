package com.uniflow.chat.handler;

import com.uniflow.chat.dto.ChatRequest;
import com.uniflow.chat.service.ChatService;
import com.uniflow.common.dto.ApiResponse;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validator;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;
import reactor.core.publisher.Mono;

/**
 * WebFlux handler for the AI chat endpoint.
 * POST /api/v1/public/chat
 */
@Slf4j
@Component
public class ChatHandler {

    private final ChatService chatService;
    private final Validator validator;

    public ChatHandler(ChatService chatService, Validator validator) {
        this.chatService = chatService;
        this.validator = validator;
    }

    /**
     * Handle chat request: POST /api/v1/public/chat
     *
     * Request body:
     * {
     *   "country": "italy",
     *   "message": "Can I work while studying?"
     * }
     *
     * Success Response (200):
     * {
     *   "answer": "..."
     * }
     *
     * Error Response (4xx/5xx):
     * {
     *   "success": false,
     *   "message": "...",
     *   "data": null
     * }
     */
    public Mono<ServerResponse> chat(ServerRequest request) {
        log.info("🔍 POST /api/v1/public/chat");

        return request.bodyToMono(ChatRequest.class)
            .flatMap(this::validateRequest)
            .flatMap(chatService::processChat)
            .flatMap(response ->
                ServerResponse.ok()
                    .contentType(MediaType.APPLICATION_JSON)
                    .bodyValue(response)
            )
            .onErrorResume(IllegalArgumentException.class, e -> {
                log.warn("⚠️ Bad request: {}", e.getMessage());
                return ServerResponse.badRequest()
                    .contentType(MediaType.APPLICATION_JSON)
                    .bodyValue(ApiResponse.error(e.getMessage()));
            })
            .onErrorResume(e -> {
                log.error("❌ Chat error: {}", e.getMessage(), e);
                return ServerResponse.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .contentType(MediaType.APPLICATION_JSON)
                    .bodyValue(ApiResponse.error(
                        "An unexpected error occurred while processing your request. Please try again later.",
                        "CHAT_ERROR",
                        Map.of("detail", e.getMessage())
                    ));
            });
    }

    private Mono<ChatRequest> validateRequest(ChatRequest request) {
        Set<ConstraintViolation<ChatRequest>> violations = validator.validate(request);
        if (!violations.isEmpty()) {
            String message = violations.stream()
                .map(v -> v.getPropertyPath() + ": " + v.getMessage())
                .collect(Collectors.joining(", "));
            return Mono.error(new IllegalArgumentException(message));
        }
        return Mono.just(request);
    }
}
