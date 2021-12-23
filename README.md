# Conceitos NodeJS - REST API

Essa aplicação faz parte da trilha de NodeJS no Ignite, disponível no site da [rocketseat](https://www.rocketseat.com.br/ignite). Aplicação bem simples que simula o cadastro de usuários e CRUD de TODOS. No momento não utiliza banco de dados, somente uma variável global que armazena os usuários e seus TODOS. Usuários não PRO podem adicionar somente 10 TODOS, não existe esse limite para usuários PRO.

## Como rodar a aplicação

Clonar a aplicação e instalar dependências

```
git clone https://github.com/monteiroVitor/conceitos-nodejs.git
cd conceitos-nodejs/ && yarn
```

Iniciar a aplicação

```
yarn dev
```

Executar Testes

```
yarn test
```

## Rotas disponíveis

- Criar usuário

```
curl --request POST \
  --url http://localhost:3333/users \
  --header 'Content-Type: application/json' \
  --data '{
	"name": "NOME_DO_USUÁRIO",
	"username": "USERNAME_DO_USUÁRIO"
}'
```

Possíveis respostas:

201 - Corpo da resposta contêm o objeto representando o usuário criado.
400 - O Request deve conter as propriedades Name e Username.
400 - Username já existe.

- Consultar dados do usuário
```
curl --request GET \
  --url http://localhost:3333/users/UUID_DO_USUÁRIO
```
Possíveis respostas:

200 - Corpo da resposta contêm os dados do usuário.
404 - Usuário não encontrado.

- Transformar usuário em PRO

```
curl --request PATCH \
  --url http://localhost:3333/users/UUID_DO_USUÁRIO/pro
```

200 - Corpo da resposta contêm os dados do usuário.
400 - Plano PRO está ativo.
404 - Usuário não encontrado.

- Adicionar TODOS

```
curl --request POST \
  --url http://localhost:3333/todos \
  --header 'Content-Type: application/json' \
  --header 'username: NOME_DO_USUÁRIO' \
  --data '{
	"title": "TÍTULO_DO_TODO",
	"deadline": "ANO-MÊS-DIA"
}'
```

201 - Corpo da resposta contêm o objeto representando o TODO criado.
400 - O Request deve conter as propriedades Title e Deadline.
403 - Usuário atingiu o limite de TODOS criados (contas não PRO).
404 - Usuário não encontrado.

- Visualizar TODOS

```
curl --request GET \
  --url http://localhost:3333/todos \
  --header 'username: USERNAME_DO_USUÁRIO'
```

200 - Corpo da resposta contêm todos os TODOS do usuário.
404 - Usuário não encontrado.


- Atualizar TODO

```
curl --request PUT \
  --url http://localhost:3333/todos/UUID_DO_TODO\
  --header 'Content-Type: application/json' \
  --header 'username: USERNAME_DO_USUÁRIO' \
  --data '{
	"title": "NOVO_TÍTULO_DO_TODO",
	"deadline": "ANO-MÊS-DIA"
}'
```

200 - Corpo da resposta contêm os dados atualizados do TODO.
400 - O Request deve conter as propriedades Title e Deadline.
400 - UUID Inválido. 
404 - Usuário não encontrado.
404 - TODO não encontrado.

- Solucionar TODO

```
curl --request PATCH \
  --url http://localhost:3333/todos/UUID_DO_TODO/done \
  --header 'username: USERNAME_DO_USUÁRIO'
```

200 - Corpo da resposta contêm os dados atualizados do TODO.
400 - UUID Inválido. 
404 - Usuário não encontrado.
404 - TODO não encontrado.

- Deletar TODO

```
curl --request DELETE \
  --url http://localhost:3333/todos/UUID_DO_TODO \
  --header 'username: USERNAME_DO_USUÁRIO'
```

204 - TODO removido.
400 - UUID Inválido. 
404 - Usuário não encontrado.
404 - TODO não encontrado.