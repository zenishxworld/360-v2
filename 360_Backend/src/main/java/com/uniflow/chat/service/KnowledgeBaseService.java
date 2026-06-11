package com.uniflow.chat.service;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Service;

/**
 * Loads country knowledge base markdown files from the classpath.
 * Files are cached in memory after first read for performance.
 */
@Slf4j
@Service
public class KnowledgeBaseService {

    private static final String KB_DIRECTORY = "classpath:../data/KB/";

    private final ResourceLoader resourceLoader;
    private final Map<String, String> cache = new ConcurrentHashMap<>();

    @Value("${uniflow.chat.kb-directory:src/main/data/KB}")
    private String kbDirectory;

    public KnowledgeBaseService(ResourceLoader resourceLoader) {
        this.resourceLoader = resourceLoader;
    }

    /**
     * Load the knowledge base content for a given country.
     *
     * @param country the country name (e.g., "italy", "germany")
     * @return the full markdown content of the country's KB file
     * @throws IllegalArgumentException if the country is null/empty or the file is not found
     * @throws IOException             if the file cannot be read
     */
    public String loadKnowledgeBase(String country) throws IOException {
        if (country == null || country.isBlank()) {
            throw new IllegalArgumentException("Country must not be null or empty");
        }

        String normalizedCountry = country.trim().toLowerCase();
        log.info("📚 Loading knowledge base for country: {}", normalizedCountry);

        // Check cache first
        String cached = cache.get(normalizedCountry);
        if (cached != null) {
            log.info("✅ KB loaded from cache for country: {}", normalizedCountry);
            return cached;
        }

        // Try loading from classpath
        String content = loadFromClasspath(normalizedCountry);
        if (content != null) {
            cache.put(normalizedCountry, content);
            log.info("✅ KB loaded from classpath for country: {}", normalizedCountry);
            return content;
        }

        // Try loading from filesystem
        content = loadFromFileSystem(normalizedCountry);
        if (content != null) {
            cache.put(normalizedCountry, content);
            log.info("✅ KB loaded from filesystem for country: {}", normalizedCountry);
            return content;
        }

        log.error("❌ KB file not found for country: {}", normalizedCountry);
        throw new IllegalArgumentException(
            "Knowledge base not found for country: " + normalizedCountry
        );
    }

    private String loadFromClasspath(String country) {
        try {
            String filename = country + ".md";
            Resource resource = resourceLoader.getResource(KB_DIRECTORY + filename);
            if (resource.exists()) {
                byte[] bytes = resource.getInputStream().readAllBytes();
                return new String(bytes, StandardCharsets.UTF_8);
            }
        } catch (IOException e) {
            log.warn("Could not load KB from classpath for country {}: {}", country, e.getMessage());
        }
        return null;
    }

    private String loadFromFileSystem(String country) {
        try {
            String filename = country + ".md";
            Path filePath = Paths.get(kbDirectory, filename);
            if (Files.exists(filePath) && Files.isReadable(filePath)) {
                return Files.readString(filePath, StandardCharsets.UTF_8);
            }
        } catch (IOException e) {
            log.warn("Could not load KB from filesystem for country {}: {}", country, e.getMessage());
        }
        return null;
    }

    /**
     * Clear the in-memory cache for all countries.
     */
    public void clearCache() {
        cache.clear();
        log.info("🗑️ KB cache cleared");
    }

    /**
     * Check if a knowledge base file exists for the given country.
     */
    public boolean hasKnowledgeBase(String country) {
        try {
            loadKnowledgeBase(country);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
