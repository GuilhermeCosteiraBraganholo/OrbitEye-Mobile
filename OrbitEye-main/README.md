# OrbitEye

## Integrantes

**Julio César Dias Vilella** – RM 560494
**JGuilherme Costeira Braganholo** – RM 5604628
**Gabriel Nakamura Ogata** – RM 560671


---

## Sobre o Projeto

O OrbitEye é uma plataforma inteligente desenvolvida para monitoramento e análise de riscos climáticos.

O sistema utiliza dados de regiões cadastradas, informações climáticas e recursos de inteligência artificial para auxiliar na prevenção de desastres naturais, permitindo que órgãos públicos e a população recebam informações relevantes sobre possíveis situações de risco.

A aplicação foi desenvolvida utilizando Spring Boot e segue boas práticas de arquitetura REST, segurança, documentação e integração entre serviços.

---

## Objetivo

Criar uma API REST capaz de:

* Gerenciar regiões monitoradas.
* Gerenciar alertas climáticos.
* Gerenciar sensores.
* Gerenciar eventos climáticos.
* Gerenciar previsões de risco.
* Realizar análises automáticas de risco climático.
* Disponibilizar informações para aplicações web e mobile.
* Simular recursos de inteligência artificial para apoio à tomada de decisão.

---

## Tecnologias Utilizadas

### Backend

* Java 21
* Spring Boot 3
* Spring Web
* Spring Data JPA
* Spring Security
* Spring Validation

### Banco de Dados

* Oracle Database
* Hibernate / JPA

### Documentação

* Swagger OpenAPI

### Arquitetura

* REST API
* HATEOAS
* Cache
* DTO Pattern
* Repository Pattern
* Service Layer

### Integrações

* OpenFeign
* RabbitMQ

### Segurança

* JWT Authentication
* Spring Security

### Monitoramento

* Spring Boot Actuator

### Inteligência Artificial

* Spring AI

---

## Funcionalidades

### Regiões

* Cadastro de regiões
* Consulta de regiões
* Exclusão de regiões
* HATEOAS para navegação entre recursos

### Alertas

* Cadastro de alertas climáticos
* Consulta de alertas

### Sensores

* Cadastro de sensores
* Consulta de sensores

### Eventos Climáticos

* Registro de eventos climáticos
* Consulta de histórico

### Previsões de Risco

* Cadastro de previsões
* Consulta de previsões

### Análise de Risco

O sistema realiza análises climáticas considerando:

* Temperatura
* Volume de chuva
* Umidade

Com base nesses dados, o OrbitEye classifica o risco em:

* Baixo
* Médio
* Alto
* Crítico

E retorna recomendações para tomada de decisão.

---

## Segurança

A API utiliza autenticação baseada em JWT.

Endpoint de login:

```http
POST /auth/login
```

Exemplo:

```json
{
  "username": "admin",
  "password": "123"
}
```

Retorno:

```json
{
  "token": "jwt-token"
}
```

---

## Mensageria

O projeto utiliza RabbitMQ para envio de mensagens relacionadas aos alertas climáticos.

Fila utilizada:

```text
fila-alertas
```

---

## Cache

Consultas de regiões utilizam cache para otimizar o desempenho da aplicação e reduzir consultas desnecessárias ao banco de dados.

---

## Health Check

A aplicação disponibiliza endpoints de monitoramento através do Spring Boot Actuator.

```http
/actuator
```

```http
/actuator/health
```

---

## Documentação da API

Após executar o projeto:

```http
http://localhost:8080/swagger-ui/index.html
```

---

## Execução do Projeto

### Clonar repositório

```bash
git clone https://github.com/juliovilella88/OrbitEye.git
```

### Entrar na pasta

```bash
cd OrbitEye
```

### Executar

```bash
mvn spring-boot:run
```

ou

```bash
Run OrbitEyeApplication
```

---

## Arquitetura Simplificada

Cliente → API REST → Service → Repository → Oracle Database

Cliente → API REST → RabbitMQ

Cliente → API REST → Feign Client → Serviço Climático

Cliente → API REST → Spring AI

---

## Resultado Esperado

O OrbitEye fornece uma solução moderna para monitoramento climático, permitindo o cadastro de regiões, geração de alertas, análise de risco e integração com recursos de mensageria, inteligência artificial e monitoramento, seguindo boas práticas de desenvolvimento corporativo utilizando Spring Boot.
