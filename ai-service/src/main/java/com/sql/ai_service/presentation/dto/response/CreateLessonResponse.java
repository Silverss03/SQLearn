package com.sql.ai_service.presentation.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateLessonResponse {
    private String lessonId;
    private String initialDraft;
}
