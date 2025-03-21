class Obstacle {
    constructor(type) {
        this.x = canvas.width;
        this.y = Math.random() * (canvas.height - 35);
        this.size = 35;
        this.speed = -3; // Moves left
        this.type = type;

        this.image = new Image();
        this.image.src = type === "bomb" ? "assets/bomb.png" : "assets/yel.png";
    }

    update() {
        this.x += this.speed; // Move left
    }

    draw(ctx) {
        ctx.drawImage(this.image, this.x, this.y, this.size, this.size);
    }
}
