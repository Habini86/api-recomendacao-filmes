# Requisitos Funcionais (RF)

## RF01 - Leitura dos Dados
Ao iniciar a aplicação, o sistema deve ler e interpretar um arquivo `.csv` contendo a base de dados dos filmes, carregando essas informações em memória.

## RF02 - Status da API
Deve existir um endpoint `GET /status` que informe o estado atual da API e se os dados do CSV foram carregados corretamente.

## RF03 - Solicitação de Recomendação
A API deve disponibilizar um endpoint `/recomendar` (preferencialmente `POST`, mas pode aceitar também via `GET`) que receba parâmetros tanto pela Query String (ex: `?filmeId=123` ou `?genero=acao`) quanto pelo corpo da requisição em JSON, permitindo flexibilidade na entrada dos dados.

## RF04 - Algoritmo de Recomendação
O sistema deve utilizar um algoritmo de decisão (exemplo: árvore de decisão, similaridade de cosseno, algoritmo genético ou outro) para filtrar e classificar os filmes da base, retornando os mais relevantes.

## RF05 - Retorno dos Resultados
A resposta da API deve ser uma lista (array) contendo os 10 melhores filmes recomendados, conforme o critério do algoritmo.

## RF06 - Tratamento de Erros
O sistema deve retornar mensagens claras e objetivas caso o filme de referência não seja encontrado no CSV ou se o input for inválido, utilizando os códigos HTTP adequados (400 para erro de entrada, 404 para não encontrado).