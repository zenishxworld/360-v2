package com.uniflow.serbia.entity;

import java.time.LocalDateTime;
import java.util.UUID;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;

import io.r2dbc.postgresql.codec.Json;

/**
 * SerbiaLead - Lightweight lead entity for Serbia study interest submissions.
 * Separate from the main Application entity to avoid workflow engine coupling.
 * 
 * Status flow: NEW_LEAD → CONTACTED → DOCUMENT_PENDING → QUALIFIED → CONVERTED / REJECTED
 */
@Table("serbia_leads")
@JsonIgnoreProperties(ignoreUnknown = true)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class SerbiaLead {

    @Id
    @Column("id")
    private UUID id;

    @Column("student_id")
    private Long studentId;

    @Column("preferred_intake")
    private String preferredIntake;

    @Column("preferred_degree")
    private String preferredDegree;

    /**
     * JSONB array of selected university names/IDs.
     * Example: ["University of Belgrade", "University of Novi Sad"]
     */
    @Column("interested_universities")
    private Json interestedUniversities;

    /**
     * JSONB array of selected course names/IDs.
     * Example: ["Computer Science", "Software Engineering"]
     */
    @Column("interested_courses")
    private Json interestedCourses;

    @Column("additional_notes")
    private String additionalNotes;

    @Column("status")
    private String status = "NEW_LEAD";

    @CreatedDate
    @Column("submitted_at")
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime submittedAt;

    @CreatedDate
    @Column("created_at")
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column("updated_at")
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime updatedAt;

    @Column("updated_by")
    private String updatedBy;

    // ─── Getters and Setters ───

    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }

    public Long getStudentId() { return studentId; }
    public void setStudentId(Long studentId) { this.studentId = studentId; }

    public String getPreferredIntake() { return preferredIntake; }
    public void setPreferredIntake(String preferredIntake) { this.preferredIntake = preferredIntake; }

    public String getPreferredDegree() { return preferredDegree; }
    public void setPreferredDegree(String preferredDegree) { this.preferredDegree = preferredDegree; }

    public Json getInterestedUniversities() { return interestedUniversities; }
    public void setInterestedUniversities(Json interestedUniversities) { this.interestedUniversities = interestedUniversities; }

    public Json getInterestedCourses() { return interestedCourses; }
    public void setInterestedCourses(Json interestedCourses) { this.interestedCourses = interestedCourses; }

    public String getAdditionalNotes() { return additionalNotes; }
    public void setAdditionalNotes(String additionalNotes) { this.additionalNotes = additionalNotes; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public LocalDateTime getSubmittedAt() { return submittedAt; }
    public void setSubmittedAt(LocalDateTime submittedAt) { this.submittedAt = submittedAt; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }

    public String getUpdatedBy() { return updatedBy; }
    public void setUpdatedBy(String updatedBy) { this.updatedBy = updatedBy; }
}
