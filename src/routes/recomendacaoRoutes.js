import express from 'express'

// Função que recebe o controller já instanciado
export default function recomendacaoRoutes(recomendacaoController) {
  const router = express.Router()

  // Endpoint para verificar o status da API
  router.get('/status', (req, res) => {
    recomendacaoController.status(req, res)
  })

  // Endpoint para solicitar recomendações
  router.get('/recomendar', (req, res) => {
    recomendacaoController.recomendar(req, res)
  })

  return router
}