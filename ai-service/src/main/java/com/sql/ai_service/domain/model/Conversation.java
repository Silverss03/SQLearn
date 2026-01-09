package com.sql.ai_service.domain.model;

import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Conversation {

    private UUID id;
    private String title;
    private UUID lessonId;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public static Conversation create(String title) {
        return Conversation.builder()
                .id(UUID.randomUUID())
                .title(title)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();
    }

    public void updateTitle(String newTitle) {
        this.title = newTitle;
        this.updatedAt = LocalDateTime.now();
    }

    public void linkToLesson(UUID lessonId) {
        this.lessonId = lessonId;
        this.updatedAt = LocalDateTime.now();
    }
}
