CREATE TABLE IF NOT EXISTS project_inquiries (
  id BIGSERIAL PRIMARY KEY,
  full_name VARCHAR(120) NOT NULL,
  email VARCHAR(255) NOT NULL,
  company_name VARCHAR(150),
  project_type VARCHAR(80) NOT NULL,
  preferred_date DATE NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_project_inquiries_created_at
ON project_inquiries(created_at DESC);
