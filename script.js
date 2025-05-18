const game = document.getElementById('game');
const player = document.getElementById('player');
const scoreDisplay = document.getElementById('score');
const startScreen = document.getElementById('start-screen');
const startButton = document.getElementById('start-button');
const carChoices = document.querySelectorAll('.car-choice');

const gameWidth = 400;
const laneWidth = 100;
let playerX = 150;
let enemies = [];
let score = 0;
let gameRunning = false;
let selectedColor = "limegreen";

carChoices.forEach(choice => {
  choice.addEventListener('click', () => {
    carChoices.forEach(c => c.classList.remove('selected'));
    choice.classList.add('selected');
    selectedColor = choice.dataset.color;
  });
});

// Start game
startButton.addEventListener('click', () => {
  if (!selectedColor) return alert("Select a car first!");

  startScreen.classList.add('hidden');
  game.classList.remove('hidden');

  player.style.background = selectedColor;
  player.style.left = playerX + 'px';
  gameRunning = true;
  updateGame();
});

document.addEventListener('keydown', e => {
  if (!gameRunning) return;

  if (e.key === 'ArrowLeft') {
    if (playerX > 0) {
      playerX -= laneWidth;
    } else {
      endGame("You crashed into the wall!");
    }
  }

  if (e.key === 'ArrowRight') {
    if (playerX < gameWidth - laneWidth) {
      playerX += laneWidth;
    } else {
      endGame("You crashed into the wall!");
    }
  }

  player.style.left = playerX + 'px';
});

function createEnemy() {
  const enemy = document.createElement('div');
  enemy.classList.add('enemy');
  const lane = Math.floor(Math.random() * 4);
  enemy.style.left = lane * laneWidth + 'px';
  enemy.style.top = '-100px';
  game.appendChild(enemy);
  enemies.push(enemy);
}

function updateGame() {
  if (!gameRunning) return;
  score++;
  scoreDisplay.textContent = 'Score: ' + score;

  enemies.forEach(enemy => {
    const top = parseInt(enemy.style.top) || 0;
    enemy.style.top = top + 5 + 'px';

    const enemyX = parseInt(enemy.style.left);
    const enemyY = parseInt(enemy.style.top);
    const playerY = 500;

    if (
      enemyX === playerX &&
      enemyY + 100 > playerY &&
      enemyY < playerY + 100
    ) {
      endGame("You crashed into an enemy!");
    }

    if (enemyY > 600) {
      game.removeChild(enemy);
    }
  });

  enemies = enemies.filter(e => parseInt(e.style.top) <= 600);

  if (Math.random() < 0.03) {
    createEnemy();
  }

  requestAnimationFrame(updateGame);
}

function endGame(message) {
  gameRunning = false;
  alert(`${message}\nYour Score: ${score}`);
  location.reload(); // reload to reset game
}
document.addEventListener('keydown', e => {
  if (!gameRunning) return;

  if (e.key === 'ArrowLeft') {
    if (playerX > 0) {
      playerX -= laneWidth;
    } else {
      endGame("You crashed into the left border!");
    }
  }
  if (e.key === 'ArrowRight') {
    if (playerX < game.clientWidth - laneWidth - 10) { // 10 = right border
      playerX += laneWidth;
    } else {
      endGame("You crashed into the right border!");
    }
  }

  player.style.left = playerX + 'px';
});

