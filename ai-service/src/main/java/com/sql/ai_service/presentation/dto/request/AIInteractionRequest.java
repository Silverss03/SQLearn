package com.sql.ai_service.presentation.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AIInteractionRequest {
    
    private MultipartFile file;
    private String prompt;
    private String selectedText;
    private String currentContent;
    private String model;
    private UUID conversationId;
}
