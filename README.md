<!-- # Introduction to Analyser

Welcome to Analyser, a powerful web accessibility analysis tool designed to help developers and designers create more inclusive digital experiences. This repository contains the source code for a Next.js application that leverages the `axe-core` library to perform automated accessibility checks on web content.

## Purpose

Analyser aims to:

*   **Identify Accessibility Issues:** Detect violations of Web Content Accessibility Guidelines (WCAG) and other best practices.
*   **Provide Actionable Insights:** Offer detailed reports with clear descriptions, impact levels, and links to remediation guidance.
*   **Support Multiple Analysis Methods:** Allow users to analyze either raw HTML content or live web pages via URLs.
*   **Promote Inclusive Web Development:** Empower creators to build websites and applications that are usable by everyone, regardless of ability.

## Repository Structure

The repository is organized as follows:

*   **`eslint.config.mjs`**: ESLint configuration for maintaining code quality, extending Next.js core web vitals.
*   **`jenkinsfile`**: Jenkins pipeline script for CI/CD, including code checkout, linting, Docker image building, pushing to DockerHub, and deployment to EC2.
*   **`next.config.mjs`**: Next.js configuration file.
*   **`nginx/nginx.conf`**: Nginx configuration for reverse proxying and load balancing.
*   **`src/app/api/analyseURL/route.jsx`**: API route for analyzing accessibility of a given URL using Puppeteer and axe-core.
*   **`src/app/api/analysehtml/route.jsx`**: API route for analyzing accessibility of provided HTML content using Puppeteer and axe-core.
*   **`src/app/component/about.jsx`**: React component displaying information about the Analyser project.
*   **`src/app/component/body.jsx`**: Main component orchestrating the UI, including tab switching between HTML and URL analysis.
*   **`src/app/component/html.jsx`**: React component for handling HTML input and displaying analysis results.
*   **`src/app/component/navbar.jsx`**: Navigation bar component, including authentication status and user dropdown.
*   **`src/app/component/url.jsx`**: React component for handling URL input and displaying analysis results.
*   **`src/app/globals.css`**: Global CSS styles, primarily using Tailwind CSS.
*   **`src/app/layout.js`**: Root layout component for the Next.js application.
*   **`src/app/login/page.jsx`**: Page component for user login.
*   **`src/app/page.js`**: The main landing page of the application.
*   **`src/app/register/page.jsx`**: Page component for user registration.
*   **`src/components/ui/button.jsx`**: Reusable button component.
*   **`src/components/ui/dropdown-menu.jsx`**: Reusable dropdown menu component.
*   **`src/components/ui/progress.jsx`**: Reusable progress bar component.
*   **`src/lib/database.js`**: Utility functions for interacting with the Supabase database (saving and retrieving violation data).
*   **`src/lib/supabase.js`**: Supabase client initialization.
*   **`src/lib/utils.js`**: Utility functions for common tasks, such as class name merging (`cn`).

## Core Functionality: Accessibility Analysis

Analyser utilizes `axe-core`, a leading open-source accessibility engine, to perform its analysis. The process involves:

1.  **Browser Automation:** Puppeteer is used to launch a headless Chrome browser instance. This allows the application to load web pages or render HTML content in a controlled environment.
2.  **Script Injection:** The `axe-core` library is dynamically injected into the browser context via `page.addScriptTag`. This makes the `axe.run()` function available for execution.
3.  **Analysis Execution:** The `axe.run()` function is called within the browser context (`page.evaluate`). This function scans the Document Object Model (DOM) for accessibility violations based on WCAG standards.
4.  **Result Collection:** The results from `axe.run()`, including violations, passes, and other metrics, are returned to the server-side Node.js environment.
5.  **API Endpoints:**
    *   **`/api/analyseURL` (POST):** Accepts a JSON payload with a `url` field. It navigates to the provided URL, injects `axe-core`, runs the analysis, and returns the results.
    *   **`/api/analysehtml` (POST):** Accepts a JSON payload with an `html` field. It sets the page content to the provided HTML, injects `axe-core`, runs the analysis, and returns the results.

### Puppeteer Configuration & Gotchas

*   **`headless: true`**: Ensures the browser runs without a visible UI, suitable for server-side operations.
*   **`args: ['--no-sandbox']`**: Essential for running Puppeteer in environments like Docker containers where a sandbox environment might not be available or might cause issues.
*   **`executablePath`**: Allows specifying a custom path to the browser executable, useful in specific deployment scenarios.
*   **`timeout` and `protocolTimeout`**: These are critical for preventing the analysis process from hanging indefinitely. A 60-second timeout is configured for both, ensuring that long-running or unresponsive pages do not block the server.

