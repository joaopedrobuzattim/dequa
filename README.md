## :closed_book: Rodando o projeto localmente

```bash
# Clone este repositório.
$ git clone https://github.com/joaopedrobuzattim/ioasys2.git

# Vá para a pasta ioasys2
$ cd ioasys2

# Instale as dependencias
$ yarn install

# Abra outra aba do terminal no mesmo diretório  e rode o compose
# O postgres vai estar rodando na porta 5432
$ docker-compose up -d

# Conecte no postgres da maneira que preferir e crie a database
CREATE DATABASE ioasys2

#Inicie as migrations
$ yarn typeorm migraton:run

# Inicie a aplicaÃ§Ã£o
$ yarn dev:server

# O app vai estar¡ rodando na porta 3333 <http://localhost:3333>
```
## :gear: .env File

```bash
PG_HOST=localhost
PG_USERNAME=postgres
PG_PASSWORD=docker
PG_PORT=5432
PG_DATABASE=ioasys_segunda_fase

APP_PORT=3333
APP_SECRET=4fpiASDd55dsa11DGS45sa1dajg5h21sdf

```
## :notebook: Documentação

Este projeto foi documentado com [Postman](https://www.postman.com/):

- A fazer...



