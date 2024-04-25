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