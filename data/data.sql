-- Create DataBase Script 

BEGIN;

DROP TABLE "user", quizz, questions, comment;

CREATE TABLE "user" (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY, 
  pseudo TEXT NOT NULL UNIQUE,  
  email TEXT NOT NULL UNIQUE,
  avatar TEXT DEFAULT NULL,
  "password" TEXT NOT NULL, 
  is_admin BOOLEAN DEFAULT false,
  is_banished BOOLEAN DEFAULT false
);

CREATE TABLE quizz (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY, 
  user_id INT NOT NULL REFERENCES "user"(id) ON DELETE CASCADE, 
  title TEXT NOT NULL UNIQUE,
  "description" TEXT,
  category TEXT NOT NULL,
  difficulty INT NOT NULL DEFAULT 1,
  lang TEXT NOT NULL,
  "image" TEXT DEFAULT NULL,
  is_visible BOOLEAN DEFAULT true,
  "date" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  rate INT DEFAULT NULL
);

CREATE TABLE questions (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY, 
  quizz_id INT NOT NULL REFERENCES quizz(id) ON DELETE CASCADE, 
  question TEXT NOT NULL,
  "description" TEXT NOT NULL,
  proposition TEXT[],
  answer TEXT NOT NULL
);

CREATE TABLE comment (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY, 
  user_id INT NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
  quizz_id INT NOT NULL REFERENCES quizz(id) ON DELETE CASCADE, 
  content TEXT NOT NULL
);

COMMIT;