package com.sql.ai_service.application.service;


import com.sql.ai_service.domain.model.ChatMessage;
import com.sql.ai_service.domain.model.Conversation;
import com.sql.ai_service.domain.model.DocumentChunk;
import com.sql.ai_service.domain.repository.ChatMessageRepository;
import com.sql.ai_service.domain.repository.ConversationRepository;
import com.sql.ai_service.infrastructure.openrouter.OpenRouterClient;
import com.sql.ai_service.infrastructure.openrouter.OpenRouterMessage;
import com.sql.ai_service.presentation.dto.response.ChatResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;


@Slf4j
@Service
@RequiredArgsConstructor
public class ChatService {

    private final OpenRouterClient openRouterClient;
    private final ConversationRepository conversationRepository;
    private final ChatMessageRepository chatMessageRepository;
    private final LessonService lessonService;

    @Transactional
    public ChatResponse chatWithContext(List<String> messages, String model, UUID conversationId) {
        String userLastMessage = messages.get(messages.size() - 1);

        Conversation conversation = startOrResumeConversation(conversationId, userLastMessage);

        saveMessage(conversation, "user", userLastMessage);

        List<ChatMessage> history = chatMessageRepository.findByConversationIdOrderByCreatedAtAsc(conversation.getId());
        
        String contextFromChunks = "";
        if (conversation.getLessonId() != null) {
            List<DocumentChunk> relevantChunks = lessonService.findRelevantChunks(
                conversation.getLessonId(), 
                userLastMessage, 
                3
            );
            
            if (!relevantChunks.isEmpty()) {
                StringBuilder context = new StringBuilder("\n\nTHÔNG TIN TỪ TÀI LIỆU THAM KHẢO:\n");
                for (DocumentChunk chunk : relevantChunks) {
                    context.append("---\n")
                           .append(chunk.getContent())
                           .append("\n");
                }
                contextFromChunks = context.toString();
            }
        }
        
        List<OpenRouterMessage> aiPrompt = buildPromptWithHistory(history, contextFromChunks);

        String reply = openRouterClient.chat(aiPrompt, model);
        String cleanedReply = cleanResponse(reply);

        saveMessage(conversation, "assistant", cleanedReply);

        return new ChatResponse(cleanedReply, conversation.getId());
    }

    public Conversation startOrResumeConversation(UUID conversationId, String firstMessageContent) {
        if (conversationId != null && conversationRepository.existsById(conversationId)) {
            return conversationRepository.findById(conversationId).get();
        } else {
            String title = (firstMessageContent.length() > 50) 
                ? firstMessageContent.substring(0, 50) + "..." 
                : firstMessageContent;
            Conversation conv = Conversation.create(title);
            return conversationRepository.save(conv);
        }
    }

    public void recordInteraction(UUID conversationId, String userMessage, String aiResponse) {
        if (conversationId == null) return;
        
        conversationRepository.findById(conversationId).ifPresent(conversation -> {
             saveMessage(conversation, "user", userMessage);
             saveMessage(conversation, "assistant", aiResponse);
        });
    }

    @Transactional
    public void linkConversationToLesson(UUID conversationId, UUID lessonId) {
        if (conversationId == null || lessonId == null) return;
        
        conversationRepository.findById(conversationId).ifPresent(conversation -> {
            conversation.linkToLesson(lessonId);
            conversationRepository.save(conversation);
        });
    }

    private void saveMessage(Conversation conversation, String role, String content) {
        ChatMessage message = ChatMessage.create(conversation.getId(), role, content);
        chatMessageRepository.save(message);
    }

    private List<OpenRouterMessage> buildPromptWithHistory(List<ChatMessage> history, String contextFromChunks) {
        List<OpenRouterMessage> messages = new ArrayList<>();
        
        String systemPrompt = "Bạn là CHUYÊN GIA SQL (SQL Expert AI) kiêm GIẢNG VIÊN ĐẠI HỌC.\n" +
            "Nhiệm vụ: Giải đáp thắc mắc chuyên sâu về Cơ sở dữ liệu.\n" +
            "QUY TẮC:\n" +
            "1. Trả lời ngắn gọn, đúng trọng tâm.\n" +
            "2. Nhớ lại những gì user đã hỏi trước đó (theo flow).\n" +
            "3. LUÔN sử dụng ví dụ code minh họa.\n" +
            "4. Định dạng HTML chuẩn (<h1>, <p>, <pre><code>).\n" +
            "5. Tuyệt đối KHÔNG dùng Markdown.\n" +
            "6. Nếu có thông tin từ tài liệu tham khảo, ưu tiên sử dụng thông tin đó để trả lời chính xác.";
        
        if (contextFromChunks != null && !contextFromChunks.isEmpty()) {
            systemPrompt += contextFromChunks;
        }
        
        messages.add(new OpenRouterMessage("system", systemPrompt));

        for (ChatMessage msg : history) {
            messages.add(new OpenRouterMessage(msg.getRole(), msg.getContent()));
        }
        
        return messages;
    }

    private String cleanResponse(String response) {
        if (response == null) return "";
        String cleaned = response.replaceAll("^```(html)?\\s*", "");
        cleaned = cleaned.replaceAll("\\s*```$", "");
        cleaned = cleaned.replaceAll("(?i)<!DOCTYPE[^>]*>", "");
        cleaned = cleaned.replaceAll("(?is)<head>.*?</head>", "");
        cleaned = cleaned.replaceAll("(?i)<html[^>]*>", "");
        cleaned = cleaned.replaceAll("(?i)</html>", "");
        cleaned = cleaned.replaceAll("(?i)<body[^>]*>", "");
        cleaned = cleaned.replaceAll("(?i)</body>", "");
        return cleaned.trim();
    }


}
