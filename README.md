# 🚀 Welcome to Know and Win Application 🚀

[![Deploy on release](https://github.com/Arquisoft/wiq_en3b/actions/workflows/release.yml/badge.svg)](https://github.com/Arquisoft/wiq_en3b/actions/workflows/release.yml)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=Arquisoft_wiq_en3b&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=Arquisoft_wiq_en3b)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=Arquisoft_wiq_en3b&metric=coverage)](https://sonarcloud.io/summary/new_code?id=Arquisoft_wiq_en3b)

This repo is part of the [Software Architecture course](http://arquisoft.github.io/) in [2023/2024 edition](https://arquisoft.github.io/course2324.html). It is basically
a web game trying to emulate the famous spanish TV show [Saber y Ganar](https://www.youtube.com/watch?v=w0Q0i0fnfwM), a trivia like game where users answers 
questions to win juicy prizes 🥇 

## Test our app at 🤑🤑
http://kawgame.xyz:3000/

And if it doesn't work, try the following...

http://20.117.173.161:3000

## Test our API at 📃📃

http://20.117.173.161:8000/

And if you want to check the documentation for it...

http://20.117.173.161:8000/api-doc

## Quick start guide

### Using docker

The fastest way for launching this sample project is using docker. Just clone the project:

```sh
git clone https://github.com/Arquisoft/wiq_en3b.git
```

and launch it with docker compose:

```sh
docker compose --profile dev up --build
```

### Starting Component by component

First, start the database. Either install and run Mongo or run it using docker:

`docker run -d -p 27017:27017 --name=my-mongo mongo:latest`

You can also use services like Mongo Atlas for running a Mongo database in the cloud.

Now, launch the auth, user, question and gateway services. Just go to each directory and run `npm install` followed by `npm start`.

Lastly, go to the webapp directory and launch this component with `npm install` followed by `npm start`.

After all the components are launched, the app should be available in localhost in port 3000.

## Deployment guide

If you want to deploy a server and display our work, you can follow this nice
markdown file <TBD_LINK>

But please, remember to tag us :)

## Contributors

| Name                      | Email              |
| ------------------------- | ------------------ |
| Carlos Menéndez González  | UO288056@uniovi.es |
| Didier Yamil Reyes Castro | UO287866@uniovi.es |
| Iyán Robles Suárez        | UO288780@uniovi.es |
| Raúl Mera Soto            | UO287827@uniovi.es |
| Mateo Rico Iglesias       | UO277172@uniovi.es |
| Anna Kutova               | UO305098@uniovi.es |
| Diego Murias Suárez       | UO290009@uniovi.es |
