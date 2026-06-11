-- =======================
-- SERBIA LEADS TABLE
-- Lightweight lead collection table for Serbia study interest.
-- Separate from the main applications table to avoid workflow engine coupling.
-- =======================
CREATE TABLE IF NOT EXISTS serbia_leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id BIGINT NOT NULL,
    preferred_intake VARCHAR(50),
    preferred_degree VARCHAR(50),
    interested_universities JSONB NOT NULL DEFAULT '[]'::jsonb,
    interested_courses JSONB NOT NULL DEFAULT '[]'::jsonb,
    additional_notes TEXT,
    status VARCHAR(30) NOT NULL DEFAULT 'NEW_LEAD',
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_by VARCHAR(255),

    CONSTRAINT fk_serbia_leads_student FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Index for common queries
CREATE INDEX IF NOT EXISTS idx_serbia_leads_student_id ON serbia_leads(student_id);
CREATE INDEX IF NOT EXISTS idx_serbia_leads_status ON serbia_leads(status);
CREATE INDEX IF NOT EXISTS idx_serbia_leads_submitted_at ON serbia_leads(submitted_at DESC);

-- Comment on table
COMMENT ON TABLE serbia_leads IS 'Serbia study interest leads - lightweight lead collection separate from main applications';
