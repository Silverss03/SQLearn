package com.sql.ai_service.presentation.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RefactorOptions {
    private Boolean addExamples = false;
    private Boolean addExercises = false;
    private String targetLevel = "beginner"; // beginner, intermediate, advanced
}
