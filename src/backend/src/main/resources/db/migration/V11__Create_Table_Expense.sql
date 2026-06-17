CREATE TABLE IF NOT EXISTS expense (
    id          BIGSERIAL PRIMARY KEY,
    category    VARCHAR(20)    NOT NULL,
    description VARCHAR(300),
    value       DECIMAL(10, 2) NOT NULL,
    date        DATE           NOT NULL
);
