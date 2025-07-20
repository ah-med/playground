# Vue.js Version 2 Practice Projects 💚

This directory contains practice projects using vue.js version 2.

## Projects

### Card Editor

[Card Editor](./card-editor.html)

A dynamic card editor application that demonstrates core Vue.js concepts. It allows you to customize the card's background color, text color, title, description, and image.

The card is displayed in the main content area with real-time updates as you modify the properties. The customization form is displayed in a responsive sidebar that adapts to different screen sizes.

#### Features

- Live preview of card changes
- Image upload support
- Color picker for background and text
- Responsive layout (desktop, tablet, mobile)
- Reset functionality to restore defaults

#### Concepts Used

1. **Component State Synchronization**

   - Uses `.sync` modifier pattern instead of direct two-way binding for props
   - Emits `update:propName` events to explicitly communicate prop updates
   - [Documentation: .sync Modifier](https://v2.vuejs.org/v2/guide/components-custom-events.html#sync-Modifier)
   - Example from our code:
     ```html
     <card-form
       :description.sync="description"
       :image.sync="image"
       :title.sync="title"
       // ...
     ></card-form>
     ```
   - This pattern makes state updates more maintainable by making the data flow explicit

2. **Event Handling and Custom Events**

   - Uses `$emit` to send events from child to parent
   - Custom event naming follows kebab-case convention
   - Methods handle form input processing and emit appropriate events
   - Example from our code:
     ```javascript
     emitPropValue(value, prop) {
       this.$emit("update:" + prop, value);
     }
     ```
   - [Documentation: Custom Events](https://v2.vuejs.org/v2/guide/components-custom-events.html)

3. **Component System**

   - Custom components: `card` and `card-form`
   - Parent-child component communication using props
   - [Documentation: Components Basics](https://v2.vuejs.org/v2/guide/components.html)

4. **Props and Custom Events**

   - Props for passing data down to child components
   - Custom events with `.sync` modifier for two-way prop binding
   - [Documentation: Props](https://v2.vuejs.org/v2/guide/components-props.html)

5. **Computed Properties**

   - Used to determine image source type (blob vs URL)
   - [Documentation: Computed Properties](https://v2.vuejs.org/v2/guide/computed.html)

6. **Conditional Rendering**

   - `v-if`/`v-else` templates for dynamic image attribution
   - [Documentation: Conditional Rendering](https://v2.vuejs.org/v2/guide/conditional.html)

7. **Template Syntax**
   - Text interpolation using mustache syntax
   - Attribute binding using `v-bind` shorthand
   - [Documentation: Template Syntax](https://v2.vuejs.org/v2/guide/syntax.html)

#### Project Structure

- Single file application with inline components
- Styled using combination of custom CSS and Tailwind utility classes
- Vue.js loaded via CDN for simplicity

#### Getting Started

1. Open the `card-editor.html` file in a web browser
2. Use the form in the sidebar to customize the card
3. Upload your own image or use the default
4. Click "Reset" to restore default values
