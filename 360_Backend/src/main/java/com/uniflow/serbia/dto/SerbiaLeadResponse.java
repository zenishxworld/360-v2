package com.uniflow.serbia.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

/**
 * Response DTO for Serbia lead data.
 */
public class SerbiaLeadResponse {

    private UUID id;

    @JsonProperty("student_id")
    private Long studentId;

    @JsonProperty("student_name")
    private String studentName;

    @JsonProperty("student_email")
    private String studentEmail;

    @JsonProperty("preferred_intake")
    private String preferredIntake;

    @JsonProperty("preferred_degree")
    private String preferredDegree;

    @JsonProperty("interested_universities")
    private List<String> interestedUniversities;

    @JsonProperty("interested_courses")
    private List<String> interestedCourses;

    @JsonProperty("additional_notes")
    private String additionalNotes;

    private String status;

    @JsonProperty("submitted_at")
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime submittedAt;

    @JsonProperty("created_at")
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime createdAt;

    @JsonProperty("updated_at")
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime updatedAt;

    @JsonProperty("updated_by")
    private String updatedBy;

    // ─── Getters and Setters ───

    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }

    public Long getStudentId() { return studentId; }
    public void setStudentId(Long studentId) { this.studentId = studentId; }

    public String getStudentName() { return studentName; }
    public void setStudentName(String studentName) { this.studentName = studentName; }

    public String getStudentEmail() { return studentEmail; }
    public void setStudentEmail(String studentEmail) { this.studentEmail = studentEmail; }

    public String getPreferredIntake() { return preferredIntake; }
    public void setPreferredIntake(String preferredIntake) { this.preferredIntake = preferredIntake; }

    public String getPreferredDegree() { return preferredDegree; }
    public void setPreferredDegree(String preferredDegree) { this.preferredDegree = preferredDegree; }

    public List<String> getInterestedUniversities() { return interestedUniversities; }
    public void setInterestedUniversities(List<String> interestedUniversities) { this.interestedUniversities = interestedUniversities; }

    public List<String> getInterestedCourses() { return interestedCourses; }
    public void setInterestedCourses(List<String> interestedCourses) { this.interestedCourses = interestedCourses; }

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
