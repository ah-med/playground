# Playwright Todo App

A simple React todo application with authentication and CRUD functionality, featuring end-to-end testing with Playwright.

## Features (Planned)

- User authentication (signup/login/logout)
- CRUD operations for todos
- Single page application
- End-to-end testing with Playwright

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm

### Installation

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npm start
   ```

3. Run Playwright tests:

   ```bash
   npx playwright test
   ```

4. Open Playwright report:
   ```bash
   npx playwright show-report
   ```

## Project Structure

```
playwright-todo-app/
├── src/                    # React application source
├── tests/                  # Playwright e2e tests
├── playwright.config.ts    # Playwright configuration
└── package.json
```

## Testing

The project includes Playwright for end-to-end testing. Tests are located in the `tests/` directory.

### Running Tests

- Run all tests: `npx playwright test`
- Run tests in headed mode: `npx playwright test --headed`
- Run tests in debug mode: `npx playwright test --debug`
- Show test report: `npx playwright show-report`

### Test Structure

- `tests/basic.spec.ts` - Basic app functionality tests
- More test files will be added as features are implemented

## Development

This is a work in progress. The following features will be implemented:

1. **Authentication System**

   - User registration
   - User login/logout
   - Protected routes

2. **Todo Management**

   - Create new todos
   - Read/display todos
   - Update todo status
   - Delete todos

3. **UI Components**

   - Login/Register forms
   - Todo list component
   - Todo form component
   - Navigation

4. **Testing**
   - Authentication flow tests
   - CRUD operation tests
   - UI interaction tests
