# User service

## Quick start guide

First, the database must be started by either using Docker or something like MongoDB Compass.

```sh
docker run -d -p 27017:27017 --name=my-mongo mongo:latest
```

Then, all dependencies must be installed. For this, the following command should be executed:

```sh
npm install
```

This microservice is developed using Typescript. For running or debugging it, first the Typescript needs to be compiled into Javascript using tsc (Typescript compiler):

```sh
npm run tsc
```

Finally, in order to execute the application:

```sh
npm start
```

## Tests execution

For executing the tests, just run the following command:

```sh
npm run test
```

## Possible problems

It could happen that the application does not connect successfully to the MongoDB database even thought the DB is running and at port 27017. In that case, in the _app.ts_ file, try to change between "'mongodb://127.0.0.1:27017/userdb'" and "'mongodb://localhost:27017/userdb'".
