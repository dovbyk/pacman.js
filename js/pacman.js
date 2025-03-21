class Pacman {
    constructor() {
        this.x = 50;
        this.y = 200;
        this.size = 35;
        this.speed = 12;
        this.direction = "RIGHT"; // Default direction
        this.score = 0;

        // Load Pacman images
        this.sprites = {
            RIGHT: new Image(),
            LEFT: new Image(),
            UP: new Image(),
            DOWN: new Image(),
        };
        this.sprites.RIGHT.src = "assets/pac_right.png";
        this.sprites.LEFT.src = "assets/pac_left.png";
        this.sprites.UP.src = "assets/pac_up.png";
        this.sprites.DOWN.src = "assets/pac_down.png";

        // Listen for keyboard input
        document.addEventListener("keydown", (event) => this.changeDirection(event));
    }

    changeDirection(event) {
        switch (event.key.toLowerCase()) {
            case "d":
                this.direction = "RIGHT";
                break;
            case "a":
                this.direction = "LEFT";
                break;
            case "w":
                this.direction = "UP";
                break;
            case "s":
                this.direction = "DOWN";
                break;
        }
    }

    update() {
        switch (this.direction) {
            case "RIGHT":
                this.x += this.speed;
                break;
            case "LEFT":
                this.x -= this.speed;
                break;
            case "UP":
                this.y -= this.speed;
                break;
            case "DOWN":
                this.y += this.speed;
                break;
        }

        // Prevent Pacman from leaving the screen
        this.x = Math.max(0, Math.min(canvas.width - this.size, this.x));
        this.y = Math.max(0, Math.min(canvas.height - this.size, this.y));
    }

    draw(ctx) {
        ctx.drawImage(this.sprites[this.direction], this.x, this.y, this.size, this.size);
    }

    collidesWith(obstacle) {
        return (
            this.x < obstacle.x + obstacle.size &&
            this.x + this.size > obstacle.x &&
            this.y < obstacle.y + obstacle.size &&
            this.y + this.size > obstacle.y
        );
    }
}
