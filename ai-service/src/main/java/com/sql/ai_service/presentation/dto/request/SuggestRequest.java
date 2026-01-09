package com.sql.ai_service.presentation.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SuggestRequest {
    
    private String currentContent;
    
    private String subject; // SQL, Python, Java...
}
