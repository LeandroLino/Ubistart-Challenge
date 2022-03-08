# Ubistart-Challenge

[Notion](https://www.notion.so/Ubistart-a173c1efa6e24ffe8d5e8b4efb754db4)

Antes de baixar o projeto por completo, você pode utiliza-lo em uma hospedagem gratuita.

[Front-End](https://ubistart-front.vercel.app/)
[Back-End](https://ubistart-node-mongodb.herokuapp.com/)

Caso prefira baixar, você pode clonar estes repositórios:

[Front-End](https://github.com/LeandroLino/UbistartFront)
[Back-End](https://github.com/LeandroLino/Ubistart-Challenge)

Agora basta seguir o tutorial de intalação de cada repositório.

# Tutorial de instalação Back-End

Após finizalizar o clone do repositório, você pode prefirir usar o `yarn` ou o `npm`, o tutorial seguirá ambos.

1 - Instalar todas as dependencias:
    Com yarn: 
    `yarn`
     Com npm: 
    `npm install`
    1.1 - Aguarde a instalação de todos os pacotes

2 - Antes de executar, é preciso confirmar o osu do mongoDb, você pode preferir utilizar o que já está incluido no repositório, 
ou criar o seu próprio para fazer seus testes de maneira isolado.
 2.1 - Caso queira criar seu próprio utiliza o site do [Atlas](https://cloud.mongodb.com/)
 2.2 - Se não, basta executar `yarn dev` ou `npm dev` que o projeto será inicializado com o nodemon para pode analisar sua estrutura.
 
 ## Docker (Opcional)
 
 ### Usar o Dockerfile para criar imagem (Dockerfile) do projeto

```docker build -t node-docker .```

### Rodar um container com a imagem (Dockerfile) do projeto

```docker run --name node-docker-container -p 3000:3000 node-docker``` || ```docker run -p 3000:3000 node-docker ```
 
 ## Problemas possiveis

```bash
Error: listen EADDRINUSE: address already in use :::3000
```

Tente verificar se existe alguma outra aplicação rodando na porta 3000, caso não consiga achar nenhuma
aplicação rodando utilize os seguintes comandos

```bash
fuser -k  <PORTA>/tcp
```
A porta que estaremos utilizado é `3000`, como mostra na mensagem a cima.

A resposta desse comando será:

```bash
3000/tcp:            <Sequencia Númerica>
```
Se o problema persistir você pode trocar o valor `3000` para algum numero como `5000`/`8080`/`3001`/`3002`, para isso basta mudar no `index.js` na linha `15`


# Documentação de endPoints

## POST /register - Criando um usuário:
O `name` não é obrigátório, porem `email` e `password` são.
```
{
 "email":STRING,
 "password": STRING,
 "name": STRING
 }
```
**RESPONSE STATUS -> HTTP 201 - CREATED**
```
{
	"response": {
		"id": INT,
		"name": STRING,
		"email": STRING,
		"role": INT,
		"_id": STRING
	},
	"token": STRING
}
```

## POST /login - Logando com um usuário:
O `name` não é obrigátório, porem `email` e `password` são.
```
{
 "email":STRING,
 "password": STRING
 }
```
**RESPONSE STATUS -> HTTP 200 - OK**
```
{
	"response": {
		"id": INT,
		"name": STRING,
		"email": STRING,
		"role": INT,
		"_id": STRING
	},
	"token": STRING
}
```

## POST /todos/create - Criando uma tárefa:

```
{
	"description": STRING,
	"deadline": STRING - "YYYY-MM-DDDTHH:MM:SS..."
}
```

**RESPONSE STATUS -> HTTP 201 - CREATED**

```
{
	"response": {
		"id": INT,
		"description": STRING,
		"deadline": STRING - "YYYY-MM-DDDTHH:MM:SS...",
		"updateAt": null,
		"finishedAt": null,
		"user": {
			"_id": STRING,
			"id": INT,
			"name": STRING,
			"email": STRING,
			"role": INT,
		},
		"_id": STRING,
		"createdAt": STRING - "YYYY-MM-DDDTHH:MM:SS...",,
	}
}
```


## PUT /todos/finish/:ID - Finalizando uma tárefa:

```
{
	"description": STRING,
	"deadline": STRING - "YYYY-MM-DDDTHH:MM:SS..."
}
```

**RESPONSE STATUS -> HTTP 200 - OK**

```
{
		"id": INT,
		"description": STRING,
		"deadline": STRING - "YYYY-MM-DDDTHH:MM:SS...",
		"updateAt": STRING - "YYYY-MM-DDDTHH:MM:SS...",,
		"finishedAt": STRING - "YYYY-MM-DDDTHH:MM:SS...",,
		"user": STRING,
		"createdAt": STRING - "YYYY-MM-DDDTHH:MM:SS...",
}
```

## PUT /todos/edit/:ID - Editando uma tárefa:

```
{
	"description": STRING,
	"deadline": STRING - "YYYY-MM-DDDTHH:MM:SS..."
}
```

**RESPONSE STATUS -> HTTP 200 - OK**

```
{
	"_id": STRING,
	"id": INT,
	"description": STRING,
	"deadline": STRING - "YYYY-MM-DDDTHH:MM:SS...",
	"updateAt": STRING - "YYYY-MM-DDDTHH:MM:SS...",
	"finishedAt": null,
	"user": STRING,
	"createdAt": STRING,
}
```


## PUT /todos/list/ - Editando uma tárefa:

Headers:
```
{"Authorization": "Bearer <Token>"}
```

Body:

```
{
	"description": STRING,
	"deadline": STRING - "YYYY-MM-DDDTHH:MM:SS..."
}
```

**RESPONSE STATUS -> HTTP 200 - OK**

```
{
	"tasks": [OBJECT, OBJECT...]
	"count": INT
}
```


