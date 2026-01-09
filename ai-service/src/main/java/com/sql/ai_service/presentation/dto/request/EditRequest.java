package com.sql.ai_service.presentation.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EditRequest {
    
    private String selectedText;
    
    private String command; // "clarify", "simplify", "expand", "formalize"
}
