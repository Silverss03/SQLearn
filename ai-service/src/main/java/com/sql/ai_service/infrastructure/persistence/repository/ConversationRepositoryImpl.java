package com.sql.ai_service.infrastructure.persistence.repository;

import com.sql.ai_service.domain.model.Conversation;
import com.sql.ai_service.domain.repository.ConversationRepository;
import com.sql.ai_service.infrastructure.persistence.mapper.ConversationMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Optional;
import java.util.UUID;

@Component
@RequiredArgsConstructor
public class ConversationRepositoryImpl implements ConversationRepository {

    private final ConversationJpaRepository jpaRepository;
    private final ConversationMapper mapper;

    @Override
    public Conversation save(Conversation conversation) {
        var jpa = mapper.toJpaEntity(conversation);
        var saved = jpaRepository.save(jpa);
        return mapper.toDomain(saved);
    }

    @Override
    public Optional<Conversation> findById(UUID id) {
        return jpaRepository.findById(id)
                .map(mapper::toDomain);
    }

    @Override
    public boolean existsById(UUID id) {
        return jpaRepository.existsById(id);
    }

    @Override
    public void deleteById(UUID id) {
        jpaRepository.deleteById(id);
    }
}
