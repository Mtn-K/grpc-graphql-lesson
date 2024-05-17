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
$ docker-compose up \-d
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

## Stop docker
Go to grpc-server folder and enter
```bash
$ docker-compose down
```