# Exercise 2: Canvas Responsiveness

## Objective

Create a responsive canvas that adapts to window size and handles high DPI displays.

## Requirements

1. Create a canvas that fills the window
2. Handle window resize events
3. Support high DPI (Retina) displays
4. Draw a pattern that scales with the canvas size:
   - A grid of circles
   - Spacing should be relative to canvas size
   - Colors should alternate in a checkerboard pattern
5. Add a performance monitor (FPS counter)

## Starter Code

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Canvas Exercise 2</title>
    <style>
      body {
        margin: 0;
        overflow: hidden;
      }
      /* Add additional styles here */
    </style>
  </head>
  <body>
    <!-- Add your canvas here -->
    <script>
      // Add your JavaScript here
    </script>
  </body>
</html>
```

## Tips

- Use `window.devicePixelRatio` for DPI handling
- Throttle resize events for better performance
- Clear canvas before redrawing
- Use `requestAnimationFrame` for smooth rendering
