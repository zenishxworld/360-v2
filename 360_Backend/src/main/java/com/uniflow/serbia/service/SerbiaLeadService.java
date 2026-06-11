package com.uniflow.serbia.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.uniflow.serbia.dto.SerbiaLeadRequest;
import com.uniflow.serbia.dto.SerbiaLeadResponse;
import com.uniflow.serbia.dto.SerbiaLeadStatusUpdateRequest;
import com.uniflow.serbia.entity.SerbiaLead;
import com.uniflow.serbia.repository.SerbiaLeadRepository;
import com.uniflow.auth.repository.UserRepository;
import com.uniflow.auth.entity.User;
import io.r2dbc.postgresql.codec.Json;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.UUID;

/**
 * Service for Serbia lead management.
 * Handles lead creation, retrieval, and status updates.
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class SerbiaLeadService {

    private final SerbiaLeadRepository serbiaLeadRepository;
    private final UserRepository userRepository;
    private final ObjectMapper objectMapper;

    /**
     * Create a new Serbia lead for an authenticated student.
     */
    @Transactional
    public Mono<SerbiaLeadResponse> createLead(SerbiaLeadRequest request, Long studentId, String studentName) {
        log.info("Creating Serbia lead for student: {} ({})", studentName, studentId);

        SerbiaLead lead = new SerbiaLead();
        lead.setId(UUID.randomUUID());
        lead.setStudentId(studentId);
        lead.setPreferredIntake(request.getPreferredIntake());
        lead.setPreferredDegree(request.getPreferredDegree());
        lead.setStatus("NEW_LEAD");
        lead.setSubmittedAt(LocalDateTime.now());
        lead.setCreatedAt(LocalDateTime.now());
        lead.setUpdatedAt(LocalDateTime.now());

        if (request.getAdditionalNotes() != null) {
            lead.setAdditionalNotes(request.getAdditionalNotes());
        }

        try {
            String universitiesJson = objectMapper.writeValueAsString(request.getInterestedUniversities());
            lead.setInterestedUniversities(Json.of(universitiesJson));

            String coursesJson = objectMapper.writeValueAsString(request.getInterestedCourses());
            lead.setInterestedCourses(Json.of(coursesJson));
        } catch (JsonProcessingException e) {
            log.error("Failed to serialize universities/courses to JSON", e);
            return Mono.error(new RuntimeException("Failed to process lead data"));
        }

        return serbiaLeadRepository.save(lead)
            .map(saved -> mapToResponse(saved, studentName, null));
    }

    /**
     * Get all leads for a specific student.
     */
    public Flux<SerbiaLeadResponse> getLeadsByStudent(Long studentId) {
        log.info("Fetching Serbia leads for student: {}", studentId);
        return serbiaLeadRepository.findByStudentId(studentId)
            .flatMap(lead -> enrichWithStudentInfo(lead));
    }

    /**
     * Get a single lead by ID (with student context check).
     */
    public Mono<SerbiaLeadResponse> getLeadById(UUID leadId, Long studentId) {
        log.info("Fetching Serbia lead: {} for student: {}", leadId, studentId);
        return serbiaLeadRepository.findById(leadId)
            .flatMap(lead -> {
                // Students can only see their own leads
                if (!lead.getStudentId().equals(studentId)) {
                    return Mono.error(new SecurityException("Access denied: You can only view your own leads"));
                }
                return enrichWithStudentInfo(lead);
            });
    }

    /**
     * Get all leads (admin only).
     */
    public Flux<SerbiaLeadResponse> getAllLeads() {
        log.info("Admin fetching all Serbia leads");
        return serbiaLeadRepository.findAllOrdered()
            .flatMap(this::enrichWithStudentInfo);
    }

    /**
     * Get a single lead by ID (admin).
     */
    public Mono<SerbiaLeadResponse> getLeadByIdAdmin(UUID leadId) {
        log.info("Admin fetching Serbia lead: {}", leadId);
        return serbiaLeadRepository.findById(leadId)
            .flatMap(this::enrichWithStudentInfo);
    }

    /**
     * Update lead status (admin only).
     */
    @Transactional
    public Mono<SerbiaLeadResponse> updateLeadStatus(UUID leadId, SerbiaLeadStatusUpdateRequest request, String adminName) {
        log.info("Admin {} updating Serbia lead {} status to {}", adminName, leadId, request.getStatus());
        return serbiaLeadRepository.findById(leadId)
            .flatMap(lead -> {
                lead.setStatus(request.getStatus());
                lead.setUpdatedAt(LocalDateTime.now());
                lead.setUpdatedBy(adminName);
                return serbiaLeadRepository.save(lead);
            })
            .flatMap(this::enrichWithStudentInfo);
    }

    /**
     * Enrich lead with student name/email from user table.
     */
    private Mono<SerbiaLeadResponse> enrichWithStudentInfo(SerbiaLead lead) {
        return userRepository.findById(lead.getStudentId())
            .map(user -> mapToResponse(lead, getStudentDisplayName(user), user.getEmail()))
            .defaultIfEmpty(mapToResponse(lead, "Unknown Student", null));
    }

    private String getStudentDisplayName(User user) {
        if (user.getFirstName() != null && user.getLastName() != null) {
            return user.getFirstName() + " " + user.getLastName();
        }
        if (user.getFirstName() != null) {
            return user.getFirstName();
        }
        return user.getUsername();
    }

    /**
     * Map entity to response DTO.
     */
    private SerbiaLeadResponse mapToResponse(SerbiaLead lead, String studentName, String studentEmail) {
        SerbiaLeadResponse response = new SerbiaLeadResponse();
        response.setId(lead.getId());
        response.setStudentId(lead.getStudentId());
        response.setStudentName(studentName);
        response.setStudentEmail(studentEmail);
        response.setPreferredIntake(lead.getPreferredIntake());
        response.setPreferredDegree(lead.getPreferredDegree());
        response.setAdditionalNotes(lead.getAdditionalNotes());
        response.setStatus(lead.getStatus());
        response.setSubmittedAt(lead.getSubmittedAt());
        response.setCreatedAt(lead.getCreatedAt());
        response.setUpdatedAt(lead.getUpdatedAt());
        response.setUpdatedBy(lead.getUpdatedBy());

        // Deserialize JSONB arrays
        response.setInterestedUniversities(deserializeJsonArray(lead.getInterestedUniversities()));
        response.setInterestedCourses(deserializeJsonArray(lead.getInterestedCourses()));

        return response;
    }

    private List<String> deserializeJsonArray(Json json) {
        if (json == null) return Collections.emptyList();
        try {
            return objectMapper.readValue(json.asString(), new TypeReference<List<String>>() {});
        } catch (Exception e) {
            log.warn("Failed to deserialize JSON array: {}", e.getMessage());
            return Collections.emptyList();
        }
    }
}
