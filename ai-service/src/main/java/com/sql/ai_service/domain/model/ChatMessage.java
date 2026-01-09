package com.sql.ai_service.domain.model;

import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChatMessage {

    private UUID id;
    private UUID conversationId;
    private String role;                                                                                                                                                                                                                                                        
    private String content;
    private LocalDateTime createdAt;

    public static ChatMessage create(UUID conversationId, String role, String content) {
        return ChatMessage.builder()
                .id(UUID.randomUUID())
                .conversationId(conversationId)
                .role(role)
                .content(content)
                .createdAt(LocalDateTime.now())
                .build();
    }
}
