# Conceitos NodeJS - REST API

Essa aplicação faz parte da trilha de NodeJS do Ignite disponível no site da [rocketseat](https://www.rocketseat.com.br/ignite). Aplicação bem simples que simula o cadastro de usuários e CRUD de TODOS. No momento não utiliza banco de dados, somente uma variável global que armazena os usuários e seus TODOS.

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

- Adicionar TODOS

```
curl --request POST \
  --url http://localhost:3333/todos \
  --header 'Content-Type: application/json' \
  --header 'username: montev' \
  --data '{
	"title": "TÍTULO_DO_TODO",
	"deadline": "ANO-MÊS-DIA"
}'
```

- Visualizar TODOS

```
curl --request GET \
  --url http://localhost:3333/todos \
  --header 'username: USERNAME_DO_USUÁRIO'
```

- Atualizar TODO

```
curl --request PUT \
  --url http://localhost:3333/todos/UUID_DO_TODO \
  --header 'Content-Type: application/json' \
  --header 'username: USERNAME_DO_USUÁRIO' \
  --data '{
	"title": "NOVO_TÍTULO_DO_TODO",
	"deadline": "ANO-MÊS-DIA"
}'
```

- Solucionar TODO

```
curl --request PATCH \
  --url http://localhost:3333/todos/UUID_DO_TODO/done \
  --header 'username: USERNAME_DO_USUÁRIO'
```

- Deletar TODO

```
curl --request DELETE \
  --url http://localhost:3333/todos/UUID_DO_TODO \
  --header 'username: USERNAME_DO_USUÁRIO'
```