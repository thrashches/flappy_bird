class GameOver {
    // Класс управления окончанием игры
    sprite = undefined;
    source = {};
    canvas = undefined;
    context = undefined;
    constructor(sprite, source, canvas, context) {
        this.sprite = sprite;
        this.source = source;
        this.canvas = canvas;
        this.context = context;
    }

    draw() {
        const x = this.canvas.width / 2 - this.source.width;
        const y = this.canvas.height /2 - this.source.height;
        this.context.drawImage(
            this.sprite.image,
            this.source.x,
            this.source.y,
            this.source.width,
            this.source.height,
            x,
            y,
            this.source.width,
            this.source.height
        );
        const bestScores = document.getElementById('best');
        bestScores.hidden = false;
        const message = document.getElementById('message');
        message.hidden = false;
    }
}

export default GameOver;