package com.sql.ai_service.infrastructure.persistence.repository;

import com.sql.ai_service.infrastructure.persistence.jpa.LessonJpaEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

/**
 * Spring Data JPA Repository
 */
@Repository
public interface LessonJpaRepository extends JpaRepository<LessonJpaEntity, UUID> {
}
