const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Load Background Image
const backgroundImg = new Image();
backgroundImg.src = "assets/back.png";

let pacman = new Pacman();
let obstacles = [];
let gameRunning = true; // Track if the game is running

// Get modal elements
const gameOverModal = document.getElementById("gameOverModal");
const finalScoreText = document.getElementById("finalScore");
const restartBtn = document.getElementById("restartBtn");
const exitBtn = document.getElementById("exitBtn");

// Ensure modal is **hidden** at the start
gameOverModal.style.display = "none";

function spawnObstacle() {
    let type = Math.random() < 0.7 ? "bomb" : "fruit"; // 70% bomb, 30% fruit
    obstacles.push(new Obstacle(type));
}

// Function to handle game over
function gameOver() {
    gameRunning = false; // Stop the game loop
    finalScoreText.innerText = pacman.score; // Update score in modal
    gameOverModal.style.display = "flex"; // Show modal
}

// Main Game Loop
function gameLoop() {
    if (!gameRunning) return; // Stop updating the game if gameRunning is false

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
                gameOver(); // Show game over dialog and freeze game
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

// Restart Game Function
restartBtn.addEventListener("click", () => {
    gameOverModal.style.display = "none"; // Hide modal
    resetGame(); // Restart game
});

// Exit Game Function
exitBtn.addEventListener("click", () => {
    gameOverModal.style.display = "none"; // Hide modal
    alert("Thanks for playing!");
});

// Reset the game
function resetGame() {
    pacman = new Pacman();
    obstacles = [];
    gameRunning = true; // Resume the game loop
    gameOverModal.style.display = "none"; // Hide modal
    gameLoop(); // Restart the game loop
}

// Spawn obstacles every 300ms (only when the game is running)
setInterval(() => {
    if (gameRunning) spawnObstacle();
}, 150);

// Start the game
gameLoop();
