-- Create document_chunks table for storing text chunks from documents
CREATE TABLE IF NOT EXISTS document_chunks (
    id UUID PRIMARY KEY,
    document_id UUID NOT NULL,
    content TEXT NOT NULL,
    page_number INTEGER,
    chunk_index INTEGER NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    
    -- Foreign key constraint with cascade delete
    CONSTRAINT fk_document_chunks_lesson 
        FOREIGN KEY (document_id) 
        REFERENCES lessons(id) 
        ON DELETE CASCADE,
    
    -- Ensure unique chunk index per document
    CONSTRAINT uk_document_chunk_index 
        UNIQUE (document_id, chunk_index)
);

-- Index for fast lookup by document_id
CREATE INDEX idx_chunks_document ON document_chunks(document_id);

-- Full-text search index using PostgreSQL's tsvector
-- This enables efficient full-text search on chunk content
CREATE INDEX idx_chunks_content_search 
    ON document_chunks 
    USING GIN(to_tsvector('english', content));

-- Index for ordering chunks by index
CREATE INDEX idx_chunks_index ON document_chunks(document_id, chunk_index);
