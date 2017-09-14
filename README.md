# LocalLoop Web Interface

This is the repository for the LocalLoop web interface, for traders and
customers to see and submit data to the service.

| Branch | Status |
| --- | --- |
| *Master:* | [![Build Status](https://travis-ci.org/Pear-Trading/FoodLoop-Web.svg?branch=master)](https://travis-ci.org/Pear-Trading/FoodLoop-Web) |
| *Development:* | [![Build Status](https://travis-ci.org/Pear-Trading/FoodLoop-Web.svg?branch=development)](https://travis-ci.org/Pear-Trading/FoodLoop-Web) |

## Getting Started

To get started with development, you will need an up to date version of
node.js, git, and access to either the backend dev server, or a local running
copy of the backend server from [LocalLoop Server][LocalLoop-Server].

For your local node.js, We reccomend using [n][tj/n] on \*nix and Mac, for
Windows take a look at [nodist][marcelklehr/nodist] - although other options
exist. We reccomend Node.js version 8.0.0+ and npm version 5.3.0+.

To get this repository set up, first clone it and then run the following
commands:

```
npm install -g @angular/cli
npm install
```

[LocalLoop-Server]:https://github.com/Pear-Trading/Foodloop-Server
[tj/n]:https://github.com/tj/n
[marcelklehr/nodist]:https://github.com/marcelklehr/nodist

## Environments

The app defaults to using the development server. For other options, see
`src/environments/environments.ts`

# Old README

This is the old README with some minor tips on getting started, and more reading.

## Angular2DevelopmentCLI

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
