const canvas = document.getElementById('board');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let drawing = false;
const socket = io();

canvas.addEventListener('mousedown', () => drawing = true);
canvas.addEventListener('mouseup', () => drawing = false);
canvas.addEventListener('mousemove', draw);

function draw(e) {
  if (!drawing) return;
  const x = e.clientX;
  const y = e.clientY;
  ctx.fillRect(x, y, 2, 2);
  socket.emit('drawing', { x, y });
}

socket.on('drawing', (data) => {
  ctx.fillRect(data.x, data.y, 2, 2);
});

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  socket.emit('clearBoard');
}

socket.on('clearBoard', () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});
