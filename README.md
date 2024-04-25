# JBN Furniture Admin Backend

Welcome to the JBN Furniture Admin Backend repository! This backend system is designed to manage the workflow of a furniture company efficiently. This guide provides detailed instructions on how to set up and run the development environment both with and without Docker.

## Prerequisites

Before you start, ensure you have the following installed:
- **Node.js**: Download and install from [Node.js official website](https://nodejs.org/).
- **MongoDB**: Follow the installation guide on the [MongoDB official website](https://www.mongodb.com/try/download/community).
- **Docker** (optional): Download and install Docker Desktop for [Windows](https://docs.docker.com/docker-for-windows/install/) or [Mac](https://docs.docker.com/docker-for-mac/install/), or Docker Engine for [Linux](https://docs.docker.com/engine/install/).
- **Visual Studio Code** (optional): Download and install from [here](https://code.visualstudio.com/Download). For Docker-based setup, also install the **Remote - Containers Extension** from the VS Code marketplace.

## Getting Started

### Option 1: Running Locally Without Docker

1. **Clone the Repository**
   ```bash
   git clone git@github.com:Quirall-Tech/jbn-funiture-admin.git
   cd jbn-furniture-admin
   ```
2. **Install Dependencies**
   ```bash
   npm install
   ```
3. **Set Environment Variables**
   Copy the `.env.example` file to `.env` and adjust the variables to fit your local settings.
   ```bash
   cp .env.example .env
   ```

4. **Start the MongoDB Service**
   Ensure that MongoDB is running on your local machine. You can start it by running:
   ```bash
   mongod
   ```
5. **Run the Application**
   Start the application with:
   ```bash
   npm start
   ```

### Option 2: Running with Docker Using `local.yml`

If you prefer to use Docker to manage your development environment, follow these steps to get started using the `docker-compose` configuration specified in the `local.yml` file.

1. **Prepare Docker Environment**
   Before you start, ensure that Docker is installed and running on your system. Also, confirm that the `docker-compose.yml` file or a specific `local.yml` file exists in your project that defines your Node.js and MongoDB services.

2. **Open the Project Directory**
   Navigate to the root directory of your project where the `docker-compose` file is located.

3. **Start the Services**
   Run the following command in your terminal to start all services defined in your `local.yml` file. This command will build the Docker images if they don't exist and start the containers.
   ```bash
   docker-compose -f local.yml up --build
   ```
This will start the Node.js application and any other services (like MongoDB) as specified in your Docker configuration. The --build flag ensures that Docker re-builds the images if there have been changes to the Dockerfiles or Docker-compose configurations.

# Access the Application

To access the application, navigate to the `http://localhost:3000` URL in your browser.

### Thank You, We will update the docs as the project grows