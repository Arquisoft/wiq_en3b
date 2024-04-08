# Quick Deployment Guide

In our case we are going to use Azure as our cloud provider. The following steps are a quick guide to deploy our application to a virtual machine in Azure:

1. Create an Ubuntu-20.04 virtual machine in Azure.
2. Select an available location for the virtual machine.
3. Choose the virtual machine size according to the project’s needs, considering the number of services and the expected traffic. As is not so demading, a small virtual machine is enough.
4. Allow SSH on port 22, by default is already open.
5. Configure GitHub repository secrets for deployment:
   - Download the private key (.pem file) and paste all of its textual content over `DEPLOY_KEY`. Save the file for later configurations over SSH at the virtual machine.
   - Check the public IP of the virtual machine at Azure and save it in `DEPLOY_HOST`.
6. Once the virtual machine is created and the repository is configured, we have to create some rules for the virtual machine:
   - Open port 3000 for the gateway.
   - Open port 8000 for the webapp.
7. Configure the virtual machine by connecting through SSH:
   - Use a tool for connecting to the server using SSH (example... PuTTY, MobaXterm…​).
   - Use the public IP address and the file .pem for making the connection.
   - Execute the following commands for preparing the virtual machine:

    ``
    sudo apt update
   ``
   
   ``
    sudo apt install apt-transport-https ca-certificates curl software-properties-common
   ``

   ``
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
   ``

   ``
    sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu focal stable"
   ``

   ``
    sudo apt update
   ``

   ``
    sudo apt install docker-ce
   ``

   ``
    sudo usermod -aG docker ${USER}
   ``

   ``
    sudo curl -L "https://github.com/docker/compose/releases/download/1.28.5/docker-compose-$(uname -s)-$(uname -m)"
   -o /usr/local/bin/docker-compose
   ``

   ``
    sudo chmod +x /usr/local/bin/docker-compose
    ``

9. Make a release in GitHub:
   - On the right-hand side of the main Code section of our repository, there is a section called Releases. It will be needed to add a new version following the version naming convention.
   - Once the release is made, some GitHub actions will be triggered, and the containers will be tested and running once everything finishes.
   - If some test fails during the process, deployment will be automatically aborted.
