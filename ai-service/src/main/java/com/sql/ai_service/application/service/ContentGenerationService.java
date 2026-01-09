package com.sql.ai_service.application.service;

import com.sql.ai_service.domain.service.PromptService;
import com.sql.ai_service.domain.model.PromptMessage;
import com.sql.ai_service.infrastructure.openrouter.OpenRouterClient;
import com.sql.ai_service.infrastructure.openrouter.OpenRouterMessage;
import com.sql.ai_service.presentation.dto.request.RefactorOptions;
import com.sql.ai_service.presentation.dto.response.EditResponse;
import com.sql.ai_service.presentation.dto.response.RefactorResponse;
import com.sql.ai_service.presentation.dto.response.SuggestResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class ContentGenerationService {

    private final OpenRouterClient openRouterClient;
    private final PromptService promptService;

    public String generateInitialDraft(String userPrompt, String fileContent, String model) {
        String systemPrompt = "Bạn là GIÁO SƯ KHOA HỌC MÁY TÍNH (Senior Computer Science Professor) uy tín.\n" +
                "Nhiệm vụ: Soạn giáo trình bài giảng SQL chuyên sâu từ tài liệu thô.\n" +
                "YÊU CẦU NỘI DUNG:\n" +
                "- Kiến thức phải ở trình độ ĐẠI HỌC (Academic Standard).\n" +
                "- Giải thích sâu sắc, cặn kẽ bản chất công nghệ.\n" +
                "- BẮT BUỘC có các ví dụ thực tế (Industry Use Cases).\n" +
                "- Tự động tạo Sơ đồ/Biểu đồ minh họa (ERD, Flowchart) bằng MERMAID.JS nếu cần thiết.\n" +
                "YÊU CẦU ĐỊNH DẠNG (HTML):\n" +
                "- Sử dụng thẻ <h1>, <h2>, <h3>, <p>, <ul>, <li>.\n" +
                "- Code blocks: <pre><code>...</code></pre>\n" +
                "- HÌNH ẢNH / BIỂU ĐỒ:\n" +
                "- HÌNH ẢNH / BIỂU ĐỒ:\n" +
                "  1. MERMAID.JS cho sơ đồ logic (ERD, Flowchart).\n" +
                "     - Ưu tiên dùng `graph TD` hoặc `graph LR`.\n" +
                "     - QUAN TRỌNG: Tất cả nội dung text trong node phải để trong dấu ngoặc kép. Vd: id[\"Nội dung có dấu cách\"].\n" +
                "     - KHÔNG dùng các ký tự đặc biệt lằng nhằng gây lỗi syntax.\n" +
                "  2. ẢNH MINH HỌA THỰC TẾ: Dùng <img src=\"https://image.pollinations.ai/prompt/{english_desc}\" />.\n" +
                "- BẮT BUỘC: Đầu ra phải kèm theo thẻ <style> chứa CSS đẹp, hiện đại (màu xanh dương chủ đạo, font dễ đọc, bảng, code block đẹp) để Frontend chỉ việc render.\n" +
                "- Tuyệt đối KHÔNG dùng Markdown. Chỉ trả về HTML body content.\n" +
                "- QUAN TRỌNG: KHÔNG trả về các thẻ <html>, <head>, <body>, <!DOCTYPE>. Chỉ trả về nội dung bên trong body.";
        
        int maxLength = 30000;
        String truncatedContent = fileContent.length() > maxLength 
                ? fileContent.substring(0, maxLength) + "... (còn tiếp)" 
                : fileContent;

        String userMessage = String.format("Tài liệu tham khảo (ƯU TIÊN HÀNG ĐẦU):\n---\n%s\n---\n\nYêu cầu của giáo viên: %s\n\nHãy soạn bài giảng chi tiết (định dạng HTML) dựa trên tài liệu trên.", 
                truncatedContent,
                userPrompt);
        
        List<OpenRouterMessage> messages = List.of(
            new OpenRouterMessage("system", systemPrompt),
            new OpenRouterMessage("user", userMessage)
        );
        
        return cleanResponse(openRouterClient.chat(messages, model));
    }

    public SuggestResponse suggestWithContext(String currentContent, String subject, String model) {
        List<PromptMessage> promptMessages = promptService.buildSuggestPrompt(currentContent, subject);
        List<OpenRouterMessage> messages = promptMessages.stream()
            .map(msg -> new OpenRouterMessage(msg.getRole(), msg.getContent()))
            .toList();

        String suggestion = cleanResponse(openRouterClient.chat(messages, model).trim());

        return new SuggestResponse(suggestion);
    }

    public EditResponse editWithContext(String selectedText, String command, String model) {
        List<PromptMessage> promptMessages = promptService.buildEditPrompt(selectedText, command);
        
        List<OpenRouterMessage> messages = promptMessages.stream()
            .map(msg -> new OpenRouterMessage(msg.getRole(), msg.getContent()))
            .toList();
        
        String result = cleanResponse(openRouterClient.chat(messages, model).trim());
        
        return new EditResponse(result);
    }

    public RefactorResponse refactorWithContext(String fullContent, RefactorOptions options, String model) {
        RefactorOptions opts = options != null ? options : new RefactorOptions();
        
        List<PromptMessage> promptMessages = promptService.buildRefactorPrompt(
            fullContent,
            Boolean.TRUE.equals(opts.getAddExamples()),
            Boolean.TRUE.equals(opts.getAddExercises()),
            opts.getTargetLevel()
        );
        
        List<OpenRouterMessage> messages = promptMessages.stream()
            .map(msg -> new OpenRouterMessage(msg.getRole(), msg.getContent()))
            .toList();

        String optimizedContent = cleanResponse(openRouterClient.chat(messages, model).trim());
        
        return new RefactorResponse(optimizedContent);
    }

    private String cleanResponse(String response) {
        if (response == null) return "";
        String cleaned = response.replaceAll("^```(html)?\\s*", "");
        cleaned = cleaned.replaceAll("\\s*```$", "");
        
        cleaned = cleaned.replaceAll("(?s)^.*<body[^>]*>", ""); // Remove everything up to <body>
        cleaned = cleaned.replaceAll("(?s)</body.*$", "");      // Remove </body> and everything after
        cleaned = cleaned.replaceAll("(?s)^.*<html[^>]*>", ""); // Just in case, remove <html>
        cleaned = cleaned.replaceAll("(?s)</html.*$", "");      // Remove </html>
        
        return cleaned.trim();
    }
}
