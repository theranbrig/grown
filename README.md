# Grown

> Connecting Communities to their Farms.

![Logo](https://i.imgur.com/Gcwggjm.png)

Grown is a full-stack JavaScript project built upon React and GraphQL. It is a place for farmers to sell their products online and for consumers to order products online for later pick up at farmer markets. It is built primarily with React and Apollo on the client side, with GraphQL Yoga amd Prisma connected on the backend.


## Installation

### Running Locally

Make sure you have [Node.js](http://nodejs.org/), [Prisma](https://prisma.io), and the [Heroku Toolbelt](https://toolbelt.heroku.com/) installed.

Download and install dependencies.

```sh
git clone git@github.com:theranbrig/grown # or clone your own fork
cd grown
<!-- Be sure to install dependencies in both frontend and backend folders -->
cd frontend
npm install
cd backend
npm install
```

Make sure that you connect your app to a database first. This one is connected to a Prisma test database, but you can connect it to your own SQL database by following the directions at [Prisma](https://prisma.io).

### Backend

In the root directory of the `backend` folder be sure that you create and set up your own `variables.env` file with the following information:

```sh
cd backend
touch `variables.env`
```

Fill in the `variables.env` file with your own information:

```env
FRONTEND_URL="http://localhost:7777"
PRISMA_ENDPOINT="YOUR PRISMA ENDPOINT HERE"
PRISMA_SECRET="MAKE UP A SECRET"
PORT=4444
```

After that is set up you can fun the following:

```sh
npm run deploy
```

Once the prisma database is set up you may run the development server with:

```sh
npm run dev
```

Run the project :

```sh
npm run dev
```

Your backend should now be running on [localhost:4444](http://localhost:4444/).

### Backend

Make sure your dependencies are installed in the `frontend` folder.  You may then use:

```sh
npm run dev
```

Your app should now be running on [localhost:7777](http://localhost:7777/).

Make sure you are running both the `frontend` and `backend` folders.

## Built With

- [Node](https://github.com/nodejs/node)
- [React](https://reactjs.org)
- [GraphQL](https://graphql.org/)
- [Prisma](https://prisma.io)
- [Apollo](https://www.apollographql.com/client)
- [Stripe](https://github.com/stripe/stripe-node)
- [Jest](https://github.com/facebook/jest/)
- [Heroku](https://github.com/heroku)

## Author

## Author

Theran Brigowatz is a Full-stack Web Developer currently out of Seoul, South Korea, but transitioning back to the US. Check him out at the following:

- [theran.co](https://www.theran.co)
- theran.brigowatz@gmail.com
- [twitter.com/wellBuilt](https://www.twitter.com/wellBuilt)
- [github.com/theranbrig](https://www.github.com/theranbrig)

> Made with :heart: and :coffee:.
