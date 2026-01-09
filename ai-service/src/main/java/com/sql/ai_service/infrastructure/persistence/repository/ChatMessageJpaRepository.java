package com.sql.ai_service.infrastructure.persistence.repository;

import com.sql.ai_service.infrastructure.persistence.jpa.ChatMessageJpaEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ChatMessageJpaRepository extends JpaRepository<ChatMessageJpaEntity, UUID> {
    List<ChatMessageJpaEntity> findByConversationIdOrderByCreatedAtAsc(UUID conversationId);
}
