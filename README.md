# 🧠 Dr. AI

Aplicação web que realiza análises inteligentes a partir de dados fornecidos pelo usuário, utilizando um backend em Java com Spring Boot e uma interface simples em HTML, CSS e JavaScript.

---

## 🚀 Tecnologias utilizadas

### 🔙 Backend

* Java
* Spring Boot
* Maven

### 🔜 Frontend

* HTML5
* CSS3
* JavaScript (Vanilla)

---

## 📂 Estrutura do projeto

```
dr.ai-main/
├── src/
│   ├── main/
│   │   ├── java/drai/
│   │   │   ├── controller/
│   │   │   │   └── AnaliseController.java
│   │   │   ├── service/
│   │   │   │   └── AnaliseService.java
│   │   │   ├── dto/
│   │   │   │   ├── AnaliseRequest.java
│   │   │   │   └── AnaliseResponse.java
│   │   │   └── DraiApplication.java
│   │   └── resources/
│   │       ├── static/
│   │       │   ├── index.html
│   │       │   ├── script.js
│   │       │   └── style.css
│   │       └── application.properties
│   └── test/
```

---

## ⚙️ Como executar o projeto

### ✅ Pré-requisitos

* Java 17+ instalado
* Maven instalado (ou usar o wrapper incluído)

---

### ▶️ Rodando a aplicação

#### 1. Clone o repositório

```
git clone <seu-repo>
cd dr.ai-main
```

#### 2. Execute o projeto

No Linux/Mac:

```
./mvnw spring-boot:run
```

No Windows:

```
mvnw.cmd spring-boot:run
```

---

#### 3. Acesse no navegador

```
http://localhost:8080
```

---

## 💡 Como funciona

1. O usuário interage com a interface web
2. O frontend envia uma requisição para o backend
3. O backend processa os dados via `AnaliseService`
4. O resultado é retornado e exibido na tela

---

## 🔌 API

### 📍 Endpoint principal

```
POST /analise
```

### 📥 Request (exemplo)

```json
{
  "input": "dados para análise"
}
```

### 📤 Response (exemplo)

```json
{
  "resultado": "resposta gerada"
}
```

---

## 🎯 Objetivo do projeto

Este projeto foi desenvolvido com foco em:

* Praticar arquitetura em camadas (Controller, Service, DTO)
* Integração entre frontend e backend
* Criação de APIs REST com Spring Boot
* Simular uma aplicação de análise inteligente

---

## 🧪 Testes

Para rodar os testes:

```
./mvnw test
```

---

## 📌 Melhorias futuras

* [ ] Validação de dados de entrada
* [ ] Tratamento de erros mais robusto
* [ ] Interface mais interativa
* [ ] Integração com IA externa (ex: API de LLM)
* [ ] Deploy em nuvem

---

## 👨‍💻 Autor

| [<img src="https://avatars.githubusercontent.com/u/128552944?v=4" width="80"><br><sub>Gabriel Andrade</sub>](https://github.com/gabriell-andrade) |
|:--:|

---

## 📄 Licença

Este projeto é de uso educacional.
