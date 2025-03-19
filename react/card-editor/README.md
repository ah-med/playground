# Interactive Card Customizer

A React application that demonstrates key React concepts through an interactive card customization interface.

## Core React Concepts Demonstrated

### 1. Component-Based Architecture

The application is built using a component-based structure:

- `App.jsx`: The root component that manages the application state
- `Card.jsx`: A presentational component that displays the customized card
- `CardForm.jsx`: A form component that handles user input

**Learning Resources:**

- [React Components and Props (Official Docs)](https://react.dev/learn/your-first-component)
- [Thinking in React (Official Guide)](https://react.dev/learn/thinking-in-react)
- [Component Composition vs Inheritance](https://react.dev/learn/passing-props-to-a-component)

### 2. State Management

- **useState Hook**: Used in `App.jsx` to manage the card's properties (title, subtext, colors, image)
- **Lifting State Up**: The state is maintained in the parent `App` component and passed down to child components
- **Single Source of Truth**: All card properties are managed in one place, ensuring consistency

**Learning Resources:**

- [Managing State (Official Docs)](https://react.dev/learn/managing-state)
- [useState Hook Guide](https://react.dev/reference/react/useState)
- [Lifting State Up Tutorial](https://react.dev/learn/sharing-state-between-components)

### 3. Props and PropTypes

- **Props**: Used to pass data and callbacks between components
- **PropTypes**: Type checking implemented for all components to ensure proper data types
- **Default Props**: Fallback values defined for optional properties

**Learning Resources:**

- [Props in React (Official Docs)](https://react.dev/learn/passing-props-to-a-component)
- [PropTypes Documentation](https://www.npmjs.com/package/prop-types)
- [TypeScript with React](https://react.dev/learn/typescript) (Alternative to PropTypes)

### 4. Event Handling

- Form input changes handled through controlled components
- Image upload processing with URL.createObjectURL
- Reset functionality through callback props

**Learning Resources:**

- [Responding to Events](https://react.dev/learn/responding-to-events)
- [Event Handling in React](https://react.dev/learn/adding-interactivity)
- [Working with Files in React](https://react.dev/reference/react-dom/components/input#handling-files)

### 5. Conditional Rendering

- Attribution text is conditionally rendered based on whether a custom image is uploaded
- Dynamic styling based on user input (background color, text color)

**Learning Resources:**

- [Conditional Rendering Guide](https://react.dev/learn/conditional-rendering)
- [Rendering Lists](https://react.dev/learn/rendering-lists)
- [Writing Markup with JSX](https://react.dev/learn/writing-markup-with-jsx)

### 6. Controlled Components

All form inputs are controlled components, meaning:

- Their values are controlled by React state
- Changes are handled through onChange events
- The UI always reflects the current application state

**Learning Resources:**

- [Forms in React](https://react.dev/reference/react-dom/components#form-components)
- [Controlled vs Uncontrolled Components](https://react.dev/learn/sharing-state-between-components)
- [React Forms Guide](https://react.dev/learn/adding-interactivity)

### 7. Component Communication

- Parent-to-Child: Through props
- Child-to-Parent: Through callback functions

**Learning Resources:**

- [Component Communication Patterns](https://react.dev/learn/passing-data-deeply-with-context)
- [Props vs State](https://react.dev/learn/choosing-the-state-structure)
- [Component Design Principles](https://react.dev/learn/thinking-in-react)

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

## Project Structure

```
src/
├── components/
│   ├── Card.jsx       # Card display component
│   └── CardForm.jsx   # Form for card customization
├── App.jsx            # Main application component
└── main.jsx          # Application entry point
```

## Technologies Used

- React 19
- Vite
- TailwindCSS
- PropTypes for type checking
