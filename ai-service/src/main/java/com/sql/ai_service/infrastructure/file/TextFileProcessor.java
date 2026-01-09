package com.sql.ai_service.infrastructure.file;

import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.stream.Collectors;

@Component
public class TextFileProcessor implements FileProcessor {
    
    @Override
    public boolean supports(String contentType, String filename) {
        return contentType != null && contentType.startsWith("text/") ||
               filename != null && filename.toLowerCase().endsWith(".txt");
    }
    
    @Override
    public String extractText(MultipartFile file) throws Exception {
        
        try (BufferedReader reader = new BufferedReader(
                new InputStreamReader(file.getInputStream(), StandardCharsets.UTF_8))) {
            return reader.lines().collect(Collectors.joining("\n"));
        }
    }
}
