class RecomendacaoController {
  constructor(recomendacaoService) {
    this.recomendacaoService = recomendacaoService
  }

  async recomendar(req, res) {
    try {
      const { filmeId, genero } = req.query

      let filmeReferencia = null

      // Busca o filme de referência pelo id ou gênero
      if (filmeId || genero) {
        filmeReferencia = this.recomendacaoService.filmes.find(
          (filme) =>
            (filmeId && filme.id === filmeId) ||
            (genero &&
              filme.generos &&
              filme.generos.some(g => g.toLowerCase() === genero.toLowerCase()))
        )
      }

      // Se não informar nenhum parâmetro, retorna 10 filmes aleatórios
      if (!filmeId && !genero) {
        const filmesAleatorios = this.recomendacaoService.filmes
          .sort(() => Math.random() - 0.5)
          .slice(0, 10)
        return res.status(200).json(filmesAleatorios)
      }

      if (!filmeReferencia) {
        return res.status(404).json({ mensagem: 'Filme de referência não encontrado.' })
      }

      const recomendacoes = this.recomendacaoService.recomendar(filmeReferencia, genero)
      return res.status(200).json(recomendacoes)
    } catch (error) {
      console.error(error)
      return res
        .status(400)
        .json({ mensagem: 'Erro ao processar a recomendação.' })
    }
  }

  async status(req, res) {
    try {
      const status = await this.recomendacaoService.verificarStatus()
      return res.status(200).json({ status })
    } catch (error) {
      console.error(error)
      return res.status(500).json({ mensagem: 'Erro ao verificar o status.' })
    }
  }
}

export default RecomendacaoController