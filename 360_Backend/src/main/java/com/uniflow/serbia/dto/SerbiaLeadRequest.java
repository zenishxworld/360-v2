package com.uniflow.serbia.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import java.util.List;

/**
 * DTO for creating a new Serbia lead.
 */
public class SerbiaLeadRequest {

    @NotBlank(message = "Preferred intake is required")
    @JsonProperty("preferred_intake")
    private String preferredIntake;

    @NotBlank(message = "Preferred degree is required")
    @JsonProperty("preferred_degree")
    private String preferredDegree;

    @NotEmpty(message = "At least one university must be selected")
    @JsonProperty("interested_universities")
    private List<String> interestedUniversities;

    @NotEmpty(message = "At least one course must be selected")
    @JsonProperty("interested_courses")
    private List<String> interestedCourses;

    @JsonProperty("additional_notes")
    private String additionalNotes;

    // ─── Getters and Setters ───

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
}
