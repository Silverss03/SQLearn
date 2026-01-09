package com.sql.ai_service.presentation.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateLessonRequest {
    
    @NotNull(message = "Teacher ID không được null")
    private Long teacherId;
    
    @NotBlank(message = "Prompt không được trống")
    private String prompt;
}
