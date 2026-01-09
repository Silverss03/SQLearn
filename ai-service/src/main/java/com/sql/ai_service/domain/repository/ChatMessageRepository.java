package com.sql.ai_service.domain.repository;

import com.sql.ai_service.domain.model.ChatMessage;

import java.util.List;
import java.util.UUID;

public interface ChatMessageRepository {
    ChatMessage save(ChatMessage chatMessage);
    List<ChatMessage> findByConversationIdOrderByCreatedAtAsc(UUID conversationId);
}
