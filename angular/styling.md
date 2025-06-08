# Styling in Angular

## Basic Component Styling

Angular components can include CSS styles in two ways:

1. **Inline Styles**:

```typescript
@Component({
  selector: "profile-photo",
  template: `<img src="profile-photo.jpg" alt="Your profile photo" />`,
  styles: `
    img {
      border-radius: 50%;
    }
  `,
})
export class ProfilePhoto {}
```

2. **External Style Files**:

```typescript
@Component({
  selector: "profile-photo",
  templateUrl: "profile-photo.html",
  styleUrl: "profile-photo.css",
})
export class ProfilePhoto {}
```

## View Encapsulation

Angular provides three view encapsulation modes that determine how styles are scoped:

### 1. Emulated (Default)

```typescript
@Component({
  encapsulation: ViewEncapsulation.Emulated,
  // ...
})
export class MyComponent {}
```

**Characteristics:**

- Styles only apply to elements in the component's template
- Angular generates unique attributes for style scoping
- Prevents style leakage to other components
- Supports `:host` and `:host-context()` pseudo-classes
- Global styles can still affect component elements

### 2. ShadowDom

```typescript
@Component({
  encapsulation: ViewEncapsulation.ShadowDom,
  // ...
})
export class MyComponent {}
```

**Characteristics:**

- Uses Web Standard Shadow DOM API
- Strict style isolation
- Global styles cannot affect shadow tree elements
- Affects event propagation and slot API
- Impacts browser developer tools

### 3. None

```typescript
@Component({
  encapsulation: ViewEncapsulation.None,
  // ...
})
export class MyComponent {}
```

**Characteristics:**

- Disables style encapsulation
- Styles behave as global styles
- Useful for creating shared styles

## Special Selectors

### :host

```css
:host {
  display: block;
  border: 1px solid black;
}
```

- Targets the component's host element
- Useful for styling the component's container

### :host-context()

```css
:host-context(.dark-theme) {
  background-color: black;
  color: white;
}
```

- Matches the component's host element based on parent context
- Useful for theme-based styling

## Style Integration

### External Style Files

```html
<link rel="stylesheet" href="styles.css" />
```

- Can be referenced in component templates
- Not affected by emulated view encapsulation

### CSS Preprocessors

Angular supports:

- Sass
- Less
- Stylus

Example with Sass:

```typescript
@Component({
  selector: "app-component",
  styleUrl: "app.component.scss",
})
export class AppComponent {}
```

## Best Practices

1. **Component-Specific Styles**

   - Keep styles close to their components
   - Use component-specific class names
   - Avoid global styles when possible

2. **Style Organization**

   - Use external files for complex styles
   - Group related styles together
   - Follow a consistent naming convention

3. **Performance**

   - Minimize use of `::ng-deep`
   - Be cautious with global styles
   - Consider using CSS custom properties for theming

4. **Maintainability**
   - Use meaningful class names
   - Document complex style rules
   - Keep styles modular and reusable

## Important Notes

- Styles are bundled with component JavaScript
- Styles participate in the JavaScript module system
- Lazy-loaded components include their styles automatically
- Style specificity should be considered when using multiple encapsulation modes
- Avoid using `::ng-deep` in new code (deprecated)
