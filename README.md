<p align="center">
  <a href="">
    <img src="https://integritatepebune.ro/_next/image?url=%2Fimages%2Fprofile.png&w=384&q=75">
  </a>

  <h3 align="center">
    ANI-Research-Web
    <small>by IT-PeBune</small>
  </h3>

   <!-- <p align="center">
      <a href="#"><strong>Explore the API documentation »</strong></a>
    </p> -->
</p>

## Table Of Contents

- [Table Of Contents](#table-of-contents)
- [About The Project](#about-the-project)
- [Built With](#built-with)
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Available commands](#available-commands)
- [Production Environment](#production-environment)
  - [Hosting](#hosting)
  - [Deployement](#deployement)
  - [Contributing](#contributing)
- [Instructions](#instructions)
- [Tags](#tags)
- [Outside Collaborators](#outside-collaborators)

## About The Project

Frontend application that is serving [ANI-Research-Backend](https://github.com/it-pebune/ani-research-backend) API.

## Built With

- [React 17.x](https://17.reactjs.org/)
- [Mui 5.x](https://mui.com/material-ui/getting-started/installation/)

## Getting Started

To get a copy up and running follow the following steps (it is assumed that basic tools like git, node and yarn are already installed).

### Installation

1. Clone the repo

```sh
git clone git@github.com:it-pebune/ani-research-web.git
```

2. CD into the project root directory

```sh
cd ani-research-web
```

3. Install the required Npm Packages

```sh
yarn
```

4. Turn the application on

```sh
yarn start
```

### Available commands

- `yarn start` - Start a development server for react
- `yarn build` - Build the project for deployment
- `yarn test` - Run tests
- `yarn eject` - Remove react-scripts from the project and end up with a plain webpack project
- `yarn format` - Format files with prettier
- `yarn format:check` - Check files with prettier
- `yarn lint` - Check files with ESLint
- `yarn lint:fix` - Format files with ESLint
- `yarn prepare` - Autorun to install husky (pre-commit linting)

## Production Environment

_Reserved for future documentation._

### Hosting

_Reserved for future documentation._

### Deployement

_Reserved for future documentation._

### Contributing

The following isntructions are made for users with edit permission to this repository:

For [outside collaborators check this](#outside-collaborators)

## Instructions

- Get assigned an issue
- Create a new branch conform with the [Tags](#tags)
- Create a PR pointing to either main or prod
- Review & Publish

## Tags

Follow a clear workflow when contributing, using the same branch tags:

- ![](https://img.shields.io/badge/-feature-5319e7) - `feature/branch-name` - New feature from main
- ![](https://img.shields.io/badge/-fix-d93f0b) - `fix/branch-name` - New fix from main
- ![](https://img.shields.io/badge/-hotfix-b60205) - `hotfix/branch-name` - New fix from prod (deployed directly, skips staging)

## Outside Collaborators

- Fork the repository
- Run the [getting started steps](#getting-started)
- Follow the same instructions as normal contributors
