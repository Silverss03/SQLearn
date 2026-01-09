package com.sql.ai_service.domain.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Builder
@AllArgsConstructor
public class DocumentChunk {
    private UUID id;
    private UUID documentId;
    private String content;
    private Integer pageNumber;
    private Integer chunkIndex;
    private LocalDateTime createdAt;

    public static DocumentChunk createChunk(
            UUID documentId,
            String content,
            Integer pageNumber,
            Integer chunkIndex
    ) {
        return DocumentChunk.builder()
                .id(UUID.randomUUID())
                .documentId(documentId)
                .content(content)
                .pageNumber(pageNumber)
                .chunkIndex(chunkIndex)
                .createdAt(LocalDateTime.now())
                .build();
    }

    public boolean hasValidContent() {
        return content != null && !content.trim().isEmpty();
    }

    public int getContentLength() {
        return content != null ? content.length() : 0;
    }
}
