Here’s a complete `README.md` document that includes instructions for setting up a self-hosted runner, creating the workflow, and other details for your CI/CD practice:

```markdown
# Simple CI/CD Practice with Self-Hosted Runner

This project is a simple CI/CD practice using a React.js application deployed on an Alibaba Cloud server. The deployment is managed using Nginx, PM2, and GitHub Actions with a self-hosted runner.

## Overview

- **Server**: Alibaba Cloud
- **Web Server**: Nginx
- **Application**: React.js
- **Process Manager**: PM2
- **CI/CD**: GitHub Actions with Self-Hosted Runner

## Setup Guide

### 1. Clone the Repository

Start by cloning the repository to your local machine:

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

### 2. Install Dependencies

Install the necessary dependencies for your React.js application:

```bash
npm install
```

### 3. Build the React Application

Build the React application to prepare it for deployment:

```bash
npm run build
```

### 4. Set Up PM2 on the Server

Install PM2 globally on your Alibaba Cloud server:

```bash
npm install pm2 -g
```

Start your application using PM2:

```bash
pm2 start npm --name "your-app-name" -- start
```

### 5. Configure Nginx

Set up Nginx to serve your React application. Create or modify the Nginx configuration file:

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        root /path/to/your/react/build;
        try_files $uri /index.html;
    }

    location /api/ {
        proxy_pass http://localhost:5000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Reload Nginx to apply the configuration:

```bash
sudo systemctl reload nginx
```

### 6. Set Up a Self-Hosted GitHub Runner

#### 6.1. Create a Self-Hosted Runner on GitHub

1. Go to your GitHub repository.
2. Navigate to **Settings** > **Actions** > **Runners**.
3. Click **Add runner**.
4. Choose **Linux** as the operating system.
5. Follow the on-screen instructions to download and configure the runner on your Alibaba Cloud server.

Example commands to set up the runner:

```bash
# Download the runner package
mkdir actions-runner && cd actions-runner
curl -o actions-runner-linux-x64-2.294.0.tar.gz -L https://github.com/actions/runner/releases/download/v2.294.0/actions-runner-linux-x64-2.294.0.tar.gz

# Extract the installer
tar xzf ./actions-runner-linux-x64-2.294.0.tar.gz

# Configure the runner
./config.sh --url https://github.com/your-username/your-repo-name --token YOUR_GENERATED_TOKEN

# Start the runner
./run.sh
```

To have the runner start automatically, you can install it as a service:

```bash
sudo ./svc.sh install
sudo ./svc.sh start
```

### 7. Create the GitHub Actions Workflow

Create a workflow file in your repository under `.github/workflows/deploy.yml`:

```yaml
name: CI/CD Pipeline

on:
  push:
    branches:
      - main

jobs:
  build:
    runs-on: self-hosted
    steps:
      - name: Checkout code
        uses: actions/checkout@v2

      - name: Set up Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '14'

      - name: Install dependencies
        run: npm install

      - name: Build application
        run: npm run build

      - name: Deploy to Server
        run: |
          cp -r ./build /path/to/your/react/build
          pm2 restart your-app-name
```

### 8. Testing the Workflow

Push changes to the `main` branch of your repository, and the GitHub Actions workflow will automatically trigger. The workflow will use the self-hosted runner to build the application and deploy it to the server.

### 9. Monitoring with PM2

You can monitor the application and logs using PM2 commands:

```bash
# List running processes
pm2 list

# View logs
pm2 logs your-app-name

# Restart the app
pm2 restart your-app-name
```

## Conclusion

This setup demonstrates a simple CI/CD pipeline using GitHub Actions with a self-hosted runner on an Alibaba Cloud server. Nginx is used as a web server, and PM2 manages the application process. This setup can be extended and modified to suit more complex requirements.

This document provides a complete guide, including instructions on how to set up a self-hosted runner, configure the workflow, and manage deployment with PM2 and Nginx. Make sure to replace placeholders with actual values used in your project.
