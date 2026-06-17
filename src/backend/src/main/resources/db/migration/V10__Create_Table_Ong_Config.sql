CREATE TABLE IF NOT EXISTS ong_config (
    id               BIGINT PRIMARY KEY,
    name             VARCHAR(150),
    cnpj             VARCHAR(20),
    responsible_name VARCHAR(150),
    address          VARCHAR(200),
    number           VARCHAR(50),
    neighborhood     VARCHAR(100),
    city             VARCHAR(100),
    state            VARCHAR(50),
    cep              VARCHAR(10),
    volunteers       INTEGER DEFAULT 0,
    whatsapp_number  VARCHAR(30),
    instagram_url    VARCHAR(255),
    instagram_handle VARCHAR(100),
    logo_url         VARCHAR(500)
);

INSERT INTO ong_config (id, name, address, number, neighborhood, city, state, volunteers, whatsapp_number, instagram_url, instagram_handle)
VALUES (1, 'ONG Coração Valente', 'Av. Manoel da Custódia', 'nº 1.111 / 1.119', 'Bairro São Geraldo', 'Tianguá', 'CE', 12, '5588999887766', 'https://www.instagram.com/ong.coracaovalente/', '@ong.coracaovalente')
ON CONFLICT (id) DO NOTHING;
