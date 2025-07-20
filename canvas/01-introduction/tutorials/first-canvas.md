# Creating Your First Canvas

## Basic Setup

```html
<!DOCTYPE html>
<html>
  <head>
    <title>First Canvas</title>
    <style>
      canvas {
        border: 1px solid black;
      }
    </style>
  </head>
  <body>
    <canvas id="myCanvas" width="500" height="300">
      Your browser does not support canvas.
    </canvas>
    <script src="script.js"></script>
  </body>
</html>
```

```javascript
// script.js
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

// Draw a simple rectangle
ctx.fillStyle = "blue";
ctx.fillRect(50, 50, 100, 80);

// Draw a line
ctx.beginPath();
ctx.moveTo(200, 50);
ctx.lineTo(300, 150);
ctx.strokeStyle = "red";
ctx.stroke();
```
