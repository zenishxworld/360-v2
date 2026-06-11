package com.uniflow.lead.dto;

import jakarta.validation.constraints.NotBlank;
import java.util.List;

public class LeadRequest {

    @NotBlank(message = "Name is required")
    private String name;

    @NotBlank(message = "WhatsApp number is required")
    private String whatsapp;

    @NotBlank(message = "Country is required")
    private String country;

    private String source = "AI Chatbot";

    private String pageUrl = "";

    private List<String> questionsAsked;

    public LeadRequest() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getWhatsapp() {
        return whatsapp;
    }

    public void setWhatsapp(String whatsapp) {
        this.whatsapp = whatsapp;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getSource() {
        return source;
    }

    public void setSource(String source) {
        this.source = source;
    }

    public String getPageUrl() {
        return pageUrl;
    }

    public void setPageUrl(String pageUrl) {
        this.pageUrl = pageUrl;
    }

    public List<String> getQuestionsAsked() {
        return questionsAsked;
    }

    public void setQuestionsAsked(List<String> questionsAsked) {
        this.questionsAsked = questionsAsked;
    }
}
