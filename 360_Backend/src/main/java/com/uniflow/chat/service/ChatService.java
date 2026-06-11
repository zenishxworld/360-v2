package com.uniflow.chat.service;

import com.uniflow.chat.dto.ChatRequest;
import com.uniflow.chat.dto.ChatResponse;
import java.io.IOException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

/**
 * Orchestrates the AI chat flow:
 * 1. Load the country knowledge base
 * 2. Build the system prompt with KB context
 * 3. Send to DeepSeek API
 * 4. Return the answer
 */
@Slf4j
@Service
public class ChatService {

    private static final String SYSTEM_PROMPT_TEMPLATE = """
        You are Uni360 AI.
        You are an international education counselor.
        
        Answer ONLY using information provided in the supplied country knowledge base below.
        If the information is not available in the knowledge base, clearly state:
        "I currently do not have verified information about that topic."
        
        Never invent information.
        Never hallucinate.
        Use student-friendly language.
        Use bullet points whenever useful.
        Keep answers concise and practical.
        
        === COUNTRY KNOWLEDGE BASE ===
        
        %s
        
        === END OF KNOWLEDGE BASE ===
        
        Remember: Only answer based on the knowledge base above. If the user asks about something not covered, politely say you don't have verified information about that topic.
        """;

    private final KnowledgeBaseService knowledgeBaseService;
    private final DeepSeekService deepSeekService;

    public ChatService(KnowledgeBaseService knowledgeBaseService, DeepSeekService deepSeekService) {
        this.knowledgeBaseService = knowledgeBaseService;
        this.deepSeekService = deepSeekService;
    }

    /**
     * Process a chat request for a specific country.
     */
    public Mono<ChatResponse> processChat(ChatRequest request) {
        String country = request.getCountry().trim().toLowerCase();
        String userMessage = request.getMessage().trim();

        log.info("═══════════════════════════════════════════════════════════");
        log.info("💬 Chat request received");
        log.info("   🌍 Country: {}", country);
        log.info("   📝 Message: {}", truncate(userMessage, 200));
        log.info("═══════════════════════════════════════════════════════════");

        // Validate message is not empty
        if (userMessage.isEmpty()) {
            return Mono.error(new IllegalArgumentException("Message must not be empty"));
        }

        // Load knowledge base synchronously (fast filesystem operation)
        String knowledgeBase;
        try {
            knowledgeBase = knowledgeBaseService.loadKnowledgeBase(country);
            log.info("📚 KB loaded successfully ({} chars)", knowledgeBase.length());
        } catch (IllegalArgumentException e) {
            log.error("❌ Country KB not found: {}", country);
            return Mono.error(e);
        } catch (IOException e) {
            log.error("❌ Error reading KB file for country {}: {}", country, e.getMessage());
            return Mono.error(new RuntimeException("Failed to load knowledge base for: " + country, e));
        }

        // Build the system prompt with knowledge base context
        String systemPrompt = String.format(SYSTEM_PROMPT_TEMPLATE, knowledgeBase);

        // Send to DeepSeek API
        return deepSeekService.chatCompletion(systemPrompt, userMessage)
            .map(answer -> {
                log.info("✅ Chat response generated successfully");
                return new ChatResponse(answer);
            });
    }

    private String truncate(String str, int maxLength) {
        if (str == null) return "null";
        return str.length() <= maxLength ? str : str.substring(0, maxLength) + "...";
    }
}
