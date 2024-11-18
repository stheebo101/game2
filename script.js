const game = document.getElementById("game");
const spaceship = document.getElementById("spaceship");
const scoreDisplay = document.getElementById("score");

let score = 0;
let spaceshipPosition = 180;
let lasers = [];
let enemies = [];

// Move spaceship
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft" && spaceshipPosition > 0) {
    spaceshipPosition -= 10;
  } else if (e.key === "ArrowRight" && spaceshipPosition < 360) {
    spaceshipPosition += 10;
  } else if (e.key === " ") {
    fireLaser();
  }
  spaceship.style.left = `${spaceshipPosition}px`;
});

// Fire lasers
function fireLaser() {
  const laser = document.createElement("div");
  laser.classList.add("laser");
  laser.style.left = `${spaceshipPosition + 17}px`;
  laser.style.bottom = `50px`;
  game.appendChild(laser);
  lasers.push(laser);
}

// Create enemies
function spawnEnemy() {
  const enemy = document.createElement("div");
  enemy.classList.add("enemy");
  enemy.style.left = `${Math.random() * 370}px`;
  enemy.style.top = `0px`;
  game.appendChild(enemy);
  enemies.push(enemy);
}

// Update positions
function updateGame() {
  // Move lasers
  lasers.forEach((laser, index) => {
    const laserBottom = parseInt(laser.style.bottom);
    if (laserBottom > 600) {
      laser.remove();
      lasers.splice(index, 1);
    } else {
      laser.style.bottom = `${laserBottom + 5}px`;
    }
  });

  // Move enemies
  enemies.forEach((enemy, index) => {
    const enemyTop = parseInt(enemy.style.top);
    if (enemyTop > 600) {
      enemy.remove();
      enemies.splice(index, 1);
    } else {
      enemy.style.top = `${enemyTop + 2}px`;

      // Check for collision with spaceship
      if (
        enemyTop > 560 &&
        parseInt(enemy.style.left) > spaceshipPosition - 30 &&
        parseInt(enemy.style.left) < spaceshipPosition + 40
      ) {
        alert("Game Over! Your score: " + score);
        resetGame();
      }
    }
  });

  // Check for collisions with lasers
  lasers.forEach((laser, laserIndex) => {
    enemies.forEach((enemy, enemyIndex) => {
      const laserTop = parseInt(laser.style.bottom);
      const laserLeft = parseInt(laser.style.left);
      const enemyTop = parseInt(enemy.style.top);
      const enemyLeft = parseInt(enemy.style.left);

      if (
        laserTop > enemyTop &&
        laserTop < enemyTop + 30 &&
        laserLeft > enemyLeft &&
        laserLeft < enemyLeft + 30
      ) {
        // Collision detected
        laser.remove();
        enemy.remove();
        lasers.splice(laserIndex, 1);
        enemies.splice(enemyIndex, 1);
        score++;
        scoreDisplay.textContent = `Score: ${score}`;
      }
    });
  });

  requestAnimationFrame(updateGame);
}

// Reset game
function resetGame() {
  score = 0;
  scoreDisplay.textContent = `Score: ${score}`;
  enemies.forEach((enemy) => enemy.remove());
  lasers.forEach((laser) => laser.remove());
  enemies = [];
  lasers = [];
}

// Start game
setInterval(spawnEnemy, 1000);
updateGame();
