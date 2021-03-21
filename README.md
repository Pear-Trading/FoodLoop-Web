# LocalSpend (Web App.)

Looking to discover if the value of spending local can be measured, understood and shown.

This repository contains the Web application for the LocalSpend system. See also:

* the [server](https://github.com/Pear-Trading/Foodloop-Server); and
* the [mobile application](https://github.com/Pear-Trading/LocalSpend-Tracker).

## Current Status

| Branch        | Status            |
|---------------|------------------ |
| `master`      | [![Build Status](https://travis-ci.org/Pear-Trading/FoodLoop-Web.svg?branch=master)](https://travis-ci.org/Pear-Trading/FoodLoop-Web) |
| `development` | [![Build Status](https://travis-ci.org/Pear-Trading/FoodLoop-Web.svg?branch=development)](https://travis-ci.org/Pear-Trading/FoodLoop-Web) |

## Table of Contents

* [Tech Stack](#tech-stack)
* [Features](#features)
* [Installation](#installation)
* [Configuration](#configuration)
* [Usage](#usage)
* [Testing](#testing)
* [Code Formatting](#code-formatting)
* [Documentation](#documentation)
* [Acknowledgments](#acknowledgements)
* [License](#license)
* [Contact](#contact)

## Technology Stack

The Web app. is written in [TypeScript](https://www.typescriptlang.org/).

The stylesheets are written in [SCSS](https://sass-lang.com).

| Technology | Description                | Link            |
|------------|----------------------------|-----------------|
| Node.js    | JavaScript server runtime 	| [Link][node]    |
| AngularJS  | JavaScript MVW framework	  | [Link][angular] |

For your local Node.js, we recommend using:

- [n][https://github.com/tj/n] for \*nix and Mac; and
- [nodist][https://github.com/marcelklehr/nodist] for Windows.

We recommend Node.js version 8.0.0+ and npm version 5.3.0+.

[node]: https://nodejs.org/
[angular]: https://angularjs.org/

## Features

This client app. provides:

- user authorisation (but not registration);
- transaction logging;
- presentation of transaction history analysis; and
- presentation of leaderboard.

## Installation

1. Clone the repo. to your dev. environment (`git clone git@github.com:Pear-Trading/FoodLoop-Web.git`);
1. enter the new directory (`cd FoodLoop-Web`); and
1. install the dependencies (`npm install`).

## Configuration

The app. defaults to using the ‘production’ environment.

App. configuration settings are found in `package.json`.

TypeScript configuration settings are found in `tsconfig.json`.

Angular configuration settings are found in `angular.json`.

Environment variables are found in `src/environments/environment.⟨environment⟩.ts`.

## Usage

### Development

- Run `npm run start:dev` to start in development mode using Angular.
- Run `npm run build:dev` to build in development mode using Angular.

### Production

- Run `npm run start:prod` to start in production mode using Angular.
- Run `npm run build:prod` to build in production mode using Angular.

## Testing

There are two types of test in this codebase:

- unit tests; and
- end-to-end (E2E) tests.

### Unit Tests

Run `npm run test` to run the full test suite using [Karma](https://karma-runner.github.io/latest/index.html).

Unit tests re-run automatically on source changes.

Tests are found in `*.spec.ts` files alongside normal source files.

Karma configuration settings are found in `karma.conf.js`.

### End-to-End (E2E) Tests

Run `npm run e2e` to run the full E2E test suite using (Selenium WebDriver](https://www.selenium.dev/documentation/en/webdriver/).

You may need to run `webdriver-manager update` to install the correct WebDriver and dependencies first.

E2E tests run only once and will need to be re-run manually after source changes.

## Code formatting

### JavaScript/TypeScript Code

- Run `npm run lint` to format all JS/TS files with [Codelyzer](http://codelyzer.com/); and
- run `npm run lint-js:fix` to attempt to automatically fix errors and warnings.

Codelyzer configuration settings are found in `tslint.json`.

## Documentation

TODO

## Acknowledgements

LocalLoop is the result of collaboration between the [Small Green Consultancy](http://www.smallgreenconsultancy.co.uk/), [Shadowcat Systems](https://shadow.cat/), [Independent Lancaster](http://www.independent-lancaster.co.uk/) and the [Ethical Small Traders Association](http://www.lancasteresta.org/).

The Web client interface is based off of [CoreUI](https://coreui.io/).

## License

This project is released under the [MIT license](https://mit-license.org/).

## Contact

| Name           | Link(s)           |
|----------------|-------------------|
| Mark Keating   | [Email][mkeating] |
| Michael Hallam | [Email][mhallam]  |

[mkeating]: mailto:m.keating@shadowcat.co.uk
[mhallam]: mailto:info@lancasteresta.org
