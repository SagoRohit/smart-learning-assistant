--user
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(100) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

--subjects
CREATE TABLE subjects (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

-- CASES
CREATE TABLE cases (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    subject_id INTEGER REFERENCES subjects(id),
    difficulty VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- CASE STEPS
CREATE TABLE case_steps (
    id SERIAL PRIMARY KEY,
    case_id INTEGER REFERENCES cases(id),
    step_number INTEGER,
    content TEXT,
    correct_answer TEXT
);

-- QUIZ QUESTIONS
CREATE TABLE quiz_questions (
    id SERIAL PRIMARY KEY,
    case_id INTEGER REFERENCES cases(id),
    question TEXT,
    options JSONB,
    correct_answer TEXT,
    explanation TEXT
);

-- PROGRESS
CREATE TABLE progress (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    case_id INTEGER REFERENCES cases(id),
    score INTEGER,
    completed BOOLEAN DEFAULT FALSE,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);