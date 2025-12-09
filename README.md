# API de Recomendação de Filmes

Esta API retorna recomendações baseadas em um filme de referência ou gênero, usando dados de um arquivo CSV.

## Estrutura do Projeto

- `src/app.js`: Inicializa o servidor Express e as rotas.
- `src/controllers/recomendacaoController.js`: Controla as requisições de recomendação.
- `src/routes/recomendacaoRoutes.js`: Define as rotas da API.
- `src/services/algoritmoRecomendacao.js`: Implementa o algoritmo de recomendação.
- `src/utils/csvParser.js`: Lê e processa o arquivo CSV dos filmes.
- `data/movies_metadata.csv`: Base de dados dos filmes.
- `package.json`: Dependências do projeto.
- `README.md`: Este guia.

## Como Usar

### 1. Instalação

```bash
git clone <URL_DO_REPOSITORIO>
cd api-recomendacao-filmes
npm install
```

### 2. Executando a API

```bash
npm start
```

O servidor ficará disponível na porta 3000 (ou na porta definida na variável `PORT`).

## Endpoints

### Verificar Status

- **GET /api/status**
- Retorna:
  ```json
  { "status": "API está funcionando" }
  ```

### Obter Recomendações

- **GET /api/recomendar**
- Parâmetros:
  - `filmeId` (opcional): ID do filme de referência.
  - `genero` (opcional): Gênero para recomendações.
- Retorno:
  ```json
  [
    {
      "id": "1",
      "titulo": "Filme Exemplo",
      "generos": ["Ação", "Aventura"],
      "nota": 8.5,
      "ano": 2020
    },
    ...
  ]
  ```
- Mensagens de erro:
  - Filme não encontrado:
    ```json
    { "mensagem": "Filme de referência não encontrado." }
    ```
  - Erro interno:
    ```json
    { "mensagem": "Erro ao processar a recomendação." }
    ```

- **Sem parâmetros**: Se você não informar nenhum parâmetro, a API retorna 10 filmes aleatórios.

## Como funciona o algoritmo de recomendação?

### Resumido 

- Informe o `filmeId` ou o `genero`.
- O algoritmo compara todos os filmes do banco com o filme de referência.
- Ele leva em conta gênero, nota e ano para pontuar cada filme.
- Os 10 filmes com maior pontuação são recomendados para você.
- Se não informar nada, recebe 10 filmes aleatórios.

### Técnico

### Técnico

O algoritmo é uma **árvore de decisão baseada em regras**:

1. **Exclusão**: O próprio filme de referência nunca é recomendado (pontuação -1).
2. **Gênero igual**: Se o filme tem pelo menos um gênero igual ao do filme de referência:
   - Se a avaliação do filme (campo `nota`) for maior ou igual a 7 **e** o ano for próximo (até 2 anos): recebe **100 pontos**.
   - Se a avaliação for maior ou igual a 7: recebe **80 pontos**.
   - Se a avaliação for maior ou igual a 5: recebe **60 pontos**.
   - Se a avaliação for menor que 5: recebe **40 pontos**.
3. **Gênero diferente**:
   - Se a avaliação for maior ou igual a 7: recebe **30 pontos**.
   - Se a avaliação for maior ou igual a 5: recebe **15 pontos**.
   - Se a avaliação for menor que 5: recebe **5 pontos**.

> **Observação:**  
> Os pontos acima são usados apenas para ranquear os filmes recomendados.  
> O campo `nota` refere-se à avaliação do filme no dataset, enquanto a pontuação é calculada pelo algoritmo para decidir a recomendação.


Após pontuar todos os filmes, o algoritmo ordena pela pontuação e retorna os 10 melhores.

## Exemplos de Uso

Recomendação por filme:
```bash
curl "http://localhost:3000/api/recomendar?filmeId=2"
```

Recomendação por gênero:
```bash
curl "http://localhost:3000/api/recomendar?genero=Ação"
```

Recomendação aleatória:
```bash
curl "http://localhost:3000/api/recomendar"
```

## Licença

MIT License.

---
