CREATE TABLE messages (
    id SERIAL PRIMARY KEY,
    messagetxt TEXT,
    email TEXT,
    created_on TIMESTAMP default NOW(),
    send_on TIMESTAMP
    );