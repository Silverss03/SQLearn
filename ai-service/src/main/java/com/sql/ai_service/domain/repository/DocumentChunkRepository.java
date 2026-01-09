package com.sql.ai_service.domain.repository;

import com.sql.ai_service.domain.model.DocumentChunk;

import java.util.List;
import java.util.UUID;

public interface DocumentChunkRepository {

    DocumentChunk save(DocumentChunk chunk);

    List<DocumentChunk> saveAll(List<DocumentChunk> chunks);

    List<DocumentChunk> findByDocumentId(UUID documentId);

    List<DocumentChunk> searchRelevantChunks(UUID documentId, String query, int limit);

    void deleteByDocumentId(UUID documentId);
}
