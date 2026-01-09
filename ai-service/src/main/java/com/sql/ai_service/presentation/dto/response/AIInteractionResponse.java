package com.sql.ai_service.presentation.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AIInteractionResponse {
    private String content;
    private String type; // create, chat, edit, suggest
    private java.util.UUID conversationId;
    private String timestamp;
}
