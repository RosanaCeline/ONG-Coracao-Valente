CREATE TABLE IF NOT EXISTS animals (
    id BIGINT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    age VARCHAR(50) NOT NULL,
    gender VARCHAR(10) NOT NULL,
    RACE VARCHAR(10) NOT NULL,
    photo_url VARCHAR(255),
    phone_number VARCHAR(20),
    registered_at TIMESTAMP NOT NULL,
    is_adopted BOOLEAN NOT NULL
);

CREATE TABLE IF NOT EXISTS tags (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS animal_tags (
    animal_id BIGINT NOT NULL REFERENCES animals(id) ON DELETE CASCADE,
    tag_id BIGINT NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
    PRIMARY KEY (animal_id, tag_id)
);
