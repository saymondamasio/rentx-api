<h1 align="center">
	<img alt="Logo" src=".github/logo.svg" width="200px" />
</h1>

<h3 align="center">
  RentX
</h3>

<p align="center">Make your rentals with comfort</p>

<p align="center">
  <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/saymondamasio/rentx-api">

  <a href="https://www.linkedin.com/in/saymondamasio/">
    <img alt="Made by" src="https://img.shields.io/badge/made%20by-Saymon%20Damásio-gree">
  </a>
  
  <img alt="Repository size" src="https://img.shields.io/github/repo-size/saymondamasio/rentx-api">
  
  <a href="https://github.com/saymondamasio/rentx-api/commits/master">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/saymondamasio/rentx-api">
  </a>
  
  <a href="https://github.com/saymondamasio/rentx-api/issues">
    <img alt="Repository issues" src="https://img.shields.io/github/issues/saymondamasio/rentx-api">
  </a>
  
  <img alt="GitHub" src="https://img.shields.io/github/license/saymondamasio/rentx-api">
</p>

<p align="center">
  <a href="#-about-the-project">About the project</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-technologies">Technologies</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-getting-started">Getting started</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-how-to-contribute">How to contribute</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-license">License</a>
</p>

<p id="insomniaButton" align="center">
  <a href="" target="_blank"><img src="https://insomnia.rest/images/run.svg" alt="Run in Insomnia"></a>
</p>

## 👨🏻‍💻 About the project

- <p style="color: red;">An API that manages car rentals</p>

<!-- To see the **web client**, click here: [PROJECT_NAME Web](https://github/saymondamasio/rentx-web)</br>
To see the **mobile client**, click here: [PROJECT_NAME Mobile](https://github/saymondamasio/rentx-mobile) -->

## 🚀 Technologies

Technologies that I used to develop this api

- [Node.js](https://nodejs.org/en/)
- [TypeScript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/pt-br/)
- [Multer](https://github.com/expressjs/multer)
- [TypeORM](https://typeorm.io/#/)
- [JWT-token](https://jwt.io/)
- [Handlebars](https://handlebarsjs.com/)
- [uuid v4](https://github.com/thenativeweb/uuidv4/)
- [PostgreSQL](https://www.postgresql.org/)
- [MongoDB](https://www.mongodb.com/)
- [Redis](https://redis.io/)
- [Tsyringe](https://github.com/microsoft/tsyringe/)
- [Date.js](https://day.js.org/)
- [Sentry](https://sentry.io/)
- [Swagger](https://swagger.io/)
- [Jest](https://jestjs.io/)
- [SuperTest](https://github.com/visionmedia/supertest)
- [Husky](https://github.com/typicode/husky)
- [Commitlint](https://github.com/conventional-changelog/commitlint)
- [Commitizen](https://github.com/commitizen/cz-cli)
- [Eslint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [EditorConfig](https://editorconfig.org/)
- [GithubActions](https://github.com/features/actions/)

## 💻 Getting started

Import the `Insomnia.json` on Insomnia App or click on [Run in Insomnia](#insomniaButton) button

### Requirements

- [Node.js](https://nodejs.org/en/)
- [Yarn](https://classic.yarnpkg.com/) or [npm](https://www.npmjs.com/)
- [Docker](https://www.docker.com//)

> Obs.: Docker is required to run the project on a local machine.

**Clone the project and access the folder**

```bash
$ git clone https://github.com/saymondamasio/rentx-api.git && cd rentx-api
```

**Follow the steps below**

```bash
# Install the dependencies
$ yarn

# Create the instances databases using docker
$ docker compose -d up

# Rename the ormconfig.example.json file to ormconfig.json

mv ormconfig.example.json ormconfig.json

# Once the services are running, run the migrations
$ yarn typeorm migration:run

# To finish, run the api service
$ yarn dev

# Well done, project is started!
```

## 🤔 How to contribute

**Make a fork of this repository**

```bash
# Fork using GitHub official command line
# If you don't have the GitHub CLI, use the web site to do that.

$ gh repo fork saymondamasio/rentx-api
```

**Follow the steps below**

```bash
# Clone your fork
$ git clone your-fork-url && cd NOME_DO_REPO

# Create a branch with your feature
$ git checkout -b my-feature

# Make the commit with your changes
$ git commit -m 'feat: My new feature'
## or use cli commitlint
$ yarn commit

# Send the code to your remote branch
$ git push origin my-feature
```

After your pull request is merged, you can delete your branch

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Made with 💜 &nbsp;by Saymon Damásio 👋 &nbsp;[See my linkedin](https://www.linkedin.com/in/saymondamasio/)
