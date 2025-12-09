import express from 'express'
import bodyParser from 'body-parser'
import csvParser from './utils/csvParser.js'
import AlgoritmoRecomendacao from './services/algoritmoRecomendacao.js'
import RecomendacaoController from './controllers/recomendacaoController.js'
import recomendacaoRoutes from './routes/recomendacaoRoutes.js'

const app = express()
const PORT = process.env.PORT || 3000

// 1. Ler o CSV
const filmesRaw = csvParser.readCsv('../data/movies_metadata.csv')

// 2. Adaptar os dados para o formato esperado
const filmes = filmesRaw.map(filme => ({
  id: filme.id,
  titulo: filme.title,
  generos: (() => {
    try {
      // Corrige aspas simples para duplas e converte para JSON
      const json = filme.genres.replace(/'/g, '"')
      const arr = JSON.parse(json)
      return Array.isArray(arr) ? arr.map(g => g.name) : []
    } catch {
      return []
    }
  })(),
  nota: parseFloat(filme.vote_average),
  ano: parseInt(filme.release_date?.slice(0, 4)),
}))

// 3. Instanciar o serviço de recomendação
const recomendacaoService = new AlgoritmoRecomendacao(filmes)

// 4. Instanciar o controller
const recomendacaoController = new RecomendacaoController(recomendacaoService)

// 5. Passar o controller para as rotas
app.use('/api', recomendacaoRoutes(recomendacaoController))

// Middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Endpoint de status
app.get('/status', (req, res) => {
  res.json({ status: 'API está funcionando' })
})

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})