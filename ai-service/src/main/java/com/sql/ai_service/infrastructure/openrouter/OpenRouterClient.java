package com.sql.ai_service.infrastructure.openrouter;

import com.sql.ai_service.infrastructure.config.OpenAIProperties;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;

import java.util.List;

@Component
@RequiredArgsConstructor
public class OpenRouterClient {

    private final OpenAIProperties openAIProperties;
    private final WebClient webClient;

    public String chat(List<OpenRouterMessage> messages, String model) {
        OpenRouterRequest request = new OpenRouterRequest();
        String selectedModel = (model != null && !model.isEmpty()) ? model : openAIProperties.getModel();
        request.setModel(selectedModel);
        request.setMessages(messages);


        try {
            OpenRouterResponse response = webClient.post()
                    .uri("/chat/completions")
                    .header(HttpHeaders.AUTHORIZATION, "Bearer " + openAIProperties.getKey())
                    .header("HTTP-Referer", "http://localhost:18080")
                    .header("X-Title", "AI Gateway Service")
                    .contentType(MediaType.APPLICATION_JSON)
                    .bodyValue(request)
                    .retrieve()
                    .bodyToMono(OpenRouterResponse.class)
                    .block();

            if (response == null || response.getChoices() == null || response.getChoices().isEmpty()) {
                throw new RuntimeException("No response from OpenRouter");
            }

            return response.getChoices().get(0).getMessage().getContent();

        } catch (WebClientResponseException.TooManyRequests e) {
            return "<h1> Hết hạn mức (429 Too Many Requests)</h1>" +
                   "<p><strong>API Key đã hết quota hoặc bị giới hạn tần suất.</strong></p>" +
                   "<p>Vui lòng kiểm tra lại billing hoặc thử lại sau.</p>" +
                   "<h2>Nội dung Giả lập (Backup):</h2>" +
                   getMockContent();
                   
        } catch (org.springframework.web.reactive.function.client.WebClientRequestException e) {

            return "<h1>Kết nối quá hạn (Timeout)</h1>" +
                   "<p><strong>Server AI phản hồi quá lâu.</strong></p>" +
                   "<p>Hệ thống đã chuyển sang chế độ offline.</p>" +
                   "<h2>Nội dung Giả lập (Backup):</h2>" +
                   getMockContent();
                   
        } catch (Exception e) {
            return "<h1>Lỗi Hệ Thống </h1>" +
                   "<p><strong>Lỗi không xác định: " + e.getMessage() + "</strong></p>" +
                   "<h2>Nội dung Giả lập:</h2>" +
                   getMockContent();
        }
    }

    private String getMockContent() {
        return "<ul>" +
               "<li>Định nghĩa: SQL là ngôn ngữ truy vấn đữ liệu.</li>" +
               "<li>Ví dụ: <code>SELECT * FROM users;</code></li>" +
               "</ul>" +
               "<p><em>(Đây là nội dung mẫu do hệ thống tự sinh)</em></p>";
    }
}
