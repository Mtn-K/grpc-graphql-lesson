# MICROSERVICES - GRPC & API GATEWAY - GRAPHQL
## Description

Build a microservice using gRPC and API Gateway using GraphQL to perform CRUD operations.

## Installation

### Server
```bash
$ cd grpc-server 
$ npm install
```

### API Gateway
```bash
$ cd grpc-gateway 
$ npm install
```

## Running the app
### Docker
```bash
# To run PostgreSQL database
$ docker-compose up -d
```

### Server & API Gateway
```bash
$ npm run start:dev
```

## Test
```bash
# unit tests
$ npm run test:watch src/test/article.controller.spec.ts
$ npm run test:watch src/test/article.service.spec.ts
```

## Apply changes in database
Anything you do related to entity file, you should apply those changes to database by migration

```bash
# Migration automatically generate file with queries corresponding to your actions on entity file
$ npm run migration:generate migrations/<name your migration>
# Apply your changes to database
$ npm run migration:run
```
Note: Don't add and remove fields in the same migration

## Stop docker
Go to grpc-server folder and enter
```bash
$ docker-compose down
```
