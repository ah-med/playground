// Select the canvas and set up the context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Set canvas size
canvas.width = 400;
canvas.height = 400;

// Grid size
const gridSize = 20;

// Snake and food initialization
let snake = [{ x: 200, y: 200 }];
let food = { x: 100, y: 100 };
let direction = { x: 0, y: 0 };
let gameOver = false;

// Draw the snake
function drawSnake() {
  ctx.fillStyle = 'lime';
  snake.forEach(segment => {
    ctx.fillRect(segment.x, segment.y, gridSize, gridSize);
  });
}

// Draw the food
function drawFood() {
  ctx.fillStyle = 'red';
  ctx.fillRect(food.x, food.y, gridSize, gridSize);
}

// Move the snake
function moveSnake() {
  const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

  if (direction.x === 0 && direction.y === 0) {
    return;
  }

  // Check for collisions
  if (
    head.x < 0 || head.y < 0 || 
    head.x >= canvas.width || head.y >= canvas.height || 
    snake.some(segment => segment.x === head.x && segment.y === head.y)
  ) {
    gameOver = true;
    return;
  }

  snake.unshift(head);

  // Check if the snake eats the food
  if (head.x === food.x && head.y === food.y) {
    placeFood();
  } else {
    snake.pop();
  }
}

// Place food at a random location
function placeFood() {
  food.x = Math.floor(Math.random() * (canvas.width / gridSize)) * gridSize;
  food.y = Math.floor(Math.random() * (canvas.height / gridSize)) * gridSize;

  // Ensure food doesn't spawn on the snake
  if (snake.some(segment => segment.x === food.x && segment.y === food.y)) {
    placeFood();
  }
}

// Handle keyboard input
document.addEventListener('keydown', event => {
  const { key } = event;
  if (key === 'ArrowUp' && direction.y === 0) direction = { x: 0, y: -gridSize };
  if (key === 'ArrowDown' && direction.y === 0) direction = { x: 0, y: gridSize };
  if (key === 'ArrowLeft' && direction.x === 0) direction = { x: -gridSize, y: 0 };
  if (key === 'ArrowRight' && direction.x === 0) direction = { x: gridSize, y: 0 };
});

// Game loop
function gameLoop() {
  if (gameOver) {
    alert('Game Over!');
    return;
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawSnake();
  drawFood();
  moveSnake();

  setTimeout(gameLoop, 100);
}

// Start the game
placeFood();
gameLoop();