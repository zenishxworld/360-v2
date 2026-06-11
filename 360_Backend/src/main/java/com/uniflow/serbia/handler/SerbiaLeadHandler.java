package com.uniflow.serbia.handler;

import com.uniflow.auth.dto.UserJwtDto;
import com.uniflow.auth.util.JwtUtils;
import com.uniflow.common.dto.ApiResponse;
import com.uniflow.serbia.dto.SerbiaLeadRequest;
import com.uniflow.serbia.dto.SerbiaLeadResponse;
import com.uniflow.serbia.service.SerbiaLeadService;
import jakarta.validation.Validator;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;
import reactor.core.publisher.Mono;

import java.util.UUID;
import java.util.stream.Collectors;

/**
 * Student-facing handler for Serbia lead operations.
 * POST /api/v1/serbia/leads - Submit a new lead
 * GET  /api/v1/serbia/leads/my - Get my leads
 * GET  /api/v1/serbia/leads/{id} - Get a specific lead
 */
@Component
@RequiredArgsConstructor
@Slf4j
public class SerbiaLeadHandler {

    private final SerbiaLeadService serbiaLeadService;
    private final JwtUtils jwtUtils;
    private final Validator validator;

    /**
     * POST /api/v1/serbia/leads
     * Submit a new Serbia interest lead.
     */
    public Mono<ServerResponse> submitLead(ServerRequest request) {
        log.info("📋 Processing Serbia lead submission");

        return jwtUtils.getUserFromServerRequest(request)
            .flatMap(user -> {
                log.info("Student {} ({}) submitting Serbia lead", user.getUsername(), user.getId());
                return request.bodyToMono(SerbiaLeadRequest.class)
                    .flatMap(dto -> {
                        // Validate
                        var violations = validator.validate(dto);
                        if (!violations.isEmpty()) {
                            String errors = violations.stream()
                                .map(v -> v.getPropertyPath() + ": " + v.getMessage())
                                .collect(Collectors.joining(", "));
                            return Mono.error(new IllegalArgumentException(errors));
                        }
                        String studentName = getUserDisplayName(user);
                        return serbiaLeadService.createLead(dto, user.getId(), studentName);
                    });
            })
            .flatMap(response -> ServerResponse.status(HttpStatus.CREATED)
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(ApiResponse.success(response, "Serbia lead submitted successfully")))
            .onErrorResume(IllegalArgumentException.class, e -> {
                log.warn("⚠️ Invalid Serbia lead request: {}", e.getMessage());
                return ServerResponse.badRequest()
                    .contentType(MediaType.APPLICATION_JSON)
                    .bodyValue(ApiResponse.error("Invalid request: " + e.getMessage()));
            })
            .onErrorResume(e -> {
                log.error("❌ Error submitting Serbia lead", e);
                return ServerResponse.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .contentType(MediaType.APPLICATION_JSON)
                    .bodyValue(ApiResponse.error("Failed to submit lead: " + e.getMessage()));
            });
    }

    /**
     * GET /api/v1/serbia/leads/my
     * Get all leads for the authenticated student.
     */
    public Mono<ServerResponse> getMyLeads(ServerRequest request) {
        log.info("📋 Fetching Serbia leads for authenticated student");

        return jwtUtils.getUserFromServerRequest(request)
            .flatMapMany(user -> {
                log.info("Student {} ({}) fetching their Serbia leads", user.getUsername(), user.getId());
                return serbiaLeadService.getLeadsByStudent(user.getId());
            })
            .collectList()
            .flatMap(leads -> ServerResponse.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(ApiResponse.success(leads, "Serbia leads retrieved successfully")))
            .onErrorResume(e -> {
                log.error("❌ Error fetching Serbia leads", e);
                return ServerResponse.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .contentType(MediaType.APPLICATION_JSON)
                    .bodyValue(ApiResponse.error("Failed to fetch leads: " + e.getMessage()));
            });
    }

    /**
     * GET /api/v1/serbia/leads/{id}
     * Get a specific lead by ID (student-scoped).
     */
    public Mono<ServerResponse> getLeadById(ServerRequest request) {
        String leadId = request.pathVariable("id");
        log.info("📋 Fetching Serbia lead: {}", leadId);

        return jwtUtils.getUserFromServerRequest(request)
            .flatMap(user -> {
                try {
                    UUID uuid = UUID.fromString(leadId);
                    return serbiaLeadService.getLeadById(uuid, user.getId());
                } catch (IllegalArgumentException e) {
                    return Mono.error(new IllegalArgumentException("Invalid lead ID format"));
                }
            })
            .flatMap(response -> ServerResponse.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(ApiResponse.success(response, "Serbia lead retrieved successfully")))
            .onErrorResume(IllegalArgumentException.class, e -> {
                log.warn("⚠️ Invalid lead ID: {}", leadId);
                return ServerResponse.badRequest()
                    .contentType(MediaType.APPLICATION_JSON)
                    .bodyValue(ApiResponse.error(e.getMessage()));
            })
            .onErrorResume(SecurityException.class, e -> {
                log.warn("⚠️ Access denied for lead: {}", leadId);
                return ServerResponse.status(HttpStatus.FORBIDDEN)
                    .contentType(MediaType.APPLICATION_JSON)
                    .bodyValue(ApiResponse.error(e.getMessage()));
            })
            .onErrorResume(e -> {
                log.error("❌ Error fetching Serbia lead: {}", leadId, e);
                return ServerResponse.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .contentType(MediaType.APPLICATION_JSON)
                    .bodyValue(ApiResponse.error("Failed to fetch lead: " + e.getMessage()));
            });
    }

    private String getUserDisplayName(UserJwtDto user) {
        if (user.getFullName() != null && !user.getFullName().isBlank()) {
            return user.getFullName();
        }
        return user.getUsername();
    }
}
