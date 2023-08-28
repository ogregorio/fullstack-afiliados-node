# Fullstack Afiliados

O objetivo desse teste é avaliar as suas habilidades em programação.

>  This is a challenge by [Coodesh](https://coodesh.com/)

<!-- TOC start -->

- [Results](#results)
- [Running](#running)
- [Infrastructure](#infrastructure)
- [Backend](#backend)
  * [Architecture](#architecture)
  * [Libraries](#libraries)
- [Frontend](#frontend)
  * [Structure](#structure)
  * [Libraries](#libraries-1)
- [Tests](#tests)
  * [Postman](#postman)

<!-- TOC end -->

# Results

NestJS is an ideal choice for projects requiring a modern, robust, and maintainable backend architecture in Node.js ecosystem. Its integration of TypeScript, a powerful and statically-typed language, ensures code reliability and enhanced developer productivity.

The framework's adoption of well-established architectural principles, including Dependency Injection and Decorators, encourages modular design and separation of concerns, leading to cleaner codebases. With its built-in support for asynchronous operations, real-time communication, and extensive libraries, NestJS empowers developers to tackle complex functionalities effortlessly.

The infrastructure is set up using Docker Compose, and the database in use is PostgresSQL. This relational database is fast and performant, offering numerous additional functions and native support for BSON and JSON objects. This feature proves to be highly advantageous in many cases.

Integration testing has been carried out utilizing Postman, which is the most suitable choice given the available time for constructing the application.

It's worth highlighting that the project details can be found in the [PROJECT.md](./PROJECT.md) file.

# Running

To run the application is very simple, just run the command:

```
docker-compose --env-file .env.example -f docker-compose.yml up
```

And the applications ran on the following URLs:

- Backend: [http://localhost:5001/api](http://localhost:5001/swagger)
- Frontend: [http://localhost:4173/login](http://localhost:4173/login)

At the frontend login, your username should be: SYSTEM_USERNAME and the password SYSTEM_PASSWORD added to the .env

# Infrastructure

Docker Compose is a tool that allows you to run applications composed of multiple Docker containers (like this project). It simplifies the process of orchestrating and managing these containers, allowing you to describe the configuration of all your application's services in a single YAML file.

To start an application using Docker Compose, follow these steps:

1. **Open the Terminal:**
   - Open the terminal in the directory where the `docker-compose.yml` file is located (at the root of the project).

2. **Execute the Command:**
   - Use the command `docker-compose up` to start all the containers defined in the file. Docker Compose will download the necessary images, configure the containers, and run them.

3. **Monitor the Log:**
   - The terminal will display the startup log of the containers. You'll be able to see the status and messages of each service.

4. **Access the Application:**
   - Once the application is fully started, you can access it through a web browser or other tools: front-end: http://localhost:4173/ and back-end: http://localhost:5001/swagger/

5. **Finish Execution:**
   - To stop the execution of the containers, press `Ctrl + C` in the terminal. If you wish to remove the containers after execution, use the `docker-compose down` command.


# Backend

## Architecture

The backend of this project is built using the NestJS framework, which follows a modular and organized architecture to facilitate development in Node.js. The codebase is structured into various modules, each catering to distinct responsibilities. The `@auth` module handles authentication and security concerns, leveraging libraries like `@nestjs/jwt`, `@nestjs/passport`, and `passport-jwt` to implement JWT-based authentication. The `@bootstrap` module contains initialization configurations, while `@configs` centralizes general application settings. The `@core` module serves as the application's nucleus, housing shared services and common business logic.

Database entities are defined within the `@entities` module utilizing TypeORM. The `@helpers` module houses auxiliary functions for various parts of the application. The `main.ts` file acts as the entry point, where the server is configured to listen to incoming HTTP requests.

To document the API, the `@nestjs/swagger` library is employed, generating interactive documentation from decorators within controller classes. TypeScript plays a pivotal role in this project, as reflected by the inclusion of multiple TypeScript-related dependencies, including the latest versions of TypeScript itself, such as `typescript`.

Furthermore, the application makes use of libraries such as `@nestjs/config` for managing configurations, `rxjs` for reactive programming, and `pg` as the PostgreSQL database driver. The module structure, emphasis on security with JWT authentication, and streamlined documentation using Swagger exemplify the project's organized and contemporary approach to backend development.

## Libraries

The project relies on a range of libraries to achieve its functionality. Some of the key libraries include:

1. **@nestjs/common:** Provides essential decorators and utilities for building NestJS applications.
2. **@nestjs/config:** Enables centralized configuration management.
3. **@nestjs/core:** The core module of NestJS responsible for application bootstrapping.
4. **@nestjs/jwt and @nestjs/passport:** Facilitate JWT-based authentication strategies.
5. **@nestjs/platform-express:** Bridges NestJS with the Express.js framework.
6. **@nestjs/swagger:** Enables automatic API documentation generation using decorators.
7. **@nestjs/typeorm and typeorm:** Facilitate integration with the TypeORM ORM and database tools.
8. **rxjs:** Library for reactive programming, enabling asynchronous operations.
9. **pg:** PostgreSQL database driver for interacting with the database.
10. **passport and passport-jwt:** Used for authentication and JWT verification.
11. **reflect-metadata:** Provides metadata reflection for TypeScript.
12. **typescript:** The programming language used for the project, providing static typing and modern features.

These libraries collectively contribute to the robustness, security, and maintainability of the backend architecture, empowering scalable and a feature-rich application.

# Frontend

## Structure

This structure follows the concepts of Atomic Design, enabling modularity, reusability, and efficient code maintenance. It's an organized way to develop scalable user interfaces:

1. **App.tsx:** Main entry file of application, where you likely set up routing and the overall structure.

2. **assets:** Folder to store static assets, such as images.

3. **components:** Central folder for reusable components, organized into four subfolders:
   - **atoms:** Simple and indivisible components like buttons and input fields.
   - **molecules:** More complex components composed of atoms, such as an input field with a label.
   - **organisms:** Even more complex components that can contain multiple molecules and atoms, like a complete form.
   - **templates:** Templates group organisms together to form pages.

4. **core:** Folder containing the core logic of the application:
   - **constants:** Constants used throughout the application.
   - **contexts:** React contexts for managing global state.
   - **hooks:** Custom hooks for reusing logic.
   - **services:** Logic related to external services, such as API calls.
   - **utils:** Helper functions used across various parts of the application.

5. **langs:** Folder for internationalization (i18n), containing translation files.

6. **pages:** Organization of main pages, like "dashboard" and "login".

7. **theme:** Files related to the visual theme of the application.

8. **types:** Custom type definitions, including React-related types, internationalization types, and user types.

9. **vite-env.d.ts:** Environment declaration file for Vite.


## Libraries

Here's a brief overview of the chosen libraries and their relevance in the project:

**Dependencies:**

1. **@emotion/react** and **@emotion/styled**: The project employs the Emotion library, a CSS-in-JS solution that facilitates writing expressive styles within React components.

2. **@mui/icons-material** and **@mui/material**: Material-UI (MUI) is utilized as a comprehensive component library adhering to Google's Material Design principles. It provides predefined components and styling for a consistent and visually appealing user interface.

4. **axios**: The project makes use of the axios library, which employs promises to create HTTP clients for making network requests, commonly employed for interactions with APIs.

5. **i18next** and **react-i18next**: These libraries are harnessed for internationalization support, streamlining the management of translations and facilitating language switching within the application.

7. **react-router-dom**: Facilitating navigation and routing within the React application.

8. **jest**: Jest enhances the testing capabilities of the project. It provides a robust testing framework that simplifies writing unit tests, integration tests, and more.

**DevDependencies:**

1. **@typescript-eslint/eslint-plugin** and **@typescript-eslint/parser**: The project integrates TypeScript into the ESLint environment through these packages, augmenting code quality and consistency through type-checking.

2. **@vitejs/plugin-react**: The integration of React with Vite's rapid development server is achieved using the @vitejs/plugin-react package.

3. **eslint** and **eslint-plugin-react**: For code linting, ESLint is employed, and the eslint-plugin-react package enhances it with rules specific to React development.

4. **typescript**: TypeScript, a typed superset of JavaScript, is embraced within the project to heighten code quality and improve the development experience.

5. **vite**: Vite, serving as a rapid and minimalist build tool and development server, contributes to modern web development practices in the project, particularly beneficial for React applications.

6. **@testing-library/react** and **@testing-library/jest-dom**: These libraries, along with **@testing-library/user-event**, empower the project with user-centric testing approaches. They enable testing React components in a way that simulates user interactions and behavior.

# Tests

## Postman

Postman is a widely used tool by developers and testing teams for testing APIs (Application Programming Interfaces). It provides a user-friendly graphical interface that allows you to create, send, and test HTTP requests to APIs, as well as enable test automation, including integration testing.

Integration tests are a crucial part of software development as they ensure that different components or systems interact correctly with each other. When it comes to APIs, integration tests help verify if the API endpoints are responding as expected, if data is being handled correctly, and if communication between your application and the API is functioning smoothly.

You can access the tests using Postman at the following link:

https://www.postman.com/arthurgregorioleal/workspace/testes-afiliados/overview
