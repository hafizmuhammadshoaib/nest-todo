<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>


  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
npm install
```

## Running the app

### Start Database


```bash
docker-compose up
```

### Start the server
```bash
# development
npm run start

# watch mode
npm run start:dev

# production mode
npm run start:prod
```

### Migrations

``` bash 
# run migrations
npm run typeorm:run

# create new migration
npm run typeorm:create <filename>

# create a migration from entity changeset 
npm run typeorm:migrate <filename>
```
