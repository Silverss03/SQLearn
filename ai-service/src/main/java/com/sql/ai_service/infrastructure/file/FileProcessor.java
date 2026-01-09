package com.sql.ai_service.infrastructure.file;

import org.springframework.web.multipart.MultipartFile;


public interface FileProcessor {

    boolean supports(String contentType, String filename);

    String extractText(MultipartFile file) throws Exception;
}
