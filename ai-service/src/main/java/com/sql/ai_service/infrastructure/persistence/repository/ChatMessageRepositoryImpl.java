package com.sql.ai_service.infrastructure.persistence.repository;

import com.sql.ai_service.domain.model.ChatMessage;
import com.sql.ai_service.domain.repository.ChatMessageRepository;
import com.sql.ai_service.infrastructure.persistence.mapper.ChatMessageMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class ChatMessageRepositoryImpl implements ChatMessageRepository {

    private final ChatMessageJpaRepository jpaRepository;
    private final ChatMessageMapper mapper;

    @Override
    public ChatMessage save(ChatMessage chatMessage) {
        var jpa = mapper.toJpaEntity(chatMessage);
        var saved = jpaRepository.save(jpa);
        return mapper.toDomain(saved);
    }

    @Override
    public List<ChatMessage> findByConversationIdOrderByCreatedAtAsc(UUID conversationId) {
        return jpaRepository.findByConversationIdOrderByCreatedAtAsc(conversationId)
                .stream()
                .map(mapper::toDomain)
                .collect(Collectors.toList());
    }
}
