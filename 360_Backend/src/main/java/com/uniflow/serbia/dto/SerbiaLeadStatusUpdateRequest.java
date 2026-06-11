package com.uniflow.serbia.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

/**
 * DTO for admin to update Serbia lead status.
 */
public class SerbiaLeadStatusUpdateRequest {

    @NotBlank(message = "Status is required")
    @Pattern(
        regexp = "^(NEW_LEAD|CONTACTED|DOCUMENT_PENDING|QUALIFIED|CONVERTED|REJECTED)$",
        message = "Invalid status. Must be one of: NEW_LEAD, CONTACTED, DOCUMENT_PENDING, QUALIFIED, CONVERTED, REJECTED"
    )
    @JsonProperty("status")
    private String status;

    @JsonProperty("notes")
    private String notes;

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
}
