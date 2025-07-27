# Todo App with Authentication

A modern React TypeScript todo application with authentication and comprehensive e2e testing using Playwright.

## 🚀 Purpose: Rapid Prototyping → Reliable Automation

This project demonstrates the **powerful workflow** of using **Playwright MCP** for rapid prototyping and debugging, then converting to **Playwright tests** for reliable CI/CD automation.

### **The Workflow**

1. **🔍 Rapid Prototyping with MCP Browser**

   - Use natural language commands to interact with your app in real-time
   - Take screenshots, check console logs, and debug instantly
   - Test user flows quickly without writing test code

2. **🔄 Convert to Playwright Tests**

   - Transform MCP interactions into reliable, maintainable test code
   - Create comprehensive test suites for CI/CD pipelines
   - Ensure consistent, automated testing

3. **⚡ CI/CD Automation**
   - Run tests in automated environments
   - Catch regressions early in development
   - Maintain high code quality

**📖 See [`PLAYWRIGHT_MCP_GUIDE.md`](./PLAYWRIGHT_MCP_GUIDE.md) for the complete workflow guide!**

## Features

### 🔐 Authentication System

- **Login/Signup**: Complete authentication flow with form validation
- **Session Persistence**: User sessions saved to localStorage
- **Protected Routes**: Automatic redirection based on authentication status
- **Demo Credentials**: Pre-configured test accounts for easy testing

### ✅ Todo Management

- **CRUD Operations**: Create, Read, Update, Delete todos
- **Real-time Updates**: Instant UI updates with optimistic rendering
- **Persistent Storage**: Todos saved per user in localStorage
- **Edit Inline**: Double-click to edit todos with keyboard shortcuts
- **Completion Toggle**: Check/uncheck todos with visual feedback

### 🎨 Modern UI/UX

- **Responsive Design**: Works on desktop, tablet, and mobile
- **Modern Styling**: Clean, gradient-based design with smooth animations
- **Loading States**: Proper loading indicators during async operations
- **Error Handling**: User-friendly error messages and validation
- **Accessibility**: Proper ARIA attributes and keyboard navigation

### 🧪 Comprehensive Testing

- **E2E Tests**: Full Playwright test suite covering all user flows
- **Authentication Tests**: Login, signup, logout, and session persistence
- **CRUD Tests**: Complete todo operations with edge cases
- **UI Tests**: Responsive design, accessibility, and keyboard navigation

## Tech Stack

- **Frontend**: React 18 with TypeScript
- **Testing**: Playwright for e2e testing
- **Styling**: CSS with modern design patterns
- **State Management**: React Context API
- **Storage**: localStorage for data persistence

## Project Structure

```
src/
├── components/          # React components
│   ├── AuthContainer.tsx
│   ├── Dashboard.tsx
│   ├── Header.tsx
│   ├── LoginForm.tsx
│   ├── SignupForm.tsx
│   ├── TodoForm.tsx
│   └── TodoList.tsx
├── contexts/           # React contexts
│   ├── AuthContext.tsx
│   └── TodoContext.tsx
├── types/              # TypeScript type definitions
│   └── index.ts
├── App.tsx             # Main app component
└── App.css             # Styles

tests/                  # Playwright e2e tests
├── auth.spec.ts        # Authentication tests
├── todo.spec.ts        # Todo CRUD tests
└── ui.spec.ts          # UI and accessibility tests
```

## Getting Started

### Prerequisites

- Node.js 16+
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd playwright-todo-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Demo Credentials

For testing purposes, the following demo accounts are available:

**Account 1:**

- Email: `john@example.com`
- Password: `password`

**Account 2:**

- Email: `jane@example.com`
- Password: `password`

## Testing

### Running E2E Tests

1. **Start the development server**

   ```bash
   npm start
   ```

2. **In a new terminal, run the tests**

   ```bash
   npm run test:e2e
   ```

3. **Run tests with UI**
   ```bash
   npm run test:e2e:ui
   ```

### 🚀 Rapid Prototyping with MCP Browser

For rapid prototyping and debugging, you can use the MCP (Model Context Protocol) browser integration. This allows you to:

- **Real-time Interaction**: Test your app in real-time using natural language commands
- **Quick Debugging**: Take screenshots, check console logs, and inspect elements instantly
- **Rapid Iteration**: Convert MCP interactions to reliable Playwright tests

See [`PLAYWRIGHT_MCP_GUIDE.md`](./PLAYWRIGHT_MCP_GUIDE.md) for a complete workflow guide on:

- Setting up MCP browser for rapid prototyping
- Converting MCP interactions to Playwright tests
- Best practices for the prototyping → automation workflow

### Test Coverage

The test suite covers:

#### Authentication Tests (`auth.spec.ts`)

- ✅ Login form display and validation
- ✅ Signup form display and validation
- ✅ Form switching (login ↔ signup)
- ✅ Successful login with valid credentials
- ✅ Error handling for invalid credentials
- ✅ Successful signup with new account
- ✅ Error handling for existing email
- ✅ Logout functionality
- ✅ Session persistence after page reload

#### Todo CRUD Tests (`todo.spec.ts`)

- ✅ Empty state display
- ✅ Adding new todos
- ✅ Preventing empty todo creation
- ✅ Adding multiple todos
- ✅ Toggling todo completion
- ✅ Deleting todos
- ✅ Editing todos (double-click)
- ✅ Keyboard shortcuts (Enter, Escape)
- ✅ Edit on blur functionality
- ✅ Preventing empty todo edits
- ✅ Todo persistence after reload
- ✅ Complex multi-operation scenarios

#### UI & Accessibility Tests (`ui.spec.ts`)

- ✅ Page title and heading structure
- ✅ Form labels and validation
- ✅ Button accessibility
- ✅ Input types and attributes
- ✅ Keyboard navigation
- ✅ Loading states
- ✅ Responsive design
- ✅ Focus management
- ✅ Error state handling
- ✅ ARIA attributes

## Usage Guide

### Authentication

1. **Login**: Use the demo credentials or create a new account
2. **Signup**: Fill in name, email, and password (minimum 6 characters)
3. **Logout**: Click the logout button in the header

### Todo Management

1. **Add Todo**: Type in the input field and press Enter or click "Add Todo"
2. **Complete Todo**: Click the checkbox next to a todo
3. **Edit Todo**: Double-click the todo text or click the "Edit" button
4. **Delete Todo**: Click the "Delete" button
5. **Keyboard Shortcuts**:
   - `Enter`: Save todo edit
   - `Escape`: Cancel todo edit

### Features

- **Real-time Updates**: All changes are immediately reflected in the UI
- **Persistent Storage**: Your todos are saved and persist between sessions
- **User Isolation**: Each user sees only their own todos
- **Responsive Design**: Works seamlessly on all device sizes

## Development

### Adding New Features

1. **Components**: Add new components in `src/components/`
2. **Contexts**: Add new contexts in `src/contexts/`
3. **Types**: Add new types in `src/types/index.ts`
4. **Tests**: Add corresponding tests in `tests/`

### Code Style

- **TypeScript**: Strict typing throughout
- **React Hooks**: Functional components with hooks
- **CSS**: Modern CSS with responsive design
- **Testing**: Comprehensive e2e tests with Playwright

## Deployment

The app can be deployed to any static hosting service:

1. **Build the app**

   ```bash
   npm run build
   ```

2. **Deploy the `build` folder** to your hosting service

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## License

This project is licensed under the MIT License.
