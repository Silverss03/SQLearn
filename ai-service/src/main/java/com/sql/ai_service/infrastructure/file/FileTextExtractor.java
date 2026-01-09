package com.sql.ai_service.infrastructure.file;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Component
@RequiredArgsConstructor
public class FileTextExtractor {
    
    private final List<FileProcessor> processors;
    
    public String extractTextFromFile(MultipartFile file) throws Exception {
        String contentType = file.getContentType();
        String filename = file.getOriginalFilename();
        
        for (FileProcessor processor : processors) {
            if (processor.supports(contentType, filename)) {
                return processor.extractText(file);
            }
        }
        
        throw new UnsupportedOperationException(
            "Unsupported file type: " + contentType + " for file: " + filename
        );
    }
}
