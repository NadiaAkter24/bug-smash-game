const showNameBtn = document.getElementById('show-name-btn');
const nameEntryDiv = document.getElementById('name-entry');
const difficultySelect = document.getElementById('difficulty');
const startButton = document.getElementById('start-button');
const playerInput = document.getElementById('player-name');
const gameContainer = document.getElementById('game-container');
const startScreen = document.getElementById('start-screen');
const gameArea = document.getElementById('game-area');
const scoreDisplay = document.getElementById('score');
const playerDisplay = document.getElementById('player-display');
const backButton = document.getElementById('back-button');
const highScoreDisplay = document.getElementById('high-score-display');

const smashSound = new Audio('smash.wav');

let score = 0;
let bugInterval;
let gameTimer;
let timeLeft = 30;
let spawnInterval = 1000;
let bugLifetime = 2000;

showNameBtn.addEventListener('click', () => {
  showNameBtn.style.display = 'none';
  nameEntryDiv.style.display = 'block';
});

// Update high score display as user types their name
playerInput.addEventListener('input', () => {
  const name = playerInput.value.trim();
  if (name === '') {
    highScoreDisplay.textContent = '';
    return;
  }
  const scores = JSON.parse(localStorage.getItem("playerScores")) || {};
  const highScore = scores[name] || 0;
  highScoreDisplay.textContent = `High Score for ${name}: ${highScore}`;
});

startButton.addEventListener('click', startGame);

function startGame() {
  const playerName = playerInput.value.trim();
  if (playerName === '') {
    alert("Please enter your name to start the game!");
    return;
  }

  const difficulty = difficultySelect.value;
  switch (difficulty) {
    case 'easy':
      spawnInterval = 1500;
      bugLifetime = 3000;
      break;
    case 'intermediate':
      spawnInterval = 1000;
      bugLifetime = 1400;
      break;
    case 'hard':
      spawnInterval = 500;
      bugLifetime = 600;
      break;
  }

  playerDisplay.textContent = playerName;
  startScreen.style.display = 'none';
  gameContainer.style.display = 'block';

  resetGameState();
  runGame();
}

function resetGameState() {
  score = 0;
  timeLeft = 30;
  scoreDisplay.textContent = score;
  gameArea.innerHTML = '';

  const existingTimer = document.getElementById('timer');
  if (existingTimer) existingTimer.parentElement.remove();

  const timer = document.createElement('p');
  timer.innerHTML = `Time Left: <span id="timer">${timeLeft}</span> seconds`;
  gameContainer.insertBefore(timer, gameArea);
}

function runGame() {
  clearInterval(bugInterval);
  clearInterval(gameTimer);

  bugInterval = setInterval(createBug, spawnInterval);
  gameTimer = setInterval(updateTimer, 1000);
}

function updateTimer() {
  timeLeft--;
  document.getElementById('timer').textContent = timeLeft;

  if (timeLeft <= 0) {
    clearInterval(bugInterval);
    clearInterval(gameTimer);
    gameArea.innerHTML = '';
    showGameOver();
  }
}

function showGameOver() {
  const timerElem = document.getElementById('timer')?.parentElement;
  if (timerElem) timerElem.remove();

  const msgDiv = document.createElement('div');
  msgDiv.id = 'game-over-message';
  msgDiv.style.marginTop = '20px';

  const playerName = playerDisplay.textContent;
  msgDiv.innerHTML = `
    <h2>Game Over, ${playerName}!</h2>
    <p>Your score: ${score}</p>
    <button id="try-again-btn">Try Again</button>
  `;

  gameContainer.appendChild(msgDiv);
  storePlayerScore(playerName, score);

  document.getElementById('try-again-btn').addEventListener('click', () => {
    msgDiv.remove();
    resetGameState();
    runGame(); // ✅ DIRECTLY START GAME AGAIN
  });
}

function createBug() {
  const bug = document.createElement('div');
  bug.classList.add('bug');

  const size = Math.random() * 20 + 30;
  bug.style.width = `${size}px`;
  bug.style.height = `${size}px`;

  const x = Math.random() * (gameArea.clientWidth - size);
  const y = Math.random() * (gameArea.clientHeight - size);
  bug.style.left = `${x}px`;
  bug.style.top = `${y}px`;

  gameArea.appendChild(bug);

  const timeoutId = setTimeout(() => {
    if (bug.parentNode) bug.remove();
  }, bugLifetime);

  const smashHandler = () => {
    clearTimeout(timeoutId);
    smashSound.currentTime = 0;
    smashSound.play();
    score++;
    scoreDisplay.textContent = score;
    bug.remove();
  };

  bug.addEventListener('click', smashHandler);
  bug.addEventListener('touchstart', smashHandler);
}

// Store player scores by name
function storePlayerScore(name, score) {
  let scores = JSON.parse(localStorage.getItem("playerScores")) || {};
  scores[name] = Math.max(scores[name] || 0, score);
  localStorage.setItem("playerScores", JSON.stringify(scores));
  // No alert now
}

// Back button returns to start screen
backButton.addEventListener('click', () => {
  clearInterval(bugInterval);
  clearInterval(gameTimer);
  gameArea.innerHTML = '';

  const timerElem = document.getElementById('timer')?.parentElement;
  if (timerElem) timerElem.remove();

  const msg = document.getElementById('game-over-message');
  if (msg) msg.remove();

  goToStartScreen();
});

function goToStartScreen() {
  startScreen.style.display = 'block';
  gameContainer.style.display = 'none';
  playerInput.value = '';
  highScoreDisplay.textContent = '';
  showNameBtn.style.display = 'inline-block';
  nameEntryDiv.style.display = 'none';
}
