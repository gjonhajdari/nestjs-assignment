# Nest Assignment

REST API build with Nest.js, PostgreSQL, and TypeORM. Documentation on how to use the API can be found [here](API_DOCUMENTATION.md).

# Project setup

```
git clone https://github.com/gjonhajdari/nestjs-assignment
cd nestjs-assignment
```

## Prerequisites
Databases `nest_assignment_development` and `nest_assignment_production` should be created in PostgreSQL.

```sql
CREATE DATABASE nest_assignment_development;
CREATE DATABASE nest_assignment_production;
```

## Install dependencies
```bash
# npm
$ npm install

# yarn, pnpm, bun, etc.
$ <package-manager> install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run build
$ npm run start:prod
```

# Requests

When sending HTTP requests, either via Postman or any other tool, make sure to include the `x-api-key` header with any appropriate value. If the `x-api-key` header is not included, the server will respond with a `403 Forbidden` status code.

Example request:
```http
GET /users/example@email.com HTTP/1.1
Host: localhost:3000/
x-api-key: NYv3pGZ98QqoTjeXmU9rW6UcvdAivEwx
```

# Migrations

```bash
# Run migrations
$ npm run migration:run

# Revert migrations
$ npm run migration:revert
```