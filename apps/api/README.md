# Carbon Credits Portfolio - API

> This project provides an api to generate portfolio for the requested volume(tons) with a variety of carbon credits for customers.

> It's implemented using Typescript, Nest.js, Node.js, Swagger, and uses mongo db for database and configured using turbo.

<p align="center">
    <a href="https://merry-enthusiasm-production.up.railway.app" target="blank">API Demo</a>
</p>

<p align="center"><img src="../../screenshots/api.png" alt="carbon-credits-portfolio-api" /></p>


## Technologies

- [Nest.js v10.0.0](https://nestjs.com/)
- [Nest Mongoose](https://www.npmjs.com/package/@nestjs/mongoose)
- [Swagger Documentation](https://www.npmjs.com/package/@nestjs/swagger)
- [Typescript v5](https://www.typescriptlang.org/)
- [Node.js v18.20.2](https://nodejs.org/)

## Installation Steps

> > This project configured using turbo for build and development and you don't need to run these below steps unless you want to start separately. Please before run the app, make sure to install the following software in your system locally.

 - [Turbo](https://turbo.build/) install globally - Turbo is an incremental bundler and build system optimized for JavaScript and TypeScript, written in Rust.
 - [Node.js v18]((https://nodejs.org/))
 - [Mongodb](https://www.mongodb.com/try/download/community) or MongoDB connection string.

1. Clone the repository

```bash
git clone https://github.com/ravisankarchinnam/carbon-credits-portfolio.git
```

2. Change the working directory

```bash
cd apps/api
```

1. Create `.env` file using .env.example and add your variables

```bash
MONGODB_URI=[YOUR_MONGODB_URI] #http://localhost:27017/ceezer
MONGODB_URI_TEST=[YOUR_MONGODB_URI_FOR_TEST] #mongodb://localhost:27017/test_ceezer
API_PORT=[YOUR_PORT] #4000
```

4. Install dependencies

```bash
npm install
```

5. start the app

```bash
npm run dev
```

> You are all set! Open [localhost:4000/documentation](http://localhost:4000/documentation) to see the app.

> `npm run build` - which generates a dist folder with all the files ready for the prod deployment in the same `api` folder.

### Tests
This project contains tests as part of the development. Run the following command to run the tests locally.

```bash
cd apps/api
npm run test
npm run test:e2e
```

### Enhancements

1. Configure Indexing and setup Caching mechanism
2. Introduce advanced filtering for the search
3. Implement user creation to save search history
4. Implement Role based authentication for creating projects
5. Implement Cursor pagination for the search in case of huge datasets
6. Implement CRUD Operations for Projects
7.  Potential to convert to micro services as the project grows

## Author

> Ravisankar Chinnam
