package com.sql.ai_service.domain.service;

import com.sql.ai_service.domain.model.PromptMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class PromptService {

    public List<PromptMessage> buildSuggestPrompt(String currentContent, String subject) {
        String systemPrompt = "Bạn là trợ lý soạn bài giảng SQL/Database chuyên nghiệp.\n" +
                "Nhiệm vụ: Viết tiếp nội dung bài giảng về Cơ sở dữ liệu theo ngữ cảnh.\n" +
                "QUY TẮC QUAN TRỌNG VỀ NGÔN NGỮ:\n" +
                "1. Đây là bài học về LẬP TRÌNH SQL, không phải tiếng Anh giao tiếp.\n" +
                "2. Các từ khóa SQL như SELECT, FROM, WHERE, HAVING, JOIN, GROUP BY... phải được hiểu theo nghĩa LỆNH SQL.\n" +
                "   - Ví dụ SAI: 'HAVING' nghĩa là 'đang ăn' hay 'đang có'.\n" +
                "   - Ví dụ ĐÚNG: 'HAVING' là mệnh đề điều kiện trong GROUP BY.\n" +
                "YÊU CẦU ĐỊNH DẠNG:\n" +
                "- Ngôn ngữ: Tiếng Việt 100% (trừ các từ khóa lệnh SQL).\n" +
                "- Định dạng: HTML chuẩn (<p>, <ul>, <li>, <strong>, <code>...).\n" +
                "- Code block: Dùng thẻ <pre><code>...</code></pre>.\n" +
                "- KHÔNG dùng Markdown.\n" +
                "- Phong cách: Sư phạm, chính xác, ngắn gọn.";
                
        List<PromptMessage> messages = new ArrayList<>();
        messages.add(new PromptMessage("system", systemPrompt));
        messages.add(new PromptMessage("user", 
                String.format("Ngữ cảnh hiện tại:\n%s\n\nHãy viết tiếp về chủ đề: %s", currentContent, subject)));
        return messages;
    }

    public List<PromptMessage> buildEditPrompt(String selectedText, String command) {
        String systemPrompt = "Bạn là trợ lý biên tập nội dung bài giảng SQL/Database.\n" +
                "Nhiệm vụ: Chỉnh sửa đoạn văn bản theo yêu cầu.\n" +
                "QUY TẮC TUYỆT ĐỐI:\n" +
                "1. Đây là ngữ cảnh LẬP TRÌNH SQL.\n" +
                "2. CHỈ dịch nghĩa từ tiếng Anh sang tiếng Việt nếu đó là văn bản thường.\n" +
                "3. TUYỆT ĐỐI KHÔNG dịch thuật ngữ chuyên ngành (Table, Column, Primary Key...) sai nghĩa.\n" +
                "4. 'HAVING' là mệnh đề SQL, KHÔNG DỊCH là 'có' hay 'đang ăn'.\n" +
                "YÊU CẦU ĐỊNH DẠNG:\n" +
                "- Ngôn ngữ danh cho người Việt, chuyên ngành công nghệ.\n" +
                "- Định dạng: HTML chuẩn.\n" +
                "- Trả về kết quả sau khi sửa ngay lập tức, không giải thích dài dòng.";
                
        List<PromptMessage> messages = new ArrayList<>();
        messages.add(new PromptMessage("system", systemPrompt));
        messages.add(new PromptMessage("user", 
                String.format("Yêu cầu chỉnh sửa: %s\n\nĐoạn văn bản gốc:\n%s", command, selectedText)));
        return messages;
    }

    public List<PromptMessage> buildRefactorPrompt(String fullContent, boolean addExamples, boolean addExercises, String targetLevel) {
        String systemPrompt = "Bạn là chuyên gia sư phạm về Cơ sở dữ liệu (Database Expert).\n" +
                "Nhiệm vụ: Tối ưu hóa bài giảng SQL cho học viên.\n" +
                "QUY TẮC:\n" +
                "- Coi mọi nội dung là tài liệu kỹ thuật SQL.\n" +
                "- Đảm bảo độ chính xác tuyệt đối về kiến thức SQL.\n" +
                "- Định dạng HTML chuẩn đẹp (<h1>, <h2>, <p>, <ul>, <pre><code>).\n";
                
        StringBuilder userRequest = new StringBuilder();
        userRequest.append("Hãy viết lại bài giảng dưới đây để tối ưu hơn.\n");
        userRequest.append("Trình độ mục tiêu: ").append(targetLevel).append("\n");
        if (addExamples) userRequest.append("- Thêm nhiều ví dụ minh họa code SQL cụ thể.\n");
        if (addExercises) userRequest.append("- Thêm bài tập thực hành SQL cuối bài.\n");
        userRequest.append("\nNội dung gốc:\n").append(fullContent);
        
        List<PromptMessage> messages = new ArrayList<>();
        messages.add(new PromptMessage("system", systemPrompt));
        messages.add(new PromptMessage("user", userRequest.toString()));
        return messages;
    }
}
