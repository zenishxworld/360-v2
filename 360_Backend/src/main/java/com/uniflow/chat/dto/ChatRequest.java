package com.uniflow.chat.dto;

import jakarta.validation.constraints.NotBlank;

public class ChatRequest {

    @NotBlank(message = "Country is required")
    private String country;

    @NotBlank(message = "Message is required")
    private String message;

    public ChatRequest() {
    }

    public ChatRequest(String country, String message) {
        this.country = country;
        this.message = message;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
