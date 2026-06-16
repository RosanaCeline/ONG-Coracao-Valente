CREATE TABLE IF NOT EXISTS donation (
    id          BIGSERIAL PRIMARY KEY,
    donor       VARCHAR(150)   NOT NULL,
    type        VARCHAR(20)    NOT NULL,
    description VARCHAR(300),
    value       DECIMAL(10, 2) NOT NULL,
    date        DATE           NOT NULL
);
