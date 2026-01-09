package com.sql.ai_service.infrastructure.persistence.mapper;

import com.sql.ai_service.domain.model.DocumentChunk;
import com.sql.ai_service.infrastructure.persistence.jpa.DocumentChunkJpaEntity;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;


@Component
public class DocumentChunkMapper {

    public DocumentChunkJpaEntity toEntity(DocumentChunk domain) {
        if (domain == null) {
            return null;
        }

        return DocumentChunkJpaEntity.builder()
                .id(domain.getId())
                .documentId(domain.getDocumentId())
                .content(domain.getContent())
                .pageNumber(domain.getPageNumber())
                .chunkIndex(domain.getChunkIndex())
                .createdAt(domain.getCreatedAt())
                .build();
    }

    public DocumentChunk toDomain(DocumentChunkJpaEntity entity) {
        if (entity == null) {
            return null;
        }

        return DocumentChunk.builder()
                .id(entity.getId())
                .documentId(entity.getDocumentId())
                .content(entity.getContent())
                .pageNumber(entity.getPageNumber())
                .chunkIndex(entity.getChunkIndex())
                .createdAt(entity.getCreatedAt())
                .build();
    }

    public List<DocumentChunk> toDomainList(List<DocumentChunkJpaEntity> entities) {
        if (entities == null) {
            return List.of();
        }

        return entities.stream()
                .map(this::toDomain)
                .collect(Collectors.toList());
    }
}
