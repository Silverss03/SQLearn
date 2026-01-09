package com.sql.ai_service.infrastructure.persistence.repository;

import com.sql.ai_service.infrastructure.persistence.jpa.ConversationJpaEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface ConversationJpaRepository extends JpaRepository<ConversationJpaEntity, UUID> {
}
