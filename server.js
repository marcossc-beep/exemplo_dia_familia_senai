
import Fastify from 'fastify'
import { Pool } from 'pg'
import cors from '@fastify/cors'

const sql = new Pool({
    user: "postgres",
    password: "senai", 
    host: "localhost",
    port: 5432,
    database: "quiz_familia" 
})

const servidor = Fastify()

servidor.register(cors, {
    origin: '*'
})

servidor.post('/formularios', async (request, reply) => {
    const titulo = request.body.titulo;

    if (!titulo) {
        return reply.status(400).send({ error: "O titulo do formulário é obrigatório!" })
    }

    const resultado = await sql.query(
        'INSERT INTO formulario (titulo) VALUES ($1)', 
        [titulo]
    )       
    reply.status(201).send({ mensagem: "Formulário criado com sucesso!" })
})

servidor.get('/formularios', async (request, reply) => {
    const resultado = await sql.query('SELECT * FROM formulario')
    return resultado.rows
})

servidor.post('/questoes', async (request, reply) => {
    const enunciado = request.body.enunciado;
    const alternativa_a = request.body.alternativa_a;
    const alternativa_b = request.body.alternativa_b;
    const alternativa_c = request.body.alternativa_c;
    const alternativa_d = request.body.alternativa_d;
    const resposta_correta = request.body.resposta_correta;
    const formulario_id = request.body.formulario_id;

    if (!enunciado || !resposta_correta || !formulario_id) {
        return reply.status(400).send({ 
            error: "Faltou preencher os dados obrigatórios da questão!" 
        })
    }

    const resultado = await sql.query(
        'INSERT INTO questoes (enunciado, alternativa_a, alternativa_b, alternativa_c, alternativa_d, resposta_correta, formulario_id) VALUES ($1, $2, $3, $4, $5, $6, $7)', 
        [enunciado, alternativa_a, alternativa_b, alternativa_c, alternativa_d, resposta_correta, formulario_id]
    )       
    reply.status(201).send({ mensagem: "Questão salva com sucesso!" })
})

servidor.get('/questoes', async (request, reply) => {
    const resultado = await sql.query('SELECT * FROM questoes')
    return resultado.rows
})

servidor.post('/resultados', async (request, reply) => {
    const nome_pai = request.body.nome_pai;
    const nome_filho = request.body.nome_filho;
    const acertos = request.body.acertos;
    const total_questoes = request.body.total_questoes;
    const formulario_id = request.body.formulario_id;

    if (!nome_pai || !nome_filho || acertos === undefined || total_questoes === undefined || !formulario_id) {
        return reply.status(400).send({ 
            error: "Todos os dados do resultado são obrigatórios!" 
        })
    }

    const resultado = await sql.query(
        'INSERT INTO resultados (nome_pai, nome_filho, acertos, total_questoes, formulario_id) VALUES ($1, $2, $3, $4, $5)', 
        [nome_pai, nome_filho, acertos, total_questoes, formulario_id]
    )       
    reply.status(201).send({ mensagem: "Resultado salvo no ranking!" })
})

servidor.get('/resultados', async (request, reply) => {
    const resultado = await sql.query('SELECT * FROM resultados ORDER BY acertos DESC')
    return resultado.rows
})

servidor.listen({
    port: 3000
})
