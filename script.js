const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

// canvas.width = window.innerWidth;
// canvas.height = window.innerHeight;

canvas.width = document.documentElement.clientWidth;
canvas.height = document.documentElement.clientHeight;

ctx.strokeStyle = "#BADA55";
ctx.lineJoin = "round";
ctx.lineCap = "round";
ctx.lineWidth = 150;

let isDrawing = false;
let lastX = 0;
let lastY = 0;
let hue = 250;
let direction = true;

function draw(e) {
  if (!isDrawing) return;
  ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
  [lastX, lastY] = [e.offsetX, e.offsetY];

  hue++;
  if (hue >= 360) {
    hue = 0;
  }
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", stopDrawing);
canvas.addEventListener("mouseout", stopDrawing);

canvas.addEventListener("touchstart", startDrawing);
canvas.addEventListener("touchmove", draw);
canvas.addEventListener("touchend", stopDrawing);
canvas.addEventListener("touchcancel", stopDrawing);

function startDrawing(e) {
  isDrawing = true;
  const pos = getMousePosition(e);
  [lastX, lastY] = [pos.x, pos.y];
}

function draw(e) {
  if (!isDrawing) return;
  const pos = getMousePosition(e);
  ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(pos.x, pos.y);
  ctx.stroke();
  [lastX, lastY] = [pos.x, pos.y];
  hue = (hue + 1) % 360;
}

function stopDrawing() {
  isDrawing = false;
  clearCanvas();
}

function getMousePosition(e) {
  if (e.touches) {
    // Touch events
    const touch = e.touches[0];
    return {
      x: touch.clientX - canvas.offsetLeft,
      y: touch.clientY - canvas.offsetTop,
    };
  } else {
    // Mouse events
    return {
      x: e.offsetX,
      y: e.offsetY,
    };
  }
}
