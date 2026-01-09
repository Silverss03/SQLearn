package com.sql.ai_service.application.service;

import com.sql.ai_service.domain.model.Lesson;
import com.sql.ai_service.domain.repository.LessonRepository;
import com.sql.ai_service.infrastructure.file.FileTextExtractor;
import com.sql.ai_service.presentation.dto.response.CreateLessonResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@Service
@RequiredArgsConstructor
public class LessonService {

    private final FileTextExtractor fileTextExtractor;
    private final LessonRepository lessonRepository;
    private final ContentGenerationService contentGenerationService;

    @Transactional
    public CreateLessonResponse createLesson(String prompt, MultipartFile file, String model) {

        String fullContent;
        try {
            fullContent = fileTextExtractor.extractTextFromFile(file);
        } catch (Exception e) {
            log.error("Failed to process file", e);
            throw new RuntimeException("Error processing file: " + e.getMessage());
        }

        Lesson lesson = Lesson.create(file.getOriginalFilename(), fullContent);

        lesson = lessonRepository.save(lesson);
        log.info("Lesson saved with ID: {}", lesson.getId());

        String[] slides = fullContent.split("\\n\\n+"); 
        for (int i = 0; i < slides.length; i++) {
            if (!slides[i].trim().isEmpty()) {
                lesson.addSlide(i + 1, slides[i].trim());
            }
        }

        String draft = contentGenerationService.generateInitialDraft(prompt, fullContent, model);

        lesson.updateContent(draft);
        lessonRepository.save(lesson);

        return new CreateLessonResponse(lesson.getId().toString(), draft);
    }
}
