const GAME_TIME = 30;

const startButton = document.getElementById("startButton");
const gameArea = document.getElementById("gameArea");
const target = document.getElementById("target");
const result = document.getElementById("result");

const scoreElement = document.getElementById("score");
const timeElement = document.getElementById("time");
const finalScoreElement = document.getElementById("finalScore");
const accuracyElement = document.getElementById("accuracy");
const highScoreElement = document.getElementById("highScore");

let score = 0;
let totalClicks = 0;
let hits = 0;
let timeLeft = GAME_TIME;
let timer = null;
let playing = false;

function loadHighScore() {
  highScoreElement.textContent = localStorage.getItem("aimTestHighScore") || "0";
}

function moveTarget() {
  const padding = 35;
  const x = padding + Math.random() * (gameArea.clientWidth - padding * 2);
  const y = padding + Math.random() * (gameArea.clientHeight - padding * 2);

  target.style.left = x + "px";
  target.style.top = y + "px";
}

function startGame() {
  clearInterval(timer);

  score = 0;
  totalClicks = 0;
  hits = 0;
  timeLeft = GAME_TIME;
  playing = true;

  scoreElement.textContent = score;
  timeElement.textContent = timeLeft;
  result.hidden = true;
  target.hidden = false;
  startButton.textContent = "게임 진행 중...";
  startButton.disabled = true;

  moveTarget();

  timer = setInterval(() => {
    timeLeft--;
    timeElement.textContent = timeLeft;

    if (timeLeft <= 0) {
      endGame();
    }
  }, 1000);
}

function endGame() {
  clearInterval(timer);
  playing = false;
  target.hidden = true;
  startButton.disabled = false;
  startButton.textContent = "다시 시작";

  const accuracy = totalClicks === 0 ? 0 : Math.round((hits / totalClicks) * 100);

  finalScoreElement.textContent = score;
  accuracyElement.textContent = accuracy + "%";

  const oldHighScore = Number(localStorage.getItem("aimTestHighScore") || 0);

  if (score > oldHighScore) {
    localStorage.setItem("aimTestHighScore", score);
  }

  loadHighScore();
  result.hidden = false;
}

target.addEventListener("click", (event) => {
  event.stopPropagation();

  if (!playing) return;

  hits++;
  totalClicks++;
  score++;
  scoreElement.textContent = score;

  moveTarget();
});

gameArea.addEventListener("click", () => {
  if (!playing) return;
  totalClicks++;
});

startButton.addEventListener("click", startGame);

loadHighScore();
