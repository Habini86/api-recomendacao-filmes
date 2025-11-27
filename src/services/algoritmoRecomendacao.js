class AlgoritmoRecomendacao {
  constructor(filmes) {
    this.filmes = filmes
  }

  verificarStatus() {
    return `Serviço de recomendação ativo. Filmes carregados: ${this.filmes.length}`
  }

  // Árvore de decisão simples para pontuação
  calcularPontuacao(filmeReferencia, filme) {
    // Não recomenda o próprio filme
    if (filme.id === filmeReferencia.id) return -1

    // Critérios de decisão
    if (
      filme.generos &&
      filmeReferencia.generos &&
      filme.generos.some(g => filmeReferencia.generos.includes(g))
    ) {
      // Se gênero igual
      if (filme.nota >= 7) {
        // Se nota alta
        if (Math.abs(filme.ano - filmeReferencia.ano) <= 2) {
          // Se ano próximo
          return 100
        }
        return 80
      } else if (filme.nota >= 5) {
        return 60
      } else {
        return 40
      }
    } else {
      // Se gênero diferente
      if (filme.nota >= 7) {
        return 30
      } else if (filme.nota >= 5) {
        return 15
      } else {
        return 5
      }
    }
  }

  recomendar(filmeReferencia) {
    const filmesComPontuacao = this.filmes
      .map((filme) => {
        const pontuacao = this.calcularPontuacao(filmeReferencia, filme)
        return { filme, pontuacao }
      })
      .filter((item) => item.pontuacao > 0)

    // Ordena filmes pela pontuação e seleciona os 10 melhores
    const melhoresFilmes = filmesComPontuacao
      .sort((a, b) => b.pontuacao - a.pontuacao)
      .slice(0, 10)
      .map((item) => item.filme)

    return melhoresFilmes
  }
}

export default AlgoritmoRecomendacao