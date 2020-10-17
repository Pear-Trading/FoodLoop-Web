# LocalSpend - Web Application

This repository contains the Web application for the LocalSpend system.

## Current Status

| Branch | Status |
| --- | --- |
| Master: | [![Build Status](https://travis-ci.org/Pear-Trading/FoodLoop-Web.svg?branch=master)](https://travis-ci.org/Pear-Trading/FoodLoop-Web) |
| Development: | [![Build Status](https://travis-ci.org/Pear-Trading/FoodLoop-Web.svg?branch=development)](https://travis-ci.org/Pear-Trading/FoodLoop-Web) |

## Getting Started

To get started with development, you will need an up-to-date version of
Node.js, git, and access to either the backend dev. server or a local
copy of it from the [LocalSpend Server][LocalLoop-Server] repo.

For your local Node.js, we recommend using:
- [n][tj/n] for \*nix and Mac; and
- [nodist][marcelklehr/nodist] for Windows.

We reccomend Node.js version 8.0.0+ and npm version 5.3.0+.

To get this repository set up:

1. Clone it
1. Install the dependencies:
  - `npm install -g @angular/cli`
  - `npm install`
1. Start the application:
  - `npm start`

[LocalLoop-Server]:https://github.com/Pear-Trading/Foodloop-Server
[tj/n]:https://github.com/tj/n
[marcelklehr/nodist]:https://github.com/marcelklehr/nodist

## Environments

The app defaults to using the development server. For other options, see 
`src/environments/environments.ts`.

## Testing

There are two types of test in this codebase:
- unit tests (using Karma); and
- E2E tests (using Protractor).

### Karma Unit Tests

To run these, you just need to run `npm run test` - this should work without any further configuration. These run the `*.spec.ts` files next to the normal source files, and are for basic tests for each function on their own.

These tests are a long-running process, and will automatically run on file changes. Just run the command above, and then check back to the browser window that appears to see any errors as you work!

### Protractor E2E Tests

To run these, you will need to run the following command:

- `webdriver-manager update`

This will download the correct webdriver for you (we use chromedriver), and 
any other dependencies it needs.
After that, you can run the tests with `npm run e2e`.
Note these run once, and will need to be re-run every time you want to run an 
e2e test.

These tests are best run regularly, and should show if any issues have emerged 
in other parts of the application that you are not aware of, or if some part 
of the flow through the app has changed significantly. 

## Troubleshooting

### ‘Error: EACCES: permission denied, access '/usr/local/lib'’ when installing dependencies

Change npm's default directory by following [these steps](https://docs.npmjs.com/resolving-eacces-permissions-errors-when-installing-packages-globally#manually-change-npms-default-directory).

## Licences

### CoreUI

The interface itself is based off of [CoreUI][core-ui] which is MIT Licenced.
For information, see `LICENCE.MIT` included in this repo.

[core-ui]: http://coreui.io

___

## Old README

This is the old README with some minor tips on getting started, and more reading.

### Angular2DevelopmentCLI

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.0.0-beta.32.3.

### Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive/pipe/service/class/module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
