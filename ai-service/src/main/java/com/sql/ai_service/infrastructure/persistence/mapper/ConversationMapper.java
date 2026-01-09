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
                .lessonId(domain.getLessonId())
                .createdAt(domain.getCreatedAt())
                .updatedAt(domain.getUpdatedAt())
                .build();
    }

    public Conversation toDomain(ConversationJpaEntity entity) {
        if (entity == null) {
            return null;
        }
        return Conversation.builder()
                .id(entity.getId())
                .title(entity.getTitle())
                .lessonId(entity.getLessonId())
                .createdAt(entity.getCreatedAt())
                .updatedAt(entity.getUpdatedAt())
                .build();
    }
}
