CREATE TABLE IF NOT EXISTS formulario (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS questoes (
    id SERIAL PRIMARY KEY,
    enunciado TEXT NOT NULL,
    alternativa_a VARCHAR(255) NOT NULL,
    alternativa_b VARCHAR(255) NOT NULL,
    alternativa_c VARCHAR(255) NOT NULL,
    alternativa_d VARCHAR(255) NOT NULL,
    resposta_correta VARCHAR(255) NOT NULL,
    formulario_id INTEGER NOT NULL REFERENCES formulario(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS resultados (
    id SERIAL PRIMARY KEY,
    nome_pai VARCHAR(255) NOT NULL,
    nome_filho VARCHAR(255) NOT NULL,
    acertos INTEGER NOT NULL,
    total_questoes INTEGER NOT NULL,
    formulario_id INTEGER NOT NULL REFERENCES formulario(id) ON DELETE CASCADE
);
