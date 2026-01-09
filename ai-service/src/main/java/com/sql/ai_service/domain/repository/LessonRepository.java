package com.sql.ai_service.domain.repository;

import com.sql.ai_service.domain.model.Lesson;

import java.util.Optional;
import java.util.UUID;

public interface LessonRepository {
    
    Lesson save(Lesson lesson);
    
    Optional<Lesson> findById(UUID id);
    
}
