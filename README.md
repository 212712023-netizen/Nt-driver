# NT Driver - Estrutura do Projeto

Este projeto esta organizado para separar claramente backend, frontend e configuracoes.

## Raiz do projeto

A raiz e a pasta principal que contem `package.json` e `server.js`.
No seu caso: `C:\Users\natha\Nt driver`

## Estrutura atual

- `server.js`: ponto de entrada do servidor Express
- `.env`: configuracoes locais (nao versionar)
- `.env.example`: modelo de configuracoes
- `package.json`: dependencias e scripts
- `database/`: banco SQLite local (arquivos `.db`)
- `models/`: camada de acesso e inicializacao do banco
- `routes/`: rotas da API (`auth`, `records`, `personal-expenses`)
- `middleware/`: middlewares de autenticacao/autorizacao
- `public/`: frontend (HTML, CSS, JS, logo)

## Regra simples para nao se perder

- Tudo que e API/seguranca/autenticacao fica em `server.js`, `routes/`, `middleware/`, `models/`
- Tudo que e tela/visual/interacao do usuario fica em `public/`
- Tudo que e segredo/credencial fica em `.env` (na raiz)

## Checklist rapido antes de rodar

1. Preencher `.env` na raiz
2. Rodar `npm install`
3. Rodar `node server.js`
4. Se der erro de porta, liberar porta 3000 e iniciar novamente

## Variaveis essenciais do `.env`

- `SESSION_SECRET`: chave longa e aleatoria
- `DATABASE_URL`: URL do PostgreSQL/Supabase
- `APP_BASE_URL`: URL publica do app (ou localhost em desenvolvimento)
- `SESSION_TABLE_NAME`: opcional, nome da tabela de sessao no PostgreSQL (padrao: `user_sessions`)
- `PUBLIC_REGISTER_ENABLED`: `true` para liberar cadastro na tela de login mesmo com usuarios existentes

## Deploy basico (backend + frontend juntos)

1. Defina no `.env` de producao:
	- `NODE_ENV=production`
	- `APP_BASE_URL=https://SEU-DOMINIO-PUBLICO`
	- `DATABASE_URL` apontando para Supabase
	- `SESSION_SECRET` forte
2. Instale dependencias: `npm install`
3. Se estiver migrando historico do SQLite: `npm run migrate:sqlite-to-postgres`
4. Inicie o app: `npm start`
5. Abra `https://SEU-DOMINIO-PUBLICO` e valide login e dados

## Sessao em producao

- Em `NODE_ENV=production`, o app usa `connect-pg-simple` para salvar sessao no PostgreSQL.
- Em desenvolvimento local, o app permanece com MemoryStore para simplicidade.

## Checklist final de publicacao

1. Confirmar variaveis no ambiente de producao:
	- `NODE_ENV=production`
	- `PORT=3000`
	- `SESSION_SECRET` forte
	- `APP_BASE_URL` com URL publica HTTPS
	- `DATABASE_URL` do Supabase
	- `SESSION_TABLE_NAME=user_sessions` (opcional)
2. Rodar local antes de publicar:
	- `npm install`
	- `npm start`
	- validar `http://localhost:3000/healthz`
3. Migrar dados antigos (se ainda nao migrou):
	- `npm run migrate:sqlite-to-postgres`
4. Publicar no provedor (sugestao: Render):
	- New + Web Service
	- conectar este repositorio
	- Build Command: `npm install`
	- Start Command: `npm start`
	- adicionar todas as variaveis de ambiente acima
	- Health Check Path: `/healthz`
5. Configurar dominio proprio (opcional):
	- no Render: Settings + Custom Domains
	- apontar DNS no seu provedor para o destino indicado pelo Render
	- atualizar `APP_BASE_URL` para o dominio final HTTPS
6. Validacao final:
	- login de admin
	- listar registros e despesas
	- criar novo usuario no painel admin
	- reset de senha
	- logout e login novamente

## Observacao de seguranca

- Nunca exponha `.env` nem credenciais do Supabase em repositorio publico.
- Se alguma senha/chave foi compartilhada, gere novas credenciais imediatamente.

## Observacoes

- Nunca colocar `.env` dentro de `public/`
- Nunca enviar senha/URL completa do banco em chat
- `public/` e acessivel no navegador; backend nao
