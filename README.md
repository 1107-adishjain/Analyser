# Analyser Repository: Introduction

## Overview

The Analyser project is a web application designed to help developers and designers identify and fix accessibility issues in web content. It leverages the power of `axe-core`, a leading accessibility testing engine, to provide detailed reports on compliance with WCAG (Web Content Accessibility Guidelines) standards. The application supports analysis of both raw HTML snippets and live website URLs.

## Goals

The primary goals of the Analyser project are:

*   **Promote Web Accessibility:** To make the web more inclusive by providing accessible tools for developers.
*   **Identify and Remediate Issues:** To empower users to find and fix accessibility barriers in their web projects.
*   **Ease of Use:** To offer a user-friendly interface for both HTML and URL-based analysis.
*   **Developer Empowerment:** To provide actionable insights and detailed reports that aid in the development process.

## Technologies Used

The Analyser project is built using a modern technology stack:

*   **Frontend:**
    *   **Next.js:** A React framework for building server-rendered and static web applications. It provides a robust structure for routing, API routes, and component-based development.
    *   **Tailwind CSS:** A utility-first CSS framework for rapid UI development.
    *   **React:** A JavaScript library for building user interfaces.
*   **Backend/API:**
    *   **Next.js API Routes:** Used to handle backend logic, including interacting with `axe-core` and external services.
    *   **Puppeteer:** A Node.js library that provides a high-level API to control Chrome or Chromium over the DevTools Protocol. It's used here to launch a headless browser instance for running `axe-core` on web pages.
    *   **axe-core:** The core accessibility testing engine that performs the actual analysis.
*   **Infrastructure & CI/CD:**
    *   **Docker:** Containerization for consistent deployment environments.
    *   **Jenkins:** Continuous Integration/Continuous Deployment (CI/CD) for automating build, test, and deployment pipelines.
    *   **Nginx:** A web server and reverse proxy used for routing traffic and serving the application.
    *   **EC2:** Cloud computing instances for hosting the deployed application.
    *   **DockerHub:** Container registry for storing and distributing Docker images.
*   **Database:**
    *   **Supabase:** An open-source Firebase alternative, providing a PostgreSQL database, authentication, and other backend services. Used for storing user data and saved analysis reports.

## Core Functionality

The Analyser application provides two primary modes of analysis:

### 1. HTML Analysis

Users can paste raw HTML code directly into a text area. The application then sends this HTML to the backend API (`/api/analysehtml`) for processing.

*   **Process:**
    1.  The backend receives the HTML content.
    2.  Puppeteer launches a headless browser.
    3.  The HTML is loaded into a new page using `page.setContent()`.
    4.  The `axe-core` script is injected into the page.
    5.  `axe.run()` is executed to perform the accessibility scan.
    6.  The results (violations, passes, etc.) are returned to the frontend.

*   **Integration Points:**
    *   `src/app/api/analysehtml/route.jsx`: Handles the POST request for HTML analysis.
    *   `src/app/component/html.jsx`: The frontend component for the HTML input and results display.

### 2. URL Analysis

Users can input a URL of a website. The application then fetches the accessibility report for that URL.

*   **Process:**
    1.  The backend receives the URL.
    2.  Puppeteer launches a headless browser.
    3.  The specified URL is navigated to using `page.goto()`.
    4.  The `axe-core` script is injected into the page.
    5.  `axe.run()` is executed to perform the accessibility scan.
    6.  The results are returned to the frontend.

*   **Integration Points:**
    *   `src/app/api/analyseURL/route.jsx`: Handles the POST request for URL analysis.
    *   `src/app/component/url.jsx`: The frontend component for URL input and results display.

## Authentication and Data Persistence

The application integrates with Supabase for user authentication and data storage.

*   **Authentication:** Users can register and log in using email/password or potentially other methods (e.g., Google Sign-In, as indicated in the `login/page.jsx` file).
*   **Data Persistence:** Logged-in users can save their analysis reports (both HTML and URL-based) to the Supabase database. This allows users to track their progress and revisit past analyses.

*   **Integration Points:**
    *   `src/lib/supabase.js`: Supabase client initialization and configuration.
    *   `src/hooks/useAuth.js`: Custom hook for managing authentication state.
    *   `src/app/login/page.jsx` & `src/app/register/page.jsx`: Authentication UI components.
    *   `src/app/component/navbar.jsx`: Displays login/logout options based on authentication status.
    *   `src/lib/database.js`: Functions for interacting with the Supabase database (saving reports).
    *   `src/app/component/html.jsx` & `src/app/component/url.jsx`: Components that conditionally display a "Save Report" button for authenticated users.

## CI/CD Pipeline (Jenkinsfile)

The `jenkinsfile` defines the automated build, test, and deployment process.

*   **Stages:**
    1.  **Checkout:** Clones the repository.
    2.  **Lint Code:** Runs code linting using `npm run lint` within the `docker` directory.
    3.  **Build Docker Image:** Builds a Docker image, injecting Supabase credentials as build arguments.
    4.  **Push to DockerHub:** Tags the image as `latest` and pushes both the build-specific and `latest` tags to DockerHub.
    5.  **Deploy to EC2:** Clones the repository on the EC2 instance, pulls the latest Docker image, stops the old container, and starts a new one using `docker compose`.

*   **Key Environment Variables:**
    *   `DOCKER_IMAGE`, `DOCKERHUB_REPO`: For Docker image management.
    *   `EC2_USER`, `EC2_IP`, `EC2_SSH_KEY`: For SSH access and deployment to the EC2 instance.
    *   `SUPABASE_URL`, `SUPABASE_ANON_KEY`: Sensitive credentials injected during the Docker build process.

*   **Post-build Actions:**
    *   **Always:** Cleans up Docker resources on the Jenkins agent.
    *   **Success/Failure:** Reports the deployment status.

## Configuration Files

*   `eslint.config.mjs`: ESLint configuration for code linting, extending Next.js core web vitals.
*   `next.config.mjs`: Next.js configuration file. Currently minimal, but can be extended for advanced Next.js features.
*   `nginx/nginx.conf`: Nginx configuration for routing traffic to the frontend application and handling API requests. It includes specific routing for `/api/metrics` to be accessible only by Prometheus or internal Docker networks.

## Monitoring

*   **Metrics Endpoint:** The `/api/metrics` route exposes Prometheus-compatible metrics.
    *   It counts incoming HTTP requests using `prom-client`.
    *   Access to this endpoint is restricted to specific IP ranges (e.g., Docker internal networks or localhost) for security.

*   **Integration Points:**
    *   `src/app/api/metrics/route.jsx`: Implements the metrics endpoint.
    *   `nginx/nginx.conf`: Configures Nginx to route `/api/metrics` appropriately and restrict access.

## Best Practices and Usage Patterns

*   **Environment Variables:** Sensitive information (like Supabase keys) should be managed via environment variables and injected securely during the Docker build process, as demonstrated in the `jenkinsfile`.
*   **Error Handling:** Robust error handling is implemented in API routes (`try...catch` blocks) to gracefully manage issues during analysis or external service interactions.
*   **Client-Side State Management:** React's `useState` hook is used effectively in components like `Body`, `Textbox`, and `Urlbox` to manage UI state (e.g., input values, loading status, analysis results).
*   **Authentication Flow:** The `useAuth` hook centralizes authentication logic, making it easy to check user status and manage sessions across the application.
*   **Code Organization:** Components are organized within the `src/app/component` directory, promoting modularity and maintainability. Utility functions and hooks are placed in `src/lib` and `src/hooks` respectively.
