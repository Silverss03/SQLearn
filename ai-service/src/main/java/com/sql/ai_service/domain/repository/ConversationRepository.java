package com.sql.ai_service.domain.repository;

import com.sql.ai_service.domain.model.Conversation;

import java.util.Optional;
import java.util.UUID;

public interface ConversationRepository {
    Conversation save(Conversation conversation);
    Optional<Conversation> findById(UUID id);
    boolean existsById(UUID id);
    void deleteById(UUID id);
}
