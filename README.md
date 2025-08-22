# Accessibility Analyzer

The Accessibility Analyzer is a web application designed to help developers and designers identify and rectify accessibility issues within web content. It leverages the power of `axe-core`, a leading accessibility testing engine, to provide comprehensive reports on both raw HTML snippets and live web pages.

## Goals and Functionality

The primary goal of the Accessibility Analyzer is to promote inclusive web design and development by making accessibility testing straightforward and accessible.

### Core Functionality:

1.  **HTML Analysis:**
    *   Allows users to paste raw HTML code directly into a text area.
    *   Upon submission, the application analyzes the provided HTML for accessibility violations using `axe-core`.
    *   **Integration:** The `src/app/api/analysehtml/route.jsx` API endpoint handles this process. It uses `puppeteer` to render the HTML in a headless browser environment and injects the `axe-core` script for analysis.

2.  **URL Analysis:**
    *   Enables users to input a URL of a live website.
    *   The application fetches the content of the specified URL and performs an accessibility analysis using `axe-core`.
    *   **Integration:** The `src/app/api/analyseURL/route.jsx` API endpoint manages this functionality. It also utilizes `puppeteer` to navigate to the URL, load the page, and run `axe-core`.

3.  **Accessibility Reporting:**
    *   Presents analysis results in a clear, structured format.
    *   Reports include:
        *   A summary of passes and violations.
        *   A breakdown of violations by impact level (critical, serious, moderate, minor).
        *   Detailed information for each violation, including its ID, description, help URL, and the specific HTML nodes affected.
    *   **Integration:** The UI components `src/app/component/html.jsx` and `src/app/component/url.jsx` are responsible for displaying these reports.

4.  **User Authentication and Report Saving:**
    *   Users can register and log in to save their analysis reports.
    *   Saved reports are associated with the user's account and can be accessed later.
    *   **Integration:**
        *   Supabase is used for authentication (`src/lib/supabase.js`, `src/app/login/page.jsx`, `src/app/register/page.jsx`).
        *   The `src/lib/database.js` module handles saving analysis results to the Supabase database.
        *   The `src/app/reports/page.jsx` displays the user's saved reports.

5.  **Metrics Endpoint:**
    *   Provides an endpoint for Prometheus to scrape application metrics.
    *   **Integration:** The `src/app/api/metrics/route.jsx` endpoint exposes metrics like total HTTP requests, secured by a token-based authentication mechanism.

### Technical Stack:

*   **Frontend:** Next.js, React, Tailwind CSS
*   **Accessibility Engine:** axe-core
*   **Browser Automation:** Puppeteer
*   **Backend/API:** Next.js API Routes
*   **Database:** Supabase (PostgreSQL)
*   **Authentication:** Supabase Auth
*   **CI/CD:** Jenkins (defined in `jenkinsfile`)

## Architecture Overview

![Architecture Diagram](./dfd.png)

## Key Components and Integration Points

*   **`src/app/page.js`**: The main page component rendering the `Navbar` and `Body`.
*   **`src/app/component/navbar.jsx`**: Handles navigation and user authentication status display. Integrates with Supabase for session management.
*   **`src/app/component/body.jsx`**: Manages the main content area, including the tabbed interface for HTML and URL analysis.
*   **`src/app/component/html.jsx`**: Contains the textarea for HTML input, the analysis submission logic, and the display of HTML analysis reports. It interacts with `/api/analysehtml`.
*   **`src/app/component/url.jsx`**: Features the URL input field, analysis submission, and URL analysis report display. It interacts with `/api/analyseURL`.
*   **`src/app/api/analysehtml/route.jsx`**: The API endpoint for analyzing HTML. It uses `puppeteer` to render HTML and `axe-core` for the analysis.
*   **`src/app/api/analyseURL/route.jsx`**: The API endpoint for analyzing URLs. It uses `puppeteer` to fetch and render web pages for `axe-core` analysis.
*   **`src/lib/supabase.js`**: Provides the Supabase client instance and a safe fallback for when Supabase is not configured.
*   **`src/lib/database.js`**: Contains functions for interacting with the Supabase database, specifically for saving analysis results (`saveViolationFromUrl`, `saveViolationFromHtml`) and fetching user reports (`getUserViolations`).
*   **`src/app/reports/page.jsx`**: Displays a list of saved analysis reports for the logged-in user, fetched from Supabase.

