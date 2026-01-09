package com.sql.ai_service.infrastructure.persistence.mapper;

import com.sql.ai_service.domain.model.ChatMessage;
import com.sql.ai_service.infrastructure.persistence.jpa.ChatMessageJpaEntity;
import com.sql.ai_service.infrastructure.persistence.jpa.ConversationJpaEntity;
import com.sql.ai_service.infrastructure.persistence.repository.ConversationJpaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ChatMessageMapper {

    private final ConversationJpaRepository conversationJpaRepository;

    public ChatMessageJpaEntity toJpaEntity(ChatMessage domain) {
        if (domain == null) {
            return null;
        }

        ConversationJpaEntity conversation = conversationJpaRepository
                .findById(domain.getConversationId())
                .orElseThrow(() -> new IllegalArgumentException(
                        "Conversation not found: " + domain.getConversationId()));

        return ChatMessageJpaEntity.builder()
                .id(domain.getId())
                .conversation(conversation)
                .role(domain.getRole())
                .content(domain.getContent())
                .createdAt(domain.getCreatedAt())
                .build();
    }

    public ChatMessage toDomain(ChatMessageJpaEntity jpa) {
        if (jpa == null) {
            return null;
        }

        return ChatMessage.builder()
                .id(jpa.getId())
                .conversationId(jpa.getConversationId())
                .role(jpa.getRole())
                .content(jpa.getContent())
                .createdAt(jpa.getCreatedAt())
                .build();
    }
}
