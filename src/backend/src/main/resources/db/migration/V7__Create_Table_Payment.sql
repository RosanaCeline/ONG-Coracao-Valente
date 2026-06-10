CREATE TABLE IF NOT EXISTS payment (
    id BIGINT PRIMARY KEY DEFAULT 1,
    pix_key VARCHAR(140) NULL,
    pix_bank VARCHAR(100) NULL,
    pix_name VARCHAR(100) NULL,
    pix_key_type VARCHAR(20) NULL,
    pix_city VARCHAR(15) NULL
);

CREATE UNIQUE INDEX payment_singleton ON payment ((id = 1)) WHERE id = 1;