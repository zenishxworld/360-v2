package com.uniflow.lead.handler;

import com.uniflow.common.dto.ApiResponse;
import com.uniflow.lead.dto.LeadRequest;
import com.uniflow.lead.dto.LeadResponse;
import com.uniflow.lead.service.LeadService;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validator;
import java.util.Set;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;
import reactor.core.publisher.Mono;

/**
 * Lead handler — receives lead data from the AI chatbot.
 * POST /api/v1/public/lead
 */
@Component
@RequiredArgsConstructor
@Slf4j
public class LeadHandler {

    private final LeadService leadService;
    private final Validator validator;

    /**
     * Submit a captured lead.
     * POST /api/v1/public/lead
     *
     * Request body:
     * {
     *   "name": "Zenish Patel",
     *   "whatsapp": "+919999999999",
     *   "country": "Italy",
     *   "source": "AI Chatbot",
     *   "pageUrl": "/study-in-italy",
     *   "questionsAsked": ["Scholarship", "Visa"]
     * }
     *
     * Success Response (200):
     * {
     *   "success": true,
     *   "message": "Lead saved successfully",
     *   "leadId": "LEAD-..."
     * }
     */
    public Mono<ServerResponse> submitLead(ServerRequest request) {
        log.info("📋 POST /api/v1/public/lead");

        return request.bodyToMono(LeadRequest.class)
            .flatMap(this::validateRequest)
            .flatMap(leadRequest -> {
                log.info("📋 Lead request validated: country={}, source={}",
                    leadRequest.getCountry(), leadRequest.getSource());
                return leadService.saveLead(leadRequest);
            })
            .flatMap(response ->
                ServerResponse.ok()
                    .contentType(MediaType.APPLICATION_JSON)
                    .bodyValue(response)
            )
            .onErrorResume(IllegalArgumentException.class, e -> {
                log.warn("⚠️ Invalid lead request: {}", e.getMessage());
                return ServerResponse.badRequest()
                    .contentType(MediaType.APPLICATION_JSON)
                    .bodyValue(LeadResponse.failure("Invalid request: " + e.getMessage()));
            })
            .onErrorResume(e -> {
                log.error("❌ Unexpected error processing lead", e);
                return ServerResponse.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .contentType(MediaType.APPLICATION_JSON)
                    .bodyValue(LeadResponse.failure("Failed to process lead. Please try again."));
            });
    }

    private Mono<LeadRequest> validateRequest(LeadRequest request) {
        Set<ConstraintViolation<LeadRequest>> violations = validator.validate(request);
        if (!violations.isEmpty()) {
            String message = violations.stream()
                .map(v -> v.getPropertyPath() + ": " + v.getMessage())
                .collect(Collectors.joining(", "));
            return Mono.error(new IllegalArgumentException(message));
        }
        return Mono.just(request);
    }
}
