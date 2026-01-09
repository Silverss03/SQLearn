package com.sql.ai_service.infrastructure.file;

import org.apache.pdfbox.Loader;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

@Component
public class PDFFileProcessor implements FileProcessor {
    
    @Override
    public boolean supports(String contentType, String filename) {
        return "application/pdf".equals(contentType) ||
               (filename != null && filename.toLowerCase().endsWith(".pdf"));
    }
    
    @Override
    public String extractText(MultipartFile file) throws Exception {
        try (PDDocument document = Loader.loadPDF(file.getInputStream().readAllBytes())) {
            PDFTextStripper stripper = new PDFTextStripper();
            return stripper.getText(document);
        }
    }
}
