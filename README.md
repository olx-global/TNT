# the-node-tool

Tool for NodeJS based Microservices [will be renamed]

## Quick Overview

```sh
npx tnt-create-app my-app
cd my-app
npm start
```

### Get Started Immediately

You **don’t** need to install or configure tools like Rollup, Webpack or Babel.<br>
They are preconfigured and hidden so that you can focus on the code.

Just create a project, and you’re good to go.

## Creating an App

**You’ll need to have Node >= 8 on your local development machine** (but it’s not required on the server). You can use [nvm](https://github.com/creationix/nvm#installation) (macOS/Linux) or [nvm-windows](https://github.com/coreybutler/nvm-windows#node-version-manager-nvm-for-windows) to easily switch Node versions between different projects.

To create a new app, run a single command:

```sh
npx tnt-create-app my-app
```

_([npx](https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b) comes with npm 5.2+ and higher, see [instructions for older npm versions](https://gist.github.com/gaearon/4064d3c23a77c74a3614c498a8bb1c5f))_

It will create a directory called `my-app` inside the current folder.<br>

### `npm start` or `yarn start`

Runs the app in development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will automatically reload if you make changes to the code.<br>
You will see the build errors and lint warnings in the console.

### `npm test` or `yarn test`

Runs the test watcher in an interactive mode.<br>
By default, runs tests related to files changed since the last commit.

## What’s Included?

Your environment will have everything you need to build a modern microservice app:

* ES6, and Flow syntax support.
* Language extras beyond ES6 like the object spread operator.
* A fast interactive unit test runner with built-in support for coverage reporting.
* A live development server that warns about common mistakes.
* Hassle-free updates for the above tools with a single dependency.
