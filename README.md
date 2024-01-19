
<p align="center">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/riosvictor/nestjs-auth-jwt?color=%2304D361">
  <img alt="Repository size" src="https://img.shields.io/github/repo-size/riosvictor/nestjs-auth-jwt"> 
  <a href="https://github.com/riosvictor/nestjs-auth-jwt/commits/main">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/riosvictor/nestjs-auth-jwt">
  </a>    
  <img alt="License" src="https://img.shields.io/badge/license-MIT-brightgreen">
  <a href="https://github.com/riosvictor/nestjs-auth-jwt/stargazers">
    <img alt="Stargazers" src="https://img.shields.io/github/stars/riosvictor/nestjs-auth-jwt?style=social">
  </a>
</p>

<h1 align="center">
    Authentication with NestJS 🚀
</h1>

<details>
  <summary>Sumário</summary>
  
  <ul>
    <li>
      <a href="#sobre">Sobre</a>
    </li>
    <li>
      <a href="#features">Funcionalidades</a>
    </li>
    <li>
      <a href="#execute">Como executar</a>
    </li>
    <li>
      <a href="#tech">Tecnologias</a>
    </li>
    <li>
        <a href="#author">Autor</a>
    </li>
    <li>
       <a href="#licenca">Licença</a>
    </li>
  </ul>
</details>


<a name="sobre"></a>

## 💻 Sobre o projeto

Projeto criado para aprofundar os conhecimentos em Autenticação usando JWT e NestJS.

---

<a name="features"></a>

## ⚙️ Funcionalidades

- [x] Rotas
  - [x] /auth/login
  
    Rota pública de autenticação com validação do body e obtenção do token JWT.
    Utilizando `@nestjs/jwt` para gerar o token e `class-validator` para validar o body da requisição.
  - [x] /auth/profile

    Rota privada, que requer um token JWT para retornar os dados do usuário logado.
    Utilizando `@nestjs/jwt` para validar o token.

---


<a name="execute"></a>

## 🚀 Como executar o projeto

Essa aplicação é uma api backend para validar os conceitos de autenticação JWT utilizando o NestJS.

### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:

Ferramentas que são requisitos para a execução do projeto
- [Git](https://git-scm.com)
- [Node.js](https://nodejs.org/en/)
- [VSCode](https://code.visualstudio.com/)

#### 🎲 Rodando a aplicação

```bash

# comentário
$ npm run start:dev

# O servidor inciará na porta:3000 - acesse http://localhost:3000

```

#### CURLs

```bash

# JWT Login
$ curl --request POST \
  --url http://localhost:3000/auth/login \
  --header 'Content-Type: application/json' \
  --data '{
	"email": "john@example.com",
	"password": "changeme"
}'

# JWT Profile
$ curl --request GET \
  --url http://localhost:3000/auth/profile \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json'


```

---

<a name="tech"></a>

## 🛠 Tecnologias

As seguintes ferramentas foram usadas na construção do projeto:

#### [](https://github.com/riosvictor/nestjs-auth-jwt)**Backend**

-   **[NodeJS](https://nodejs.org/en/)**
-   **[TypeScript](https://www.typescriptlang.org/)**
-   **[NestJS](https://docs.nestjs.com/)**
-   **[Class Validator](https://github.com/typestack/class-validator)**
-   **[Authentication with NestJS](https://docs.nestjs.com/security/authentication)**

> Veja o arquivo  [package.json](https://github.com/riosvictor/nestjs-auth-jwt/blob/main/package.json)

---

## 💪 Aprendizado

1. Implementar com o Passport é mais simples e mais fácil pois você codifica menos.
2. Porém, realizar a implementação sem o Passport dá ao desenvolvedor maior autonomia, principalmente pelo fato de poder validar o DTO de entrada antes de realizar a verificação através do Guard.

> Portanto eu NÃO recomendo utilizar o Passport.

---

<a name="author"></a>

## 🦸 Autor

<a href="https://github.com/riosvictor">
 <img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/9468488?v=4" width="100px;" alt=""/>
 <br />
 <sub><b>Paulo Rios</b></sub>
</a>

---

<a name="licenca"></a>
## 📝 Licença

Este projeto esta sobe a licença [MIT](./LICENSE).

Feito por Paulo Rios 👋🏽 [Entre em contato!](https://www.linkedin.com/in/paulo-victor-rios-0998b020/)