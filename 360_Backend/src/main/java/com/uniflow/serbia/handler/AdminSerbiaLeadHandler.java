package com.uniflow.serbia.handler;

import com.uniflow.auth.dto.UserJwtDto;
import com.uniflow.auth.util.JwtUtils;
import com.uniflow.common.dto.ApiResponse;
import com.uniflow.serbia.dto.SerbiaLeadStatusUpdateRequest;
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
 * Admin-facing handler for Serbia lead management.
 * GET  /api/v1/admin/serbia/leads - List all leads
 * GET  /api/v1/admin/serbia/leads/{id} - Get lead details
 * PUT  /api/v1/admin/serbia/leads/{id}/status - Update lead status
 */
@Component
@RequiredArgsConstructor
@Slf4j
public class AdminSerbiaLeadHandler {

    private final SerbiaLeadService serbiaLeadService;
    private final JwtUtils jwtUtils;
    private final Validator validator;

    /**
     * GET /api/v1/admin/serbia/leads
     * List all Serbia leads (admin only).
     */
    public Mono<ServerResponse> getAllLeads(ServerRequest request) {
        log.info("📋 Admin fetching all Serbia leads");

        return jwtUtils.getUserFromServerRequest(request)
            .flatMap(user -> {
                log.info("Admin {} ({}) fetching Serbia leads", user.getUsername(), user.getId());
                return serbiaLeadService.getAllLeads().collectList();
            })
            .flatMap(leads -> ServerResponse.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(ApiResponse.success(leads, "Serbia leads retrieved successfully")))
            .onErrorResume(e -> {
                log.error("❌ Error fetching all Serbia leads", e);
                return ServerResponse.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .contentType(MediaType.APPLICATION_JSON)
                    .bodyValue(ApiResponse.error("Failed to fetch leads: " + e.getMessage()));
            });
    }

    /**
     * GET /api/v1/admin/serbia/leads/{id}
     * Get a specific lead by ID (admin).
     */
    public Mono<ServerResponse> getLeadById(ServerRequest request) {
        String leadId = request.pathVariable("id");
        log.info("📋 Admin fetching Serbia lead: {}", leadId);

        try {
            UUID uuid = UUID.fromString(leadId);
            return serbiaLeadService.getLeadByIdAdmin(uuid)
                .flatMap(response -> ServerResponse.ok()
                    .contentType(MediaType.APPLICATION_JSON)
                    .bodyValue(ApiResponse.success(response, "Serbia lead retrieved successfully")))
                .switchIfEmpty(ServerResponse.notFound().build());
        } catch (IllegalArgumentException e) {
            return ServerResponse.badRequest()
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(ApiResponse.error("Invalid lead ID format"));
        }
    }

    /**
     * PUT /api/v1/admin/serbia/leads/{id}/status
     * Update a lead's status (admin only).
     */
    public Mono<ServerResponse> updateLeadStatus(ServerRequest request) {
        String leadId = request.pathVariable("id");
        log.info("📋 Admin updating Serbia lead status: {}", leadId);

        return jwtUtils.getUserFromServerRequest(request)
            .flatMap(user -> {
                return request.bodyToMono(SerbiaLeadStatusUpdateRequest.class)
                    .flatMap(dto -> {
                        // Validate
                        var violations = validator.validate(dto);
                        if (!violations.isEmpty()) {
                            String errors = violations.stream()
                                .map(v -> v.getPropertyPath() + ": " + v.getMessage())
                                .collect(Collectors.joining(", "));
                            return Mono.error(new IllegalArgumentException(errors));
                        }
                        try {
                            UUID uuid = UUID.fromString(leadId);
                            String adminName = getUserDisplayName(user);
                            return serbiaLeadService.updateLeadStatus(uuid, dto, adminName);
                        } catch (IllegalArgumentException e) {
                            return Mono.error(new IllegalArgumentException("Invalid lead ID format"));
                        }
                    });
            })
            .flatMap(response -> ServerResponse.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(ApiResponse.success(response, "Lead status updated successfully")))
            .onErrorResume(IllegalArgumentException.class, e -> {
                log.warn("⚠️ Invalid status update request: {}", e.getMessage());
                return ServerResponse.badRequest()
                    .contentType(MediaType.APPLICATION_JSON)
                    .bodyValue(ApiResponse.error(e.getMessage()));
            })
            .onErrorResume(e -> {
                log.error("❌ Error updating Serbia lead status: {}", leadId, e);
                return ServerResponse.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .contentType(MediaType.APPLICATION_JSON)
                    .bodyValue(ApiResponse.error("Failed to update lead status: " + e.getMessage()));
            });
    }

    private String getUserDisplayName(UserJwtDto user) {
        if (user.getFullName() != null && !user.getFullName().isBlank()) {
            return user.getFullName();
        }
        return user.getUsername();
    }
}
