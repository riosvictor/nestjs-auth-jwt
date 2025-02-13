## Debug da aplicação

1. Gerar o build da aplicação
```bash
$ npm run build
```

2. **Para analisar a questão de memória, acessar a aba Memory**
  1. Executar a aplicação
    ```bash
    $ npm start:debug:memory
    ```

  2. Acessar o endereço `chrome://inspect/#devices` no Google Chrome
     - Acessar o remote target
     - Clicar em inspect
     - Acessar a aba console

  3. Analisar o consumo de memória
     - Executar um endpoint que faça a aplicação consumir memória
     - Clicar em Take Heap Snapshot
     - Analisar o snapshot gerado
       - Pode ordenar pelo tamanho máximo mantido na memória
       - Pode analisar o que está sendo mantido na memória

3. **Para analisar a questão de CPU**
  1. Executar a aplicação
    ```bash
    $ npm start:debug:cpu
    ```
  2. Executar um endpoint que faça a aplicação consumir CPU

  3. Execute o comando
    ```bash
    $ npm run build:debug:cpu
    ```

  4. Analise o arquivo `cpu-profile.txt` gerado

---

## Exemplo de uso do endpoint para consumir memória:
```bash
$ curl http://localhost:3000/memory-leak
```
O endpoint `/memory-leak` irá consumir memória da aplicação.

Ao analisar por ordem de `Tamanho mantido`, do maior para o menor, é possível identificar o que está sendo mantido na memória.

E o resultado foi:
  - Array - 91%
  - AppController (aqui deu para ver que a função `largeArray` está consumindo muita memória) - 89%

Após correção o resultado foi:
  - Array - 74%
  - AppController (aqui deu para ver que a função `largeArray` está consumindo muita memória) - 68%

## Exemplo de uso do endpoint para consumir CPU:
```bash
$ curl http://localhost:3000/cpu-intensive
```
O endpoint `/cpu-intensive` irá consumir CPU da aplicação.

Ao analisar o arquivo `cpu-profile.txt`, é possível identificar o que está consumindo mais CPU.

E o resultado foi:
  - `fibonacci` 72%

Após correção o resultado foi:
  - `fibonacci` nem aparece mais na lista