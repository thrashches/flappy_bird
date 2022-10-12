class GameOver {
    sprite = undefined;
    source = {};
    context = undefined;
    constructor(sprite, source, context) {
        this.sprite = sprite;
        this.source = source;
    }

    draw() {
        this.context.dwawImage(
            this.sprite.image,
            this.source.x,
            this.source.y,
            
        )
    }
}

export default GameOver;