## Executando a aplicação

Para executar a aplicação, siga os passos abaixo:

#### Instale as dependências
```bash
   npm install
```

#### Crie o arquivo `.env` na raiz do projeto e adicione as variáveis de ambiente
```bash
   cp .env.example .env
```

#### Execute o Localstack
```bash
   podman run --rm -d -p 4566:4566 -p 4510-4559:4510-4559 localstack/localstack
```

#### Crie a fila SQS
```bash
   awslocal --endpoint-url=http://localhost:4566 sqs create-queue --queue-name notification-queue
```

#### Execute a aplicação
```bash
   npm run start:dev
```

#### Use o arquivo `api.http` para testar a aplicação