# OrbitEye Mobile 🌍📱

## Integrantes

* Guilherme Costeira Braganholo
* (Adicionar demais integrantes)
* Turma: 2TDS

---

# Descrição do Projeto

O OrbitEye Mobile é o aplicativo da solução OrbitEye, desenvolvido para auxiliar no monitoramento climático e na prevenção de desastres naturais.

A aplicação permite que usuários acompanhem regiões monitoradas, consultem alertas climáticos, visualizem informações de risco e acompanhem o histórico de eventos registrados pelo sistema.

O projeto foi desenvolvido para a Global Solution 2026 da FIAP, dentro do tema Economia Espacial, utilizando dados climáticos e integração com uma API desenvolvida em Java Spring Boot.

---

# Objetivo

Desenvolver um aplicativo mobile capaz de:

* Permitir autenticação de usuários;
* Consultar informações climáticas;
* Gerenciar regiões monitoradas;
* Exibir alertas de risco;
* Acompanhar eventos climáticos registrados;
* Integrar-se a uma API REST.

---

# Tecnologias Utilizadas

## Frontend Mobile

* React Native
* Expo
* React Navigation
* Axios
* JavaScript

## Integração

O aplicativo consome dados de uma API REST desenvolvida em Java Spring Boot.

A comunicação entre o aplicativo e o backend ocorre através de requisições HTTP utilizando Axios.

---

# Funcionalidades Implementadas

## Autenticação

* Login de usuários
* Validação de credenciais
* Controle de acesso às funcionalidades da aplicação

## Dashboard

* Exibição de informações gerais do sistema
* Quantidade de regiões monitoradas
* Quantidade de alertas ativos

## Regiões Monitoradas

* Consulta de regiões cadastradas
* Cadastro de novas regiões
* Exclusão de regiões existentes

## Alertas Climáticos

* Consulta de alertas
* Cadastro de novos alertas
* Remoção de alertas

## Histórico

* Visualização de eventos climáticos registrados

## Perfil

* Informações do usuário autenticado
* Encerramento de sessão (Logout)

---

# Estrutura do Projeto

```txt
app/
├── login
├── cadastro
├── dashboard
├── mapa
├── alertas
├── historico
├── perfil
└── sobre
```

```txt
src/
├── components
├── services
├── hooks
├── types
└── utils
```

---

# Arquitetura

```txt
Aplicativo React Native
          ↓
      Axios
          ↓
    API Spring Boot
          ↓
    Oracle Database
```

O aplicativo não realiza acesso direto ao banco de dados, utilizando exclusivamente a API REST para manipulação e consulta das informações.

---

# Requisitos Atendidos

✅ Mínimo de 6 telas

✅ Navegação entre telas

✅ Integração com API REST

✅ Operações CRUD

✅ Sistema de autenticação

✅ Estrutura organizada do projeto

✅ Consumo de dados em tempo real

✅ Aplicação funcional em dispositivo móvel

---

# Como Executar

## Instalação

```bash
npm install
```

## Inicialização

```bash
npx expo start
```

## Backend

Para funcionamento completo da aplicação é necessário iniciar a API OrbitEye desenvolvida em Java Spring Boot.

---

# Demonstração

Vídeo de demonstração:

(Adicionar link do YouTube)

---

# Repositório

(Adicionar link do GitHub)

---

# Global Solution 2026

FIAP - Análise e Desenvolvimento de Sistemas

Tema: Economia Espacial aplicada ao monitoramento climático e prevenção de desastres naturais.
