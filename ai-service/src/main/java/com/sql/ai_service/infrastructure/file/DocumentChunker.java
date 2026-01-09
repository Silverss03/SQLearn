package com.sql.ai_service.infrastructure.file;

import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class DocumentChunker {

    private static final int DEFAULT_CHUNK_SIZE = 800;
    private static final int DEFAULT_OVERLAP_SIZE = 100;

    public List<String> chunkText(String text) {
        return chunkText(text, DEFAULT_CHUNK_SIZE, DEFAULT_OVERLAP_SIZE);
    }

    public List<String> chunkText(String text, int chunkSize, int overlapSize) {
        if (text == null || text.isEmpty()) {
            return List.of();
        }

        if (chunkSize <= 0) {
            throw new IllegalArgumentException("Chunk size must be positive");
        }

        if (overlapSize < 0 || overlapSize >= chunkSize) {
            throw new IllegalArgumentException("Overlap size must be non-negative and less than chunk size");
        }

        List<String> chunks = new ArrayList<>();
        int textLength = text.length();
        int position = 0;

        while (position < textLength) {
            int endPosition = Math.min(position + chunkSize, textLength);

            if (endPosition < textLength) {
                int lastSpace = text.lastIndexOf(' ', endPosition);
                if (lastSpace > position) {
                    endPosition = lastSpace;
                }
            }

            String chunk = text.substring(position, endPosition).trim();
            if (!chunk.isEmpty()) {
                chunks.add(chunk);
            }

            position += (chunkSize - overlapSize);
            if (position <= endPosition - chunkSize + overlapSize) {
                position = endPosition;
            }
        }

        return chunks;
    }
}
