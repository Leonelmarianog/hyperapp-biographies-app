# HyperApp Bigraphies App

![cypress-tests](https://github.com/Leonelmarianog/hyperapp-biographies-app/actions/workflows/cypress-tests.yml/badge.svg)

A simple app made to showcase the [HyperApp framework](https://github.com/jorgebucaran/hyperapp).

# Tech Stack

- TypeScript — An open-source language which builds on JavaScript by adding static type definitions.
- HyperApp — Tiny Framework for building hypertext applications.
- HyperLit — JSX support for HyperApp.
- Eslint — A pluggable and configurable linter tool for identifying and reporting on patterns in JavaScript.
- Prettier — Opinionated code formatter.
- SASS — CSS extension.
- Parcel — Web application bundler.
- Cypress.io — User-friendly test automation tool for E2E, UI, Integration and Unit testing.

# How to run this project

**NOTE** : `This project was made using Node 17.3.0`

1. Installation

```bash
npm install # Install dependencies
```

2. Running in development mode

```bash
npm run dev # Runs app locally on localhost:8080 in development mode
```

3. Running in production mode

```bash
npm run build # Create project build
npm start # Runs app locally on localhost:8080 in production mode
```

# Tests

```bash
npm run test:ui:dev # Run UI test on a browser
npm run test:ui # Run UI test in headless mode
```

# Other commands

```bash
npm run prettier:check # check for formatting errors
npm run prettier:fix # fix formatting errors
npm run eslint:check # check for linting errors
npm run eslint:fix # fix linting errors
```