---

## CI/CD Pipeline

The **CI/CD pipeline** is managed through a Jenkinsfile. It automates:

1. **Checkout** → Retrieves latest code.  
2. **Linting** → Runs static code checks.  
3. **Build Docker Image** → Injects environment variables.  
4. **Push to DockerHub** → Publishes the Docker image.  
5. **Deploy to EC2** → Uses `docker compose up -d` for deployment.  

**Best Practices:**  
- Use Jenkins credentials for SSH keys, tokens, passwords.  
- Store configs in environment variables, not hardcoded.  
- Deployments idempotent (repeated runs yield same state).  
- Use `set -e` and proper error handling in scripts.  
- Rotate credentials + secure EC2 SG rules.  
- Optimize Dockerfiles (multi-stage builds, caching).  
- Ensure `docker-compose.yml` defines services, networks, volumes, and Nginx reverse proxy setup.  

---

## Nginx Configuration

Nginx is used as a **reverse proxy** in front of the Next.js app.  

**Purpose:**  
- Route `/` and `/api/*` traffic to Next.js backend (`frontend:3000`).  
- Secure `/api/metrics` with token + IP allowlist.  
- Improve performance with keepalive, timeouts, caching bypass, and WebSocket support.  

**Highlights:**  
- `worker_connections 1024` → handle concurrency.  
- `sendfile on` + `keepalive_timeout 65`.  
- Timeouts increased to 600s (long-running analysis).  
- `upstream frontend { server frontend:3000; }`.  
- `location /` → proxies all general traffic.  
- `location /api/` → routes API calls.  
- `location /api/metrics` → only allows localhost + Docker subnets, forwards token in `X-Metrics-Token`.  

**Integration Points:**  
- **Docker Compose** mounts `nginx.conf`.  
- **Next.js API routes** handle requests proxied by Nginx.  
- **Jenkinsfile** ensures Nginx config + metrics token are deployed.  

**Best Practices:**  
- Use env-specific configs (prod domains, TLS).  
- Monitor Nginx logs for debugging & security.  
- Add health checks for upstream containers.  
- In production, configure HTTPS on port 443.  

---

## Best Practices and Usage Patterns

*   **Error Handling:** All API routes include `try...catch` blocks to handle potential errors during analysis or data processing. User-facing errors are communicated via alerts or appropriate UI feedback.
*   **Input Validation:** Both HTML and URL inputs are validated to ensure they are in a correct format before being sent to the analysis API.
*   **Authentication Flow:** Users must be logged in to save reports. The UI provides clear feedback on authentication status and prompts users to log in when attempting to save.
*   **Progress Indicators:** Loading states (`loading`, `saving`) are managed and visually indicated to the user during potentially long-running operations like analysis and report saving.
*   **Environment Variables:** Sensitive information like Supabase URL and Anon Key are managed via environment variables (`.env.local` or similar), crucial for security and deployment. The `jenkinsfile` demonstrates how these can be injected during the build process.

## Common Pitfalls and Gotchas

*   **Puppeteer Sandbox Issues:** Running Puppeteer in a containerized environment (like Docker) often requires the `--no-sandbox` flag for `puppeteer.launch()`. This is already configured in the API routes.
*   **Timeout Errors:** Web page analysis can sometimes take longer than expected. The `puppeteer.launch()` configuration includes `timeout` and `protocolTimeout` to prevent premature termination of the analysis process.
*   **Supabase Configuration:** Ensure that `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are correctly set in the environment for Supabase integration to work. The `src/lib/supabase.js` file includes checks and warnings for missing configuration.
*   **Rate Limiting:** Be mindful of potential rate limits imposed by external websites when analyzing URLs. The current implementation does not explicitly handle rate limiting.
*   **Dynamic Imports:** Components like `Textbox` and `Urlbox` are client components (`"use client"`). Ensure they are correctly imported and rendered within the client-side context.
