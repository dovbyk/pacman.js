const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Load Background Image
const backgroundImg = new Image();
backgroundImg.src = "assets/back.png";

let pacman = new Pacman();
let obstacles = [];
let gameRunning = false; // Game starts only after closing the start modal

// Get Start Game Modal Elements
const startGameModal = document.getElementById("startGameModal");
const startGameBtn = document.getElementById("startGameBtn");

// Get Game Over Modal Elements
const gameOverModal = document.getElementById("gameOverModal");
const finalScoreText = document.getElementById("finalScore");
const restartBtn = document.getElementById("restartBtn");
const exitBtn = document.getElementById("exitBtn");

// Ensure both modals are hidden initially
startGameModal.style.display = "flex";  // Start game modal appears first
gameOverModal.style.display = "none";   // Game over modal is hidden at start

// Start Game Function (Triggered when user clicks "Start Game")
startGameBtn.addEventListener("click", () => {
    startGameModal.style.display = "none"; // Hide start modal
    gameRunning = true; // Allow the game to start
    gameLoop(); // Begin game loop
});

// Function to spawn obstacles
function spawnObstacle() {
    if (gameRunning) {
        let type = Math.random() < 0.7 ? "bomb" : "fruit"; // 70% bomb, 30% fruit
        obstacles.push(new Obstacle(type));
    }
}

// Main Game Loop
function gameLoop() {
    if (!gameRunning) return; // Stop game updates if game is paused

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(backgroundImg, 0, 0, canvas.width, canvas.height);

    pacman.update();
    pacman.draw(ctx);

    obstacles.forEach((obs, index) => {
        obs.update();
        obs.draw(ctx);

        // Collision Detection
        if (pacman.collidesWith(obs)) {
            if (obs.type === "bomb") {
                gameOver(); // Show game-over dialog and freeze game
                return;
            } else {
                pacman.score++;
                obstacles.splice(index, 1);
            }
        }
    });

    // Display Score
    ctx.fillStyle = "white";
    ctx.font = "32px Arial";
    ctx.fillText("Score: " + pacman.score, 20, 40);

    requestAnimationFrame(gameLoop);
}

// Game Over Function (When Pacman hits a bomb)
function gameOver() {
    gameRunning = false; // Stop the game loop
    finalScoreText.innerText = pacman.score; // Update score in modal
    gameOverModal.style.display = "flex"; // Show game-over modal
}

// Restart Game Function
restartBtn.addEventListener("click", () => {
    gameOverModal.style.display = "none"; // Hide game-over modal
    resetGame(); // Restart game
});

// Exit Game Function
exitBtn.addEventListener("click", () => {
    gameOverModal.style.display = "none"; // Hide modal
    alert("Thanks for playing!");
});

// Reset Game Function
function resetGame() {
    pacman = new Pacman();
    obstacles = [];
    gameRunning = true;
    gameLoop();
}

// Spawn obstacles every 300ms (only when game is running)
setInterval(spawnObstacle, 150);
