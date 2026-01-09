package com.sql.ai_service.infrastructure.persistence.repository;

import com.sql.ai_service.domain.model.DocumentChunk;
import com.sql.ai_service.domain.repository.DocumentChunkRepository;
import com.sql.ai_service.infrastructure.persistence.mapper.DocumentChunkMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Repository
@RequiredArgsConstructor
public class DocumentChunkRepositoryImpl implements DocumentChunkRepository {

    private final DocumentChunkJpaRepository jpaRepository;
    private final DocumentChunkMapper mapper;

    @Override
    @Transactional
    public DocumentChunk save(DocumentChunk chunk) {
        var entity = mapper.toEntity(chunk);
        var saved = jpaRepository.save(entity);
        return mapper.toDomain(saved);
    }

    @Override
    @Transactional
    public List<DocumentChunk> saveAll(List<DocumentChunk> chunks) {
        var entities = chunks.stream()
                .map(mapper::toEntity)
                .toList();
        var saved = jpaRepository.saveAll(entities);
        return mapper.toDomainList(saved);
    }

    @Override
    @Transactional(readOnly = true)
    public List<DocumentChunk> findByDocumentId(UUID documentId) {
        var entities = jpaRepository.findByDocumentIdOrderByChunkIndexAsc(documentId);
        return mapper.toDomainList(entities);
    }

    @Override
    @Transactional(readOnly = true)
    public List<DocumentChunk> searchRelevantChunks(UUID documentId, String query, int limit) {
        var entities = jpaRepository.searchByFullText(documentId, query, limit);
        return mapper.toDomainList(entities);
    }

    @Override
    @Transactional
    public void deleteByDocumentId(UUID documentId) {
        jpaRepository.deleteByDocumentId(documentId);
    }
}
