package com.sql.ai_service.infrastructure.persistence.jpa;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

/**
 * JPA Entity - Database mapping ONLY
 */
@Entity
@Table(name = "lessons")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LessonJpaEntity {
    
    @Id
    private UUID id;

    
    @Column(name = "title")
    private String title;
    
    @Column(name = "subject", length = 100)
    private String subject;
    
    @Column(name = "original_filename")
    private String originalFilename;
    
    @Column(name = "current_content", columnDefinition = "TEXT")
    private String currentContent;
    
    @Column(name = "status", length = 50)
    private String status;
    
    @OneToMany(mappedBy = "lesson", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<SlideContentJpaEntity> slides = new ArrayList<>();
    
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;
    
    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
}
