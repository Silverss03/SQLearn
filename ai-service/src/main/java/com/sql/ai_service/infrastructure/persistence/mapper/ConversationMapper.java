package com.sql.ai_service.infrastructure.persistence.mapper;

import com.sql.ai_service.domain.model.Conversation;
import com.sql.ai_service.infrastructure.persistence.jpa.ConversationJpaEntity;
import org.springframework.stereotype.Component;

@Component
public class ConversationMapper {

    public ConversationJpaEntity toJpaEntity(Conversation domain) {
        if (domain == null) {
            return null;
        }

        return ConversationJpaEntity.builder()
                .id(domain.getId())
                .title(domain.getTitle())
                .createdAt(domain.getCreatedAt())
                .updatedAt(domain.getUpdatedAt())
                .build();
    }

    public Conversation toDomain(ConversationJpaEntity jpa) {
        if (jpa == null) {
            return null;
        }

        return Conversation.builder()
                .id(jpa.getId())
                .title(jpa.getTitle())
                .createdAt(jpa.getCreatedAt())
                .updatedAt(jpa.getUpdatedAt())
                .build();
    }
}