```javascript
// Example from src/app/api/analyseURL/route.jsx
const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox'],
    executablePath: process.env.PUPPETEER_EXECUTABLE_PATH,
    timeout: 60000, // 60 seconds
    protocolTimeout: 60000 // 60 seconds
});
```

## User Interface (UI)

The frontend is built using Next.js and styled with Tailwind CSS.

*   **`src/app/page.js`**: The main page renders the `Navbar` and `Body` components.
*   **`src/app/component/body.jsx`**: This component manages the core UI, featuring:
    *   A prominent heading and subtitle.
    *   Feature badges highlighting key aspects of the tool.
    *   A tabbed interface allowing users to switch between "Analyse HTML" and "Analyse URL".
    *   `Textbox.jsx` and `Urlbox.jsx` components are conditionally rendered based on the active tab.
*   **`src/app/component/html.jsx` & `src/app/component/url.jsx`**: These components provide input fields for HTML content or URLs, respectively. They handle user input, trigger API calls, and display the analysis results.
    *   Results are presented in a structured format, including an overall score, a breakdown of violations by impact level (critical, serious, moderate, minor), and detailed information for each violation (ID, description, help URL, and affected HTML nodes).
    *   A progress bar visually represents the accessibility score.
*   **`src/app/component/navbar.jsx`**: Provides site navigation and handles user authentication status, linking to login/registration pages when not authenticated.
*   **`src/app/component/about.jsx`**: Contains descriptive content about the project's mission and the importance of web accessibility.

## Authentication & Data Persistence

*   **Supabase**: The application integrates with Supabase for user authentication and data storage.
    *   `src/lib/supabase.js` initializes the Supabase client.
    *   `src/app/login/page.jsx` and `src/app/register/page.jsx` handle user sign-in and sign-up processes.
    *   `src/lib/database.js` provides functions (`saveViolation`, `getUserViolations`) to interact with a `violations` table in Supabase, storing analysis results associated with user IDs.

## CI/CD Pipeline

The `jenkinsfile` defines a CI/CD pipeline that automates the build, test, and deployment process:

1.  **Checkout:** Clones the repository.
2.  **Lint Code:** Runs `npm run lint` within the `docker` directory to check code quality.
3.  **Build Docker Image:** Creates a Docker image tagged with the build number and `latest`.
4.  **Push to DockerHub:** Pushes the built Docker image to a specified DockerHub repository, handling potential retries for the `latest` tag.
5.  **Deploy to EC2:** Connects to an EC2 instance via SSH, pulls the latest code, rebuilds and restarts the Docker containers using `docker compose`.

## Best Practices & Usage Patterns

*   **Input Validation:** Always validate user input, especially URLs and HTML content, to prevent errors and security vulnerabilities. The API routes perform basic URL format validation.
*   **Error Handling:** Implement robust error handling for API requests and browser automation to provide informative feedback to the user and log issues effectively.
*   **Asynchronous Operations:** Utilize `async/await` for all I/O operations, such as API calls and file system access, to maintain application responsiveness.
*   **Component Reusability:** Leverage UI components from `src/components/ui` for consistent styling and functionality.
*   **Environment Variables:** Use environment variables (e.g., `NEXT_PUBLIC_SUPABASE_URL`, `PUPPETEER_EXECUTABLE_PATH`) for configuration settings that vary between environments.

## Common Pitfalls

*   **Puppeteer Sandbox Issues:** Ensure the `--no-sandbox` argument is used when running Puppeteer in containerized environments.
*   **Timeouts:** Configure appropriate timeouts for Puppeteer operations to prevent deadlocks.
*   **CORS:** Be mindful of Cross-Origin Resource Sharing (CORS) policies if the frontend and backend are served from different domains. Next.js API routes generally handle this implicitly for same-origin requests.
*   **Supabase Key Exposure:** Ensure Supabase keys are stored securely as environment variables and that public keys are prefixed with `NEXT_PUBLIC_` for client-side access.
 -->



I have created nginx file , docker file and docker compose file metrics for monitoring
and jenkins file for CI/CD and githubactions/deploy.yml file also for CI/CD
database.js and supabase.js for database linking. 
hooks for It listens for real-time authentication changes (login, logout, sign in, sign out) and updates the user and loading states automatically.
It provides a signOut function to log out the current user.
When you use this hook, you can instantly know if a user is logged in and access their data, show loading spinners, or let users log out—all in a reusable, clean way.
