package com.sql.ai_service.application.service;

import com.sql.ai_service.domain.model.DocumentChunk;
import com.sql.ai_service.domain.model.Lesson;
import com.sql.ai_service.domain.repository.DocumentChunkRepository;
import com.sql.ai_service.domain.repository.LessonRepository;
import com.sql.ai_service.infrastructure.file.DocumentChunker;
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
    private final DocumentChunkRepository documentChunkRepository;
    private final DocumentChunker documentChunker;

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

        var chunks = documentChunker.chunkText(fullContent);
        log.info("Created {} chunks for lesson {}", chunks.size(), lesson.getId());

        var documentChunks = new java.util.ArrayList<DocumentChunk>();
        for (int i = 0; i < chunks.size(); i++) {
            var chunk = DocumentChunk.createChunk(
                lesson.getId(),
                chunks.get(i),
                null,
                i
            );
            documentChunks.add(chunk);
        }
        documentChunkRepository.saveAll(documentChunks);
        log.info("Saved {} chunks to database", documentChunks.size());

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

    @Transactional(readOnly = true)
    public java.util.List<DocumentChunk> findRelevantChunks(java.util.UUID lessonId, String query, int limit) {
        return documentChunkRepository.searchRelevantChunks(lessonId, query, limit);
    }

    @Transactional(readOnly = true)
    public java.util.List<DocumentChunk> getChunksByLessonId(java.util.UUID lessonId) {
        return documentChunkRepository.findByDocumentId(lessonId);
    }
}
