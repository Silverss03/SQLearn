package com.sql.ai_service.infrastructure.openrouter;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OpenRouterResponse {
    private List<OpenRouterChoice> choices;
}
