
<p align="center">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/riosvictor/nestjs-auth-jwt?color=%2304D361">
  <img alt="Repository size" src="https://img.shields.io/github/repo-size/riosvictor/nestjs-auth-jwt"> 
  <a href="https://github.com/riosvictor/nestjs-auth-jwt/commits/with-cache-config-env">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/riosvictor/nestjs-auth-jwt">
  </a>    
  <img alt="License" src="https://img.shields.io/badge/license-MIT-brightgreen">
  <a href="https://github.com/riosvictor/nestjs-auth-jwt/stargazers">
    <img alt="Stargazers" src="https://img.shields.io/github/stars/riosvictor/nestjs-auth-jwt?style=social">
  </a>
</p>

<h1 align="center">
    Arquitetura Limpa com NestJS 🚀
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

Projeto NestJS criado para aprofundar os conhecimentos em Arquitetura Limpa (Clean Architecture).
Temos as seguintes pastas
  - `domain`: (que representa a camada de negócio e mais interna)
  - `application`: (que representa a camada de serviços, casos de uso e repositórios)
  - `adapters`: (que representa a camada de interfaces responsáveis pelo desacoplamento e intermediação das camadas de aplicação e apresentação/externas [banco de dados, ou bibliotecas])
  - `presentation`: (que representa a camada de apresentação dos dados/interface)
  - pastas não contempladas na arquitetura:
    - `infra`: (que auxilia na implementação de configurações ou tecnologias específicas)
    - `common`: (que concentra funções auxiliares, contantes e módulos globais)


---

<a name="features"></a>

## ⚙️ Funcionalidades

- O projeto implementa a arquitetura limpa como padrão de desenvolvimento de software. Utilizando princípios de SOLID e Clean Code.
- Consiste de uma Aplicação que se comunica através de eventos.

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
##### Rodando com Podman

```bash
# criação da imagem
$ podman-compose up -d

# execução da imagem
$ podman-compose down

```

##### Rodando com Docker
Basta trocar os comandos acima de `podman` para `docker`

---

<a name="tech"></a>

## 🛠 Tecnologias

As seguintes ferramentas foram usadas na construção do projeto:

#### [](https://github.com/riosvictor/nestjs-auth-jwt)**Backend**

-   **[NodeJS](https://nodejs.org/en/)**
-   **[TypeScript](https://www.typescriptlang.org/)**
-   **[NestJS](https://docs.nestjs.com/)**
-   **[Environments Variables](https://docs.nestjs.com/techniques/configuration#custom-validate-function)**
-   **[Arquitetura Limpa](http://cleancoder.com/files/cleanArchitectureCourse.md)**
-   **[SOLID](http://cleancoder.com/files/solid.md)**

> Veja o arquivo  [package.json](https://github.com/riosvictor/nestjs-auth-jwt/blob/with-cache-config-env/package.json)

---

## 💪 Aprendizado

A abordagem de arquitetura limpa tem uma dependência sequencial entre as seguintes camadas:

1. Presentation
   - pasta que representa a camada de frameworks e drivers, ou seja, o mundo externo (db, frameworks, dispositivos, interfaces externas)
2. Adapters
   - pasta que representa a camada de adaptadores, responsáveis pela tradução para comunicação com os elementos externos (controllers, presenters e repositories)
3. Application
   - pasta que representa a camada de casos de uso que representam as regras de negócio da aplicação, responsável pela comunicação com as entidades (podendo conter services também)
4. Domain
   - pasta que representa a camada de entidades (as quais geralmente são um retrato das tabelas do banco de dados)
---  

Outras Pastas que são compartilhadas por várias camadas da aplicação
1. Common (Shared)
   - Classes, funções, constantes ou enums compartilhados para toda a aplicação.
2. Infra
   - Nesta pasta podem ser implementados middlewares ou interceptors, porém essa pasta está acoplada ao framework, não sendo reaproveitada em caso de mudança de tecnologia (framework, banco de dados, estruturas externas);
   - Mas ela é necessária para implementar lógicas relacionadas a autenticação, etc.
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