CREATE DATABASE anobooks;

CREATE TABLE book(
    book_id SERIAL PRIMARY KEY,
    description VARCHAR(500),
    cover VARCHAR(80),
    content TEXT
);