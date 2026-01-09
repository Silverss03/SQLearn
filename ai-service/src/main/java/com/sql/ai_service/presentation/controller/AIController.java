package com.sql.ai_service.presentation.controller;

import com.sql.ai_service.application.service.ChatService;
import com.sql.ai_service.application.service.ContentGenerationService;
import com.sql.ai_service.application.service.LessonService;
import com.sql.ai_service.domain.model.Conversation;
import com.sql.ai_service.presentation.dto.request.AIInteractionRequest;
import com.sql.ai_service.presentation.dto.response.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/ai")
@RequiredArgsConstructor
public class AIController {

    private final LessonService lessonService;
    private final ChatService chatService;
    private final ContentGenerationService contentGenerationService;

    @PostMapping(value = "/interact", consumes = "multipart/form-data")
    public ResponseEntity<ApiResponse<AIInteractionResponse>> interact(@ModelAttribute AIInteractionRequest request) {

        String responseContent;
        String type;

        UUID conversationId = request.getConversationId();
        Conversation conversation = chatService.startOrResumeConversation(
                conversationId, 
                request.getPrompt() != null ? request.getPrompt() : "New Interaction"
        );
        conversationId = conversation.getId();


        if (request.getFile() != null) {
            CreateLessonResponse response = lessonService.createLesson(request.getPrompt(), request.getFile(), request.getModel());
            responseContent = response.getInitialDraft();
            type = "create";
            
            UUID lessonId = UUID.fromString(response.getLessonId());
            chatService.linkConversationToLesson(conversationId, lessonId);

            chatService.recordInteraction(conversationId, 
                    "Create lesson with prompt: " + request.getPrompt(), 
                    responseContent);
        }
        else if (request.getSelectedText() != null && !request.getSelectedText().isBlank()) {

             EditResponse response = contentGenerationService.editWithContext(request.getSelectedText(), request.getPrompt(), request.getModel());
             responseContent = response.getResult();
             type = "edit";
             

             chatService.recordInteraction(conversationId, 
                     "Edit text: " + request.getSelectedText() + "\nCommand: " + request.getPrompt(), 
                     responseContent);
        }
        else if (request.getCurrentContent() != null && !request.getCurrentContent().isBlank()) {

             SuggestResponse response = contentGenerationService.suggestWithContext(request.getCurrentContent(), request.getPrompt(), request.getModel());
             responseContent = response.getSuggestion();
             type = "suggest";
             

             chatService.recordInteraction(conversationId, 
                     "Suggest content for: " + request.getCurrentContent() + "\nSubject: " + request.getPrompt(), 
                     responseContent);
        }
        else {

             ChatResponse response = chatService.chatWithContext(Collections.singletonList(request.getPrompt()), request.getModel(), conversationId);
             responseContent = response.getReply();
             type = "chat";
        }
        

        request.setConversationId(conversationId);

        AIInteractionResponse response = AIInteractionResponse.builder()
                .content(responseContent)
                .type(type)
                .conversationId(request.getConversationId())
                .timestamp(LocalDateTime.now().toString())
                .build();

        return ResponseEntity.ok(ApiResponse.success(response));
    }
}
