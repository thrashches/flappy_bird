class Bird {
    sprite = undefined;
    frames = [
        {
            x: 276,
            y: 112,
        },
        {
            x: 276,
            y: 139,
        },
        {
            x: 276,
            y: 164,
        },
        {
            x: 276,
            y: 139,
        },
    ];
    width = 34;
    height = 26;

    position = {
        x: 0,
        y: 0,
    }

    constructor (canvasWidth, canvasHeight, context, sprite) {
        this.sprite = sprite;
        this.position.x = Math.round(canvasWidth / 2);
        this.position.y = Math.round(canvasHeight / 2);
        this.context = context;
    }

    draw(x, y, frameIndex) {
        this.context.drawImage(
            this.sprite.image,
            this.frames[frameIndex].x,
            this.frames[frameIndex].y,
            this.width,
            this.height,
            this.position.x,
            this.position.y,
            this.width,
            this.height
            )
    }
}

export default Bird;