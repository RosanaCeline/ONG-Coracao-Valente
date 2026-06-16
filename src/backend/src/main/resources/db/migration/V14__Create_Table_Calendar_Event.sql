CREATE TABLE IF NOT EXISTS calendar_event (
    id       BIGSERIAL    PRIMARY KEY,
    title    VARCHAR(255) NOT NULL,
    category VARCHAR(50)  NOT NULL,
    date     DATE         NOT NULL,
    notes    TEXT
);
