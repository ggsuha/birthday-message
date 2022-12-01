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

Database migration reset will start and the testing begins after migration and seeding process finished. Currently, the test only cover API (job schedule testing not implemented, yet). We need manually test the job by running bulking insert users with command

```
npm run users
```

After that, run server and we will get log from resend message job scheduler on each minute, while send message job scheduler each hour.

## API Docs

API Docs (generated from Insomnia) could be finded on `/docs` directory.
