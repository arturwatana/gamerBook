# GamerBook

Esta API é um projeto para criar um sistema de cadastro de jogadores e jogos. As funcionalidades implementadas incluem cadastrar jogadores, verificação de e-mail único, buscar jogadores pelo e-mail e excluir jogadores. Além disso, também foi implementado o cadastro de jogos, não sendo possível cadastrar um jogo com o mesmo nome e podendo adicionar ou remover um jogo de um jogador.

<br>

### Tecnologias e conceitos utilizados:

---

- NodeJS
- Express
- Typescript
- PostgreSQL
- Docker
- Prisma ORM
- Swagger
- SOLID

<br>

### Jogador

---

- [x] Deve ser possivel cadastrar um jogador
- [x] Não deve ser possivel cadastrar mais de um jogador com o mesmo e-mail.
- [x] Não deve ser possivel cadastrar um jogador sem nome, email ou idade.
- [x] Deve ser possivel buscar um jogador pelo e-mail
- [x] Deve ser possivel deletar um jogador

### Jogo

---

- [x] Deve ser possivel cadastrar um jogo
- [x] Deve ser possivel cadastrar um jogo ao jogador
- [x] Deve ser possivel remover um jogo do jogador
- [x] Nao deve ser possivel cadastrar um jogo com o mesmo nome
