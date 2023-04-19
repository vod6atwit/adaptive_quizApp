# Adaptive Quiz APP

Adaptive quizzes are a type of assessment that adjusts to the skill level of the student, providing a more personalized learning experience. Adaptive learning may contribute to both improving student learning outcomes and increasing student motivation and engagement. The Adaptive Quiz activity enables a teacher to create tests that efficiently measure the takers' abilities.

[![nodeJS](https://img.shields.io/badge/nodeJS-16.15.1-blue)](https://nodejs.org/en/) [![ExpressJS](https://img.shields.io/badge/ExpressJS-4.18.2-red)](https://expressjs.com/) [![ReactJS](https://img.shields.io/badge/ReactJS-18.2-orange)](https://reactjs.org/) [![mongoosejs](https://img.shields.io/badge/mongoose-6.9.2-blue)](https://mongoosejs.com/) [![google-spreadsheet](https://img.shields.io/badge/googleSpreadsheet-3.3.0-pink)](https://mongoosejs.com/)

## How it works

Adaptive testing is a system of testing that changes to meet the current level of the student and ongoing progress the student makes. Adaptive tests are comprised of questions selected from the question bank that are tagged with a score of their difficulty. The questions are chosen to match the estimated ability level of the current test-taker. If the test-taker succeeds on a question, a more challenging question is presented next. If the test-taker answers a question incorrectly, a less-challenging question is presented next. This allows for a more accurate model of the students’ current level of attainment.

## Features

- Import and Export data from Google Spreadsheet for questions and answers
- Login/logout and register account with JWT authentication
- Calculate the score of the test

## Teck Stack

**Client:** ReactJS, axios, styled-components

**Server:** Node, Express, mongoose, google-spreadsheet, dotenv, bcryptjs, jsonwebtoken, http-status-codes

## Run Locally

Clone the Project

```bash
  git clone https://link-to-project
```

Go to the project directory

```bash
  cd my-project
```

Create .env file

```bash
  cd server
```

```bash
  touch .env
```

Add your environment variables in .env file

```bash
  MONGO_URL=your_mongo_uri
  MONGO_URL_PASSWORD=your_mongo_uri_password
  JWT_SECRET=your_jwt_secret
  JWT_LIFETIME=1d
  GOOGLE_CLIENT_EMAIL=your_google_client_email
  GOOGLE_PRIVATE_KEY=your_google_private_key
  GOOGLE_SHEET_ID=your_google_spreadsheet_id
```

Install dependencies

```bash
  cd my-project
```

```bash
  npm run setup
```

Start application

```bash
  npm run start
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.
