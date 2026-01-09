package com.sql.ai_service.infrastructure.persistence.mapper;

import com.sql.ai_service.domain.model.Lesson;
import com.sql.ai_service.domain.model.SlideContent;
import com.sql.ai_service.infrastructure.persistence.jpa.LessonJpaEntity;
import com.sql.ai_service.infrastructure.persistence.jpa.SlideContentJpaEntity;
import org.springframework.stereotype.Component;

import java.util.stream.Collectors;

@Component
public class LessonMapper {
    
    /**
     * Domain → Entity
     */
    public LessonJpaEntity toEntity(Lesson domain) {
        if (domain == null) return null;
        
        LessonJpaEntity entity = LessonJpaEntity.builder()
                .id(domain.getId())
                .title(domain.getTitle())
                .subject(domain.getSubject())
                .originalFilename(domain.getOriginalFilename())
                .currentContent(domain.getCurrentContent())
                .status(domain.getStatus() != null ? domain.getStatus().name() : null)
                .createdAt(domain.getCreatedAt())
                .updatedAt(domain.getUpdatedAt())
                .build();
        
        // Map slides
        if (domain.getSlides() != null) {
            entity.setSlides(domain.getSlides().stream()
                    .map(slide -> toSlideEntity(slide, entity))
                    .collect(Collectors.toList()));
        }
        
        return entity;
    }
    
    /**
     *  Entity → Domain
     */
    public Lesson toDomain(LessonJpaEntity entity) {
        if (entity == null) return null;
        
        Lesson domain = Lesson.builder()
                .id(entity.getId())
                .title(entity.getTitle())
                .subject(entity.getSubject())
                .originalFilename(entity.getOriginalFilename())
                .currentContent(entity.getCurrentContent())
                .status(entity.getStatus() != null ? Lesson.LessonStatus.valueOf(entity.getStatus()) : null)
                .createdAt(entity.getCreatedAt())
                .updatedAt(entity.getUpdatedAt())
                .build();
        
        // Map slides
        if (entity.getSlides() != null) {
            domain.setSlides(entity.getSlides().stream()
                    .map(this::toSlideDomain)
                    .collect(Collectors.toList()));
        }
        
        return domain;
    }
    
    private SlideContentJpaEntity toSlideEntity(SlideContent domain, LessonJpaEntity lesson) {
        return SlideContentJpaEntity.builder()
                .id(domain.getId())
                .lesson(lesson)
                .slideIndex(domain.getSlideIndex())
                .rawText(domain.getRawText())
                .createdAt(domain.getCreatedAt())
                .build();
    }
    
    private SlideContent toSlideDomain(SlideContentJpaEntity entity) {
        return SlideContent.builder()
                .id(entity.getId())
                .lessonId(entity.getLesson().getId())
                .slideIndex(entity.getSlideIndex())
                .rawText(entity.getRawText())
                .createdAt(entity.getCreatedAt())
                .build();
    }
}
