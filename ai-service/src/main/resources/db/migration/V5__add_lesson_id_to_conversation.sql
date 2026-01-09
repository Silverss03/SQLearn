-- Add lesson_id to conversations table to link conversations with lessons
ALTER TABLE conversations
ADD COLUMN lesson_id UUID;

-- Add foreign key constraint
ALTER TABLE conversations
ADD CONSTRAINT fk_conversation_lesson
FOREIGN KEY (lesson_id) REFERENCES lessons(id)
ON DELETE SET NULL;

-- Add index for better query performance
CREATE INDEX idx_conversation_lesson_id ON conversations(lesson_id);
