package com.sql.ai_service.domain.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;


@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Lesson {
    
    private UUID id;
    private String title;
    private String subject;
    private String originalFilename;
    private String currentContent;
    private LessonStatus status;
    
    @Builder.Default
    private List<SlideContent> slides = new ArrayList<>();
    
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    

    public static Lesson create(String filename, String content) {
        return Lesson.builder()
                .id(UUID.randomUUID())
                .originalFilename(filename)
                .currentContent(content)
                .status(LessonStatus.DRAFT)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .slides(new ArrayList<>())
                .build();
    }
    

    public void addSlide(int index, String text) {
        SlideContent slide = SlideContent.builder()
                .id(UUID.randomUUID())
                .lessonId(this.id)
                .slideIndex(index)
                .rawText(text)
                .createdAt(LocalDateTime.now())
                .build();
        slides.add(slide);
    }
    
    public void updateContent(String newContent) {
        this.currentContent = newContent;
        this.updatedAt = LocalDateTime.now();
    }
    
    public void publish() {
        this.status = LessonStatus.PUBLISHED;
        this.updatedAt = LocalDateTime.now();
    }
    
    public enum LessonStatus {
        DRAFT,
        PUBLISHED,
        ARCHIVED
    }
}
