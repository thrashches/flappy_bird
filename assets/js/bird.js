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

    fallSpeed = 0

    constructor(canvasWidth, canvasHeight, context, sprite) {
        this.sprite = sprite;
        this.position.x = Math.round(canvasWidth / 4);
        this.position.y = Math.round(canvasHeight / 2);
        this.context = context;
    }

    draw(frameIndex) {
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
        );
    }

    jump() {
        this.position.y -= 40;
        this.fallSpeed = 0;
    }

    isDead(canvasHeight, pipePair) {
        // Если квадрат птицы вписывается в промежуток трубы, то false, иначе true
        if (pipePair) {
            const topPipeY = pipePair.topPipe.y + pipePair.topPipeSource.height;
            const bottomPipeY = pipePair.bottomPipe.y;
            if (this.position.y <= topPipeY || this.position.y >= bottomPipeY) {
                return true;
            }
        }

        if (this.position.y >= canvasHeight - 112 - this.height) {
            // Если птица на полу, то все
            return true;
        }
        return false;
    }
}

export default Bird;