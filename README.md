# wiq_en3b

[![Deploy on release](https://github.com/Arquisoft/wiq_en3b/actions/workflows/release.yml/badge.svg)](https://github.com/Arquisoft/wiq_en3b/actions/workflows/release.yml)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=Arquisoft_wiq_en3b&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=Arquisoft_wiq_en3b)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=Arquisoft_wiq_en3b&metric=coverage)](https://sonarcloud.io/summary/new_code?id=Arquisoft_wiq_en3b)

This is a base repo for the [Software Architecture course](http://arquisoft.github.io/) in [2023/2024 edition](https://arquisoft.github.io/course2324.html).

This repo is a basic application composed of several components.

- **Gateway service**. Express service that is exposed to the public and serves as a proxy to the two previous ones.
- **User service**. Express service that handles the insertion of new users in the system.
- **Auth service**. Express service that handles the authentication of users.
- **Webapp**. React web application that uses the gateway service to allow basic login and new user features.

Both the user and auth service share a Mongo database that is accessed with mongoose.

## Members

| Name                      | Email              |
| ------------------------- | ------------------ |
| Carlos Menéndez González  | UO288056@uniovi.es |
| Didier Yamil Reyes Castro | UO287866@uniovi.es |
| Iyán Robles Suárez        | UO288780@uniovi.es |
| Raúl Mera Soto            | UO287827@uniovi.es |
| Mateo Rico Iglesias       | UO277172@uniovi.es |
| Anna Kutova               | UO305098@uniovi.es |
| Diego Murias Suárez       | UO290009@uniovi.es |

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

You can also use services like Mongo Altas for running a Mongo database in the cloud.

Now, launch the auth, user and gateway services. Just go to each directory and run `npm install` followed by `npm start`.

Lastly, go to the webapp directory and launch this component with `npm install` followed by `npm start`.

After all the components are launched, the app should be available in localhost in port 3000.

## Deployment

For the deployment, we have several options.

The first and more flexible is to deploy to a virtual machine using SSH. This will work with any cloud service (or with our own server).

Other options include using the container services that most cloud services provide. This means, deploying our Docker containers directly.

We are going to use the first approach, creating a virtual machine in a cloud service and after installing docker and docker-compose, deploy our containers there using GitHub Actions and SSH.

### Step 1: Creating a Virtual Machine

The machine for deployment can be created in services like Microsoft Azure or Amazon AWS. These are the steps you must follow:

1. Log in to the Azure/AWS portal and create a new virtual machine.
2. Select Ubuntu 20.04 as the operating system and configure the lowest possible hardware characteristics to minimize credit consumption.
3. In the network configuration, open the following ports:
   - Port 22 for SSH (default).
   - Port 3000 (for the webapp).
   - Port 8000 (for the gateway service).

### Step 2: Configuring the Virtual Machine

Once you have the virtual machine created, you can install **docker** and **docker-compose**:

1. Connect to the virtual machine via SSH using tools like MobaXterm or Putty.
2. Execute the following commands to install Docker and Docker Compose.

```bash
sudo apt update
```

```bash
sudo apt install apt-transport-https ca-certificates curl software-properties-common
```

```bash
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
```

```bash
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu focal stable"
```

```bash
sudo apt update
```

```bash
sudo apt install docker-ce
```

```bash
sudo usermod -aG docker ${USER}
```

```bash
sudo curl -L "https://github.com/docker/compose/releases/download/1.28.5/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
```

```bash
sudo chmod +x /usr/local/bin/docker-compose
```

### Step 3: Configuring the Virtual Repository for GitHub Actions

1. In the GitHub repository, go to `Settings` > `Secrets and variables` > `Action`.
2. Add the following keys:
   - In the `key` section, place the contents of the file `.pem` from the virtual machine.
   - In the `host` section, input the public IP address of the virtual machine.

### Step 4: Continuous delivery (GitHub Actions)

Once we have our machine ready, we could deploy by hand the application, taking our docker-compose file and executing it in the remote machine.

In this repository, this process is done automatically using **GitHub Actions**.

The idea is to trigger a series of actions when some condition is met in the repository. In our case, we are going to trigger the deployment when a new release is created. In order to create a new release, we must create a new tag in the repository. This can be done in the GitHub web interface.

As you can see, unitary tests of each module and e2e tests are executed before pushing the docker images and deploying them. Using this approach we avoid deploying versions that do not pass the tests.

The deploy action is the following:

```yml
deploy:
  name: Deploy over SSH
  runs-on: ubuntu-latest
  needs:
    [
      docker-push-userservice,
      docker-push-authservice,
      docker-push-gatewayservice,
      docker-push-webapp,
    ]
  steps:
    - name: Deploy over SSH
      uses: fifsky/ssh-action@master
      with:
        host: ${{ secrets.DEPLOY_HOST }}
        user: ${{ secrets.DEPLOY_USER }}
        key: ${{ secrets.DEPLOY_KEY }}
        command: |
          wget https://raw.githubusercontent.com/arquisoft/wiq_en3b/master/docker-compose.yml -O docker-compose.yml
          wget https://raw.githubusercontent.com/arquisoft/wiq_en3b/master/.env
          docker compose down
          docker compose --profile prod up -d
```

This action uses three secrets that we already have configured in the previous step:

- DEPLOY_HOST: public IP of the remote machine.
- DEPLOY_USER: user with permission to execute the commands in the remote machine (for Azure is `azureuser`).
- DEPLOY_KEY: key to authenticate the user in the remote machine (that is the file `.pem`).

Note that this action logs in the remote machine and downloads the docker-compose file from the repository and launches it. Obviously, previous actions have been executed which have uploaded the docker images to the GitHub Packages repository.
