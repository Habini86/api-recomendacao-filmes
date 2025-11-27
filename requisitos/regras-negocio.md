1. **Exclusão**: O próprio filme de referência nunca é recomendado (pontuação -1).
2. **Gênero igual**: Se o filme tem pelo menos um gênero igual ao do filme de referência:
   - Se o filme tem uma nota (do dataset) maior ou igual a 7 **e** o ano for próximo (até 2 anos): o algoritmo atribui **100 pontos**.
   - Se a nota for maior ou igual a 7: atribui **80 pontos**.
   - Se a nota for entre 5 e 7: atribui **60 pontos**.
   - Se a nota for menor que 5: atribui **40 pontos**.
3. **Gênero diferente**:
   - Se a nota for maior ou igual a 7: atribui **30 pontos**.
   - Se a nota for entre 5 e 7: atribui **15 pontos**.
   - Se a nota for menor que 5: atribui **5 pontos**.

> **Importante:**  
> A "nota" é o valor de avaliação do filme presente no arquivo CSV.  
> A "pontuação" é calculada pelo algoritmo para decidir quais filmes recomendar, conforme as regras acima.