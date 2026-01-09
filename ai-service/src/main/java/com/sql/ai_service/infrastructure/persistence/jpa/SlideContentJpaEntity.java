package com.sql.ai_service.infrastructure.persistence.jpa;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

/**
 * JPA Entity - Database mapping ONLY
 */
@Entity
@Table(name = "slide_contents",
       uniqueConstraints = @UniqueConstraint(columnNames = {"lesson_id", "slide_index"}))
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SlideContentJpaEntity {
    
    @Id
    private UUID id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "lesson_id", nullable = false)
    private LessonJpaEntity lesson;
    
    @Column(name = "slide_index", nullable = false)
    private Integer slideIndex;
    
    @Column(name = "raw_text", nullable = false, columnDefinition = "TEXT")
    private String rawText;
    
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;
}
