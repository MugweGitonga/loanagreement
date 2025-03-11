CREATE DATABASE loan_agreement_db;

CREATE TABLE agreements (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    loan_amount DECIMAL(10, 2) NOT NULL,
    signature TEXT NOT NULL
);
