# OrbitEye Mobile 🌍🛰️📱



VIDEO: https://youtu.be/us7gcBetviY

> ⚠️ IMPORTANTE: Este repositório contém o aplicativo mobile **OrbitEye Mobile** e também a **API Java Spring Boot** utilizada pela aplicação.
>
> O aplicativo não utiliza dados simulados para as operações principais. As funcionalidades de autenticação e gerenciamento de dados são realizadas através da API Java integrada à solução, utilizando persistência em banco de dados Oracle.
>
> Durante a demonstração do projeto, a API deve estar em execução para que todas as funcionalidades do aplicativo operem corretamente.

---

# Integrantes

| Nome                          | RM             |
| ----------------------------- | -------------- |
| Guilherme Costeira Braganholo | RM560628 |
| Julio Cesar Dias Vilella      | RM560494       |
| Gabriel Nakamura Ogata        | RM560671       |

Turma: 2TDSPA

---

# OrbitEye

O OrbitEye é uma plataforma inteligente desenvolvida para monitoramento climático, análise de riscos e prevenção de desastres naturais.

O projeto foi desenvolvido para a Global Solution 2026 da FIAP, utilizando conceitos de Economia Espacial, Inteligência Artificial, APIs REST, Banco de Dados Oracle e Desenvolvimento Mobile.

A proposta consiste em utilizar informações climáticas, sensores, dados geográficos e análises de risco para auxiliar cidades, órgãos públicos e a população na identificação de áreas críticas e emissão de alertas preventivos.

---

# Problema

Desastres naturais como enchentes, alagamentos e eventos climáticos extremos causam impactos sociais, ambientais e econômicos significativos.

Muitas regiões possuem dificuldade em monitorar áreas vulneráveis e disponibilizar informações em tempo hábil para a população.

---

# Solução

O OrbitEye centraliza informações climáticas e geográficas em uma única plataforma, permitindo:

* Monitoramento de regiões de risco;
* Cadastro e consulta de alertas;
* Acompanhamento de eventos climáticos;
* Consulta de previsões de risco;
* Visualização de informações através de aplicativo mobile;
* Integração entre frontend, backend e banco de dados.

---

# Tecnologias Utilizadas

## Aplicação Mobile

* React Native
* Expo
* Expo Router
* React Navigation
* Axios
* React Query
* TypeScript

## Backend

* Java 21
* Spring Boot
* Spring Data JPA
* Hibernate
* Maven
* Swagger OpenAPI

## Banco de Dados

* Oracle Database

## Ferramentas de Desenvolvimento

* Git
* GitHub
* VS Code
* Postman
* Swagger UI

---

# Arquitetura da Solução

```text
Aplicativo Mobile (React Native)
              ↓
           Axios
              ↓
      API Java Spring Boot
              ↓
        Oracle Database
```

O aplicativo realiza requisições HTTP para a API Java.

A API é responsável pelas regras de negócio, autenticação, validações e persistência dos dados.

O Oracle Database armazena todas as informações utilizadas pela solução.

---

# Funcionalidades Implementadas

## Autenticação

* Login de usuários
* Validação de credenciais
* Controle de acesso

## Dashboard

* Visualização geral das informações da plataforma
* Exibição de regiões monitoradas
* Exibição de alertas ativos

## Regiões Monitoradas

* Cadastro de regiões
* Consulta de regiões
* Exclusão de regiões

## Alertas Climáticos

* Cadastro de alertas
* Consulta de alertas
* Exclusão de alertas

## Histórico

* Consulta de eventos climáticos registrados

## Perfil

* Informações do usuário
* Logout da aplicação

## Sobre o Aplicativo

* Informações da solução
* Hash do commit da versão entregue

---

# Estrutura do Projeto

```text
OrbitEye-Mobile
│
├── OrbitEyeMobile
│   ├── app
│   ├── src
│   ├── assets
│   ├── services
│   └── components
│
├── OrbitEye-main
│   ├── src
│   ├── pom.xml
│   ├── resources
│   └── controllers
│
└── README.md
```

---

# Integração com API

A aplicação mobile consome a API REST desenvolvida em Java Spring Boot.

Os principais recursos consumidos pelo aplicativo incluem:

* Autenticação de usuários
* Regiões monitoradas
* Alertas climáticos
* Eventos climáticos
* Previsões de risco

Durante os testes foi validada a comunicação entre:

```text
Mobile → API → Oracle
```

incluindo operações de autenticação e CRUD.

---

# Requisitos da Disciplina Atendidos

✅ Mínimo de 6 telas

✅ Navegação entre telas

✅ Integração com API REST

✅ Sistema de autenticação

✅ Operações CRUD

✅ Estrutura organizada

✅ Consumo de dados em tempo real

✅ Integração com backend Java

✅ Aplicação funcional em ambiente mobile

---

# Como Executar

## Executando a API

```bash
cd OrbitEye-main/orbiteye
.\mvnw.cmd spring-boot:run
```

A API será disponibilizada em:

```text
http://localhost:8080
```

Swagger:

```text
http://localhost:8080/swagger-ui/index.html
```

---

## Executando o Mobile

```bash
cd OrbitEyeMobile
npm install
npx expo start
```

---

# Demonstração

Durante a apresentação serão demonstradas:

* Autenticação de usuários
* Integração com API Java
* Cadastro de regiões
* Consulta de regiões
* Exclusão de regiões
* Consulta de alertas
* Navegação entre telas
* Persistência de dados no Oracle Database

---

# Global Solution 2026

FIAP – Análise e Desenvolvimento de Sistemas

Tema:

**Economia Espacial aplicada ao monitoramento climático e prevenção de desastres naturais através da plataforma OrbitEye.**
