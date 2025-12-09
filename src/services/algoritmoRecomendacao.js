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

    let pontuacao = 0

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
          pontuacao = 100
        } else {
          pontuacao = 80
        }
      } else if (filme.nota >= 5) {
        pontuacao = 60
      } else {
        pontuacao = 40
      }
    } else {
      // Se gênero diferente
      if (filme.nota >= 7) {
        pontuacao = 30
      } else if (filme.nota >= 5) {
        pontuacao = 15
      } else {
        pontuacao = 5
      }
    }

    // Bônus para filmes lançados após 2010
    if (filme.ano >= 2010) {
      pontuacao += 30
    }

    return pontuacao
  }

  recomendar(filmeReferencia, generoFiltro = null) {
    let filmesFiltrados = this.filmes.filter(filme =>
      filme.id !== filmeReferencia.id &&
      (!generoFiltro ||
        (filme.generos && filme.generos.some(g => g.toLowerCase() === generoFiltro.toLowerCase())))
    )

    let filmesComPontuacao = filmesFiltrados
      .map((filme) => {
        const pontuacao = this.calcularPontuacao(filmeReferencia, filme)
        return { filme, pontuacao }
      })
      .filter((item) => item.pontuacao > 0)

    const melhoresFilmes = filmesComPontuacao
      .sort((a, b) => b.pontuacao - a.pontuacao)
      .slice(0, 10)
      .map((item) => item.filme)

    return melhoresFilmes
  }
}

export default AlgoritmoRecomendacao