package com.sql.ai_service.infrastructure.file;

import org.apache.poi.xwpf.usermodel.XWPFDocument;
import org.apache.poi.xwpf.usermodel.XWPFParagraph;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

@Component
public class WordFileProcessor implements FileProcessor {
    
    @Override
    public boolean supports(String contentType, String filename) {
        return "application/vnd.openxmlformats-officedocument.wordprocessingml.document".equals(contentType) ||
               (filename != null && (filename.toLowerCase().endsWith(".docx") || filename.toLowerCase().endsWith(".doc")));
    }
    
    @Override
    public String extractText(MultipartFile file) throws Exception {

        StringBuilder text = new StringBuilder();
        
        try (XWPFDocument document = new XWPFDocument(file.getInputStream())) {
            for (XWPFParagraph paragraph : document.getParagraphs()) {
                text.append(paragraph.getText()).append("\n");
            }
        }
        
        return text.toString();
    }
}
