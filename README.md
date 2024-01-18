
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

Propósito do projeto.

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

  - [x] /auth-passport/login
  
    Rota pública de autenticação sem validação do body e obtenção do token JWT.
    Utilizando `@nestjs/passport` e `passport-local` para tratar o body da requisição e `@nestjs/jwt` para gerar o token.
  - [x] /auth-passport/profile

    Rota privada, que requer um token JWT para retornar os dados do usuário logado.
    Utilizando `@nestjs/passport` e `passport-jwt` para extrair o token e validar o mesmo.

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
-   **[Passport with NestJS](https://docs.nestjs.com/recipes/passport)**

> Veja o arquivo  [package.json](https://github.com/riosvictor/nestjs-auth-jwt/blob/main/package.json)

---

## 💪 Como contribuir para o projeto

1. Faça um **fork** do projeto.
2. Crie uma nova branch com as suas alterações: `git checkout -b my-feature`
3. Salve as alterações e crie uma mensagem de commit contando o que você fez: `git commit -m "feature: My new feature"`
4. Envie as suas alterações: `git push origin my-feature`
> Caso tenha alguma dúvida confira este [guia de como contribuir no GitHub](./CONTRIBUTING.md)

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