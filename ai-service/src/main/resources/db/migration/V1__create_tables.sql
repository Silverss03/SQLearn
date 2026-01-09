-- Create lessons table
CREATE TABLE IF NOT EXISTS lessons (
    id UUID PRIMARY KEY,
    teacher_id BIGINT NOT NULL,
    title VARCHAR(255),
    subject VARCHAR(100),
    original_filename VARCHAR(255),
    current_content TEXT,
    status VARCHAR(50) DEFAULT 'DRAFT',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_lessons_teacher ON lessons(teacher_id);
CREATE INDEX idx_lessons_status ON lessons(status);

-- Create slide_contents table
CREATE TABLE IF NOT EXISTS slide_contents (
    id UUID PRIMARY KEY,
    lesson_id UUID NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
    slide_index INTEGER NOT NULL,
    raw_text TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(lesson_id, slide_index)
);

CREATE INDEX idx_slides_lesson ON slide_contents(lesson_id);
CREATE INDEX idx_slides_text_search ON slide_contents USING GIN(to_tsvector('english', raw_text));

-- Create prompt_templates table
CREATE TABLE IF NOT EXISTS prompt_templates (
    id UUID PRIMARY KEY,
    template_key VARCHAR(100) UNIQUE NOT NULL,
    template_text TEXT NOT NULL,
    description VARCHAR(500),
    variables JSONB,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_template_key ON prompt_templates(template_key);

-- Insert default prompt templates
INSERT INTO prompt_templates (id, template_key, template_text, description, variables) VALUES
(gen_random_uuid(), 'create_summary', 
 'Dựa trên nội dung slide sau: {context}. Hãy tóm tắt lý thuyết về {topic} với độ dài 150-200 từ. Đối tượng: sinh viên cấp độ {level}.', 
 'Template for creating content summaries',
 '["context", "topic", "level"]'::jsonb),

(gen_random_uuid(), 'explain',
 'Giải thích chi tiết về {topic}. Nội dung tham khảo: {context}. Sử dụng ngôn ngữ đơn giản phù hợp với cấp độ {level}, có ví dụ minh họa.',
 'Template for explaining concepts',
 '["context", "topic", "level"]'::jsonb),

(gen_random_uuid(), 'create_exercise',
 'Dựa trên nội dung: {context}. Tạo 5 câu trắc nghiệm về {topic}. Độ khó: {level}. Có đáp án và giải thích.',
 'Template for creating exercises',
 '["context", "topic", "level"]'::jsonb);
