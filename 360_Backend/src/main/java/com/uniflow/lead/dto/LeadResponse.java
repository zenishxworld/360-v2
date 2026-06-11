package com.uniflow.lead.dto;

public class LeadResponse {

    private boolean success;
    private String message;
    private String leadId;

    public LeadResponse() {
    }

    public LeadResponse(boolean success, String message, String leadId) {
        this.success = success;
        this.message = message;
        this.leadId = leadId;
    }

    public static LeadResponse success(String leadId) {
        return new LeadResponse(true, "Lead saved successfully", leadId);
    }

    public static LeadResponse failure(String message) {
        return new LeadResponse(false, message, null);
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getLeadId() {
        return leadId;
    }

    public void setLeadId(String leadId) {
        this.leadId = leadId;
    }
}
