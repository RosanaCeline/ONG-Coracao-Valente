-- Usuário admin padrão para primeiro acesso
-- Email: coracaovalente@gmail.com  |  Senha: ong123@
-- Troque a senha pelo painel após o primeiro login.
INSERT INTO users (email, password, role, enabled)
VALUES (
    'coracaovalente@gmail.com',
    '$2b$10$MwidjC8wM3R4HR1Ddl/Gi.fHq.MLoBXrN90wYxfg/EkvM.aOkxh0i',
    'ADMIN',
    TRUE
)
ON CONFLICT (email) DO NOTHING;
