# Requisitos Não Funcionais (RNF)

## RNF01 - Linguagem e Ambiente
O sistema deve ser desenvolvido em JavaScript, rodando no ambiente Node.js.

## RNF02 - Desempenho
O tempo de resposta para recomendações deve ser inferior a 2 segundos, mesmo durante o processamento do algoritmo.

## RNF03 - Disponibilidade e Escalabilidade
A API deve ser stateless, permitindo múltiplas requisições simultâneas sem depender de informações de sessão ou estado do usuário.

## RNF04 - Estrutura do CSV
O arquivo CSV utilizado deve conter, obrigatoriamente, as colunas: ID, Título, Gênero e Nota/Avaliação, para possibilitar o funcionamento do algoritmo de recomendação.

## RNF05 - Formato das Respostas
Todas as respostas da API devem ser enviadas em formato JSON, com o cabeçalho `Content-Type: application/json`.