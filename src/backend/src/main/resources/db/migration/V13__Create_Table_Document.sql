CREATE TABLE IF NOT EXISTS document (
    id                   BIGSERIAL    PRIMARY KEY,
    slot_id              VARCHAR(50)  NOT NULL UNIQUE,
    file_name            VARCHAR(255) NOT NULL,
    file_type            VARCHAR(100) NOT NULL,
    url                  VARCHAR(500) NOT NULL,
    cloudinary_public_id VARCHAR(300) NOT NULL,
    uploaded_at          TIMESTAMP    NOT NULL
);
