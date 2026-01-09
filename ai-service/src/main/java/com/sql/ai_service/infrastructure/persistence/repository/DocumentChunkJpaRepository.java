package com.sql.ai_service.infrastructure.persistence.repository;

import com.sql.ai_service.infrastructure.persistence.jpa.DocumentChunkJpaEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface DocumentChunkJpaRepository extends JpaRepository<DocumentChunkJpaEntity, UUID> {
    List<DocumentChunkJpaEntity> findByDocumentIdOrderByChunkIndexAsc(UUID documentId);

    void deleteByDocumentId(UUID documentId);

    @Query(value = """
        SELECT * FROM document_chunks
        WHERE document_id = :documentId
        AND to_tsvector('english', content) @@ plainto_tsquery('english', :query)
        ORDER BY ts_rank(to_tsvector('english', content), plainto_tsquery('english', :query)) DESC
        LIMIT :limit
        """, nativeQuery = true)
    List<DocumentChunkJpaEntity> searchByFullText(
            @Param("documentId") UUID documentId,
            @Param("query") String query,
            @Param("limit") int limit
    );
}
