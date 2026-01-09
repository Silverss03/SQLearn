package com.sql.ai_service.infrastructure.persistence.repository;

import com.sql.ai_service.domain.model.Lesson;
import com.sql.ai_service.domain.repository.LessonRepository;
import com.sql.ai_service.infrastructure.persistence.jpa.LessonJpaEntity;
import com.sql.ai_service.infrastructure.persistence.mapper.LessonMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

/**
 * Repository Implementation - Infrastructure layer
 */
@Repository
@RequiredArgsConstructor
public class LessonRepositoryImpl implements LessonRepository {
    
    private final LessonJpaRepository jpaRepository;
    private final LessonMapper mapper;
    
    @Override
    public Lesson save(Lesson lesson) {
        LessonJpaEntity entity = mapper.toEntity(lesson);
        LessonJpaEntity saved = jpaRepository.save(entity);
        return mapper.toDomain(saved);
    }
    
    @Override
    public Optional<Lesson> findById(UUID id) {
        return jpaRepository.findById(id)
                .map(mapper::toDomain);
    }
    
}
