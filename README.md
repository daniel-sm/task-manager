# Task Manager

Task Manager is a simple application built with Node.js, Express, and TypeScript. It provides APIs for user authentication, task management, and user management. The project uses Prisma as the ORM and Zod for input validation.

## Features
- **Authentication**: User registration and login with JWT-based authentication.
- **Task Management**: Create, read, update, and delete tasks.
- **User Management**: Manage user details, including updating names and passwords.
- **Validation**: Input validation using Zod schemas.
- **Database**: SQLite database with Prisma ORM.

## Prerequisites
- Node.js (v18 or higher)
- pnpm (v10 or higher)

## Getting Started

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/task-manager.git
    cd task-manager
    ```

2. Install dependencies:
    ```bash
    pnpm install
    ```

3. Set up the environment variables:
    - Copy `.env.example` to `.env` and update the values as needed.

4. Run database migrations:
    ```
    pnpm prisma migrate dev
    ```

5. Start the development server:
    ```
    pnpm run dev
    ```

> The server will run at http://localhost:3000.

## API Endpoints

### Authentication
- POST `/api/auth/register`: Register a new user.
- POST `/api/auth/login`: Login and receive a JWT token.

### Tasks
- POST `/api/tasks/create`: Create a new task.
- GET `/api/tasks/read`: Get all tasks for the authenticated user.
- PUT `/api/tasks/update/:taskId`: Update a task.
- DELETE `/api/tasks/delete/:taskId`: Delete a task.

### Users
- GET `/api/users/read`: Get all users.
- GET `/api/users/read/:userId`: Get a user by ID.
- PUT `/api/users/update/:userId`: Update a user's name.
- PUT `/api/users/update/password/:userId`: Update a user's password.
- DELETE `/api/users/delete/:userId`: Delete a user.

## Environment Variables
The following environment variables are required:
| Variable     | Description               | Default Value | 
| ------------ | ------------------------- | ------------- |
| `PORT`         | Server port               | 3000          |
| `SECRET_KEY`   | JWT secret key            | -             |
| `DATABASE_URL` | SQLite database file path | file:./dev.db |

## Tools and Libraries
- **Express**: Web framework for Node.js.
- **Prisma**: ORM for database management.
- **Zod**: Schema-based validation.
- **Argon2**: Password hashing.
- **JSON Web Token (JWT)**: Authentication.

## Development
- **Code Formatting**: The project uses Biome for formatting and linting. Code is automatically formatted on save in VS Code.
- **Database Management**: Prisma is used for migrations and database access.
