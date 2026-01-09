package com.sql.ai_service.infrastructure.file;
import org.apache.poi.xslf.usermodel.XMLSlideShow;
import org.apache.poi.xslf.usermodel.XSLFShape;
import org.apache.poi.xslf.usermodel.XSLFSlide;
import org.apache.poi.xslf.usermodel.XSLFTextShape;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

@Component
public class PPTFileProcessor implements FileProcessor {
    
    @Override
    public boolean supports(String contentType, String filename) {
        return "application/vnd.openxmlformats-officedocument.presentationml.presentation".equals(contentType) ||
               (filename != null && (filename.toLowerCase().endsWith(".pptx") || filename.toLowerCase().endsWith(".ppt")));
    }
    
    @Override
    public String extractText(MultipartFile file) throws Exception {

        StringBuilder text = new StringBuilder();
        
        try (XMLSlideShow ppt = new XMLSlideShow(file.getInputStream())) {
            for (XSLFSlide slide : ppt.getSlides()) {
                for (XSLFShape shape : slide.getShapes()) {
                    if (shape instanceof XSLFTextShape) {
                        XSLFTextShape textShape = (XSLFTextShape) shape;
                        text.append(textShape.getText()).append("\n");
                    }
                }
                text.append("\n--- Slide Break ---\n\n");
            }
        }
        
        return text.toString();
    }
}
