package com.sql.ai_service.presentation.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RefactorRequest {
    
    private String fullContent;
    
    private RefactorOptions options;
}
