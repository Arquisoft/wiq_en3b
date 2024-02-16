# Instructions for Deployment on Azure

## Creating a Virtual Machine on Azure

1. Log in to the Azure portal and create a new virtual machine.
2. Select Ubuntu as the operating system and configure the lowest possible hardware characteristics to minimize credit consumption.
3. In the network configuration, open the following ports:
   - Port 22 for SSH.
   - Port 3000.
   - Port 8000.

## Configuring the Virtual Machine

1. Connect to the virtual machine via SSH using tools like MobaXterm or Putty.
2. Execute the following commands to install Docker and Docker Compose:

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

## Configuring the Virtual Repository for GitHub Actions

1. In the GitHub repository, go to `Settings` > `Secrets and variables` > `Action`.
2. Add the following keys:
   - In the `key` section, place the contents of `key.pem` from the virtual machine.
   - In the `host` section, input the public IP address of the virtual machine.

## Deployment of the Application Code

1. Execute the event triggering the deployment workflow in GitHub Actions.
2. This event involves creating a new release of the application code and assigning a new tag with the corresponding version.
