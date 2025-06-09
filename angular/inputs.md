# Angular Inputs

## Basic Input Declaration

### Signal-based Inputs (Recommended)

```typescript
import { Component, input } from "@angular/core";

@Component({
  selector: "custom-slider",
  template: `...`,
})
export class CustomSlider {
  // Basic input with default value
  value = input(0);

  // Required input
  label = input.required<string>();

  // Input with type declaration
  maxValue = input<number>();
}
```

### Decorator-based Inputs (Legacy)

```typescript
import { Component, Input } from "@angular/core";

@Component({
  selector: "custom-slider",
  template: `...`,
})
export class CustomSlider {
  @Input() value = 0;
  @Input({ required: true }) label: string;
}
```

## Key Characteristics

1. **Static Compilation**

   - Inputs are recorded at compile-time
   - Cannot be added or removed at runtime
   - Must be declared in component/directive property initializers

2. **Inheritance**

   - Inputs are inherited by child classes
   - Can be redeclared in child components
   - Maintains type safety across inheritance

3. **Case Sensitivity**

   - Input names are case-sensitive
   - `[value]` and `[Value]` are different inputs

4. **Read-only Signals**
   - Signal-based inputs are read-only
   - Values can only be changed through template bindings

## Required Inputs

### Signal-based

```typescript
@Component({...})
export class CustomSlider {
  // Required input with type
  value = input.required<number>();
}
```

### Decorator-based

```typescript
@Component({...})
export class CustomSlider {
  @Input({ required: true }) value: number;
}
```

**Key Points:**

- Must be set when component is used
- Build-time error if not provided
- No automatic `undefined` in type
- Enforces component contract

## Input Transforms

### Signal-based

```typescript
@Component({...})
export class CustomSlider {
  label = input('', {
    transform: (value: string | undefined) => value?.trim() ?? ''
  });
}
```

### Decorator-based

```typescript
@Component({...})
export class CustomSlider {
  @Input({ transform: (value: string | undefined) => value?.trim() ?? '' })
  label = '';
}
```

**Key Requirements:**

- Must be statically analyzable
- Cannot be set conditionally
- Must be pure functions
- No external state dependencies
- Parameter type determines allowed template values

## Input Aliases

### Signal-based

```typescript
@Component({...})
export class CustomSlider {
  value = input(0, { alias: 'sliderValue' });
}
```

### Decorator-based

```typescript
@Component({...})
export class CustomSlider {
  @Input({ alias: 'sliderValue' }) value = 0;
}
```

**Usage:**

```html
<custom-slider [sliderValue]="50" />
```

**Best Practices:**

- Avoid aliasing unless necessary
- Useful for:
  - Preserving original property names
  - Avoiding DOM property collisions
  - Maintaining backward compatibility

## Model Inputs (Two-way Binding)

```typescript
@Component({...})
export class CustomSlider {
  // Model input with default value
  value = model(0);

  increment() {
    // Update propagates to parent
    this.value.update(oldValue => oldValue + 10);
  }
}
```

**Usage:**

```html
<custom-slider [(value)]="volume" />
```

**When to Use:**

- Custom form controls
- Components that modify values
- Two-way data binding scenarios
- User interaction-based value changes

## Best Practices

1. **Naming Conventions**

   - Avoid DOM property collisions
   - No need for input prefixes
   - Use clear, descriptive names
   - Follow Angular naming conventions

2. **Type Safety**

   - Always specify types
   - Use required inputs when appropriate
   - Leverage TypeScript's type system

3. **Performance**

   - Keep transforms simple
   - Avoid complex getters/setters
   - Use pure functions for transforms

4. **Component Design**
   - Use signal-based inputs for new code
   - Consider using model inputs for form controls
   - Keep inputs focused and purposeful

## Important Notes

- Signal-based inputs are recommended for new projects
- Decorator-based inputs remain fully supported
- Inputs are part of the component's public API
- Consider input requirements in component design
- Document input behavior and requirements
