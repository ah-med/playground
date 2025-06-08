# Supported selector types and examples

Angular supports three main types of component selectors:

## 1. Element Selectors

The most common type of selector that matches elements based on their HTML tag name.

```typescript
@Component({
  selector: "app-profile",
  // ...
})
export class ProfileComponent {}
```

Usage in template:

```html
<app-profile></app-profile>
```

**Best Use Cases for Element Selectors:**

- Creating standalone, self-contained components
- Building reusable UI components (buttons, cards, modals)
- When you want to create a new semantic element in your application
- Components that represent a complete piece of functionality
- When you want to maintain a clear component hierarchy
- Creating custom elements that follow web components standards

## 2. Attribute Selectors

Matches elements based on the presence of an HTML attribute and optionally its value.

```typescript
@Component({
  selector: "[appHighlight]",
  // ...
})
export class HighlightDirective {}

// With specific value
@Component({
  selector: "[type='submit']",
  // ...
})
export class SubmitButtonComponent {}
```

Usage in template:

```html
<div appHighlight>This will be highlighted</div>
<button type="submit">Submit</button>
```

**Best Use Cases for Attribute Selectors:**

- Creating directives that modify behavior of existing elements
- Adding functionality to native HTML elements
- When you need to apply behavior to multiple different element types
- Creating validation directives
- Building accessibility enhancements
- When you want to extend existing elements without creating new ones
- Creating structural directives (like *ngIf, *ngFor)

## 3. Class Selectors

Matches elements based on the presence of a CSS class.

```typescript
@Component({
  selector: ".app-button",
  // ...
})
export class ButtonComponent {}
```

Usage in template:

```html
<button class="app-button">Click me</button>
```

**Best Use Cases for Class Selectors:**

- When you need to maintain compatibility with existing CSS classes
- Creating components that should work with existing styling systems
- When you want to apply components to elements that already have specific classes
- Building theme-specific components
- Creating components that need to work with third-party CSS frameworks
- When you want to maintain consistency with existing design systems

## Combining Selectors

You can combine multiple selectors using a comma-separated list:

```typescript
@Component({
  selector: "app-button, .app-button, [app-button]",
  // ...
})
export class ButtonComponent {}
```

**Best Use Cases for Combined Selectors:**

- When you need maximum flexibility in how a component can be used
- Creating components that need to work in multiple contexts
- Building components that need to be compatible with different styling approaches
- When you want to support both custom elements and class-based usage
- Creating components that need to work with both new and legacy code

## The :not Pseudo-class

Angular supports the :not pseudo-class to exclude certain elements:

```typescript
@Component({
  selector: "[appDropzone]:not(textarea)",
  // ...
})
export class DropzoneComponent {}
```

**Best Use Cases for :not Pseudo-class:**

- When you need to exclude specific elements from a directive
- Creating components that should work on most elements except certain types
- Building accessibility features that shouldn't apply to certain elements
- When you need to prevent conflicts with specific element types
- Creating components that need to work with a subset of elements

## Best Practices

1. **Prefix Convention**: Always use a prefix for your component selectors (e.g., 'app-' for application components)
2. **Element Selectors**: Preferred for most components
3. **Attribute Selectors**: Best for directives or when extending native elements
4. **Class Selectors**: Use when you need to apply the component to existing elements with specific classes

## Important Notes

- Selectors are case-sensitive
- An element can only match one component selector
- Angular matches selectors at compile-time
- Custom element names must include a hyphen
- Avoid using the 'ng-' prefix as it's reserved for Angular framework
