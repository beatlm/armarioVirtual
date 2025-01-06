CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS clothing_items (
  id INTEGER PRIMARY KEY,
  userId INTEGER NOT NULL,
  title TEXT NOT NULL,
  size TEXT NOT NULL,
  season TEXT CHECK(season IN ('winter', 'summer')) NOT NULL,
  imageUrl TEXT NOT NULL,
  FOREIGN KEY (userId) REFERENCES users(id)
);

-- Insert some sample users
INSERT INTO users (name) VALUES ('Daniela');
INSERT INTO users (name) VALUES ('Lucas');
