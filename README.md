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

## Running tests

Testing generates a local SQLite database. The database location will be depended on the `TYPEORM_DATABASE` path in the `.env.test` file.

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Extra

Each request checks for the `x-api-key` header. If the header is not included, or an invalid API key is given, a `403 Forbidden` status code will be returned. An active API key needs to be created to send any requests. You can create a new API key by connecting to the database and running the following  SQL command:

```sql
-- development or production database
INSERT INTO api_key (active) VALUES (true);
```

This will create a new active API key with a random UUID as its `key` column value. You can find the API key by running the following SQL command:

```sql
-- development or production database
SELECT * FROM api_key;
```

# Requests

When sending HTTP requests, either via Postman or any other tool, make sure to include the `x-api-key` header with any appropriate value. If the `x-api-key` header is not included, the server will respond with a `403 Forbidden` status code.

Example request:
```bash
curl --url "localhost:3000/users/email/example@email.com" \
     --header "x-api-key: ac70ca11-5d7f-4ca3-bede-fb1a06a36d28"
```

# Migrations

```bash
# Run migrations
$ npm run migration:run

# Revert migrations
$ npm run migration:revert
```