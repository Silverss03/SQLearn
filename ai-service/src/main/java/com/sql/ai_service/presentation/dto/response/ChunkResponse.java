package com.sql.ai_service.presentation.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChunkResponse {
    private String id;
    private String content;
    private Integer pageNumber;
    private Integer chunkIndex;
}
