<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Prerrequisites

- postman
- npm v6.12.1

## Installation

- Clone the repository

```bash
$ git clone https://github.com/FrankRivas/NestNewService.git
```

- Install dependencies

```bash
$ npm install
```

- Configure .env file

## Configuring .env File

### .env example file

#### #New York Time Variables

NYT_URL_BASE=https://api.nytimes.com/svc/search/v2/articlesearch.json?

NYT_URL_FILTERS=&sort=newest&fl=\_id, pub_date, snippet, web_url, byline, headline

NYT_KEY=[Your secret nyt key API]

#### #Guardian Variables

GUARDIAN_URL_BASE=https://content.guardianapis.com/search?

GUARDIAN_URL_FILTERS=&order-by=newest&show-fields=byline&show-tags=contributors

GUARDIAN_KEY=[Your secret guardian key API]

#### #JWT Secret

SECRET_CODE_JWT=[Your secret token]

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Getting token

In order to access the token generation functionality for querying the api of the guardian news, a file with valid users has been incorporated, which can be consulted in the path src / users / collections

## Documentation

https://documenter.getpostman.com/view/3221284/SWEDza5c

## Stay in touch

- Author - Francisco Rivas

## License

[MIT licensed](LICENSE).
