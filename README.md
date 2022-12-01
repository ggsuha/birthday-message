# Upscalix Birthday Message

- [**Installation**](#installation)
- [**Testing**](#testing)
- [**API Docs**](#api-docs)

## Installation

1. Clone the project
2. Install npm packages

```
npm install
```

3. Duplicate `.env.example` to `.env`
4. Change application port, environment, and database connection on `.env` file
5. To run the application, run

```
npm run start
```

or if `nodemon` is not installed on the system, simply run

```
node server.js
```

## Testing

Run

```
npm run test
```

or

```
npm test
```

Database migration reset will start and the testing begins after migration and seeding process finished. Currently, the test only cover API (job schedule testing not included, yet).

## API Docs

API Docs (generated from Insomnia) could be finded on `/docs` directory.
