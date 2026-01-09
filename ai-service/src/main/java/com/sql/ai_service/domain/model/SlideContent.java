package com.sql.ai_service.domain.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;


@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SlideContent {
    
    private UUID id;
    private UUID lessonId;
    private Integer slideIndex;
    private String rawText;
    private LocalDateTime createdAt;

}
