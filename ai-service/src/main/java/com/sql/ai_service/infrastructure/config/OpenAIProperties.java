package com.sql.ai_service.infrastructure.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Data
@Configuration
@ConfigurationProperties(prefix = "openai.api")
public class OpenAIProperties {
    private String key;
    private String model = "gpt-4";
    private Double temperature = 0.7;
    private Integer maxTokens = 1000;
}
