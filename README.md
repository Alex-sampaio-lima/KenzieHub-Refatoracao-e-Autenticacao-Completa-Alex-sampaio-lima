# KenzieHub-Refatoracao-e-Autenticacao-o-Completa-Alex-sampaio-lima
Entrega 5 | 🏁 Projeto: KenzieHub (Refatoração e Autenticação Completa)

## API

A API original do Kenzie Hub (`kenziehub.herokuapp.com`) saiu do ar. Por padrão, o app usa uma API simulada no navegador ([src/services/fakeApi.js](src/services/fakeApi.js)): as contas ficam salvas no `localStorage`, só no navegador em que foram criadas.

Para usar uma API real com as mesmas rotas (`POST /users`, `POST /sessions`, `GET /profile`), crie um arquivo `.env.local` com:

```
VITE_API_URL=https://endereco-da-api
```
