import StaticObjectBase from "./static.js";

class PipePair {
    passing = false;
    topPipeSource = {};
    bottomPipeSource = {};
    topPipe = undefined;
    bottomPipe = undefined;
    y = 0;
    xOffset = 0;

    constructor(canvasWidth, canvasHeight, context, sprite, topPipeSource, bottomPipeSource) {
        this.topPipeSource = topPipeSource;
        this.bottomPipeSource = bottomPipeSource;
        this.topPipe = new Pipe(canvasWidth, canvasHeight, context, sprite, topPipeSource);
        this.bottomPipe = new Pipe(canvasWidth, canvasHeight, context, sprite, bottomPipeSource);
    }

    setX(x) {
        this.topPipe.x = x;
        this.bottomPipe.x = x;
    }
    setY(y) {
        this.y = y;
    }

    setXOffset(offset) {
        this.xOffset = offset;
    }

    getX() {
        return this.topPipe.x;
    }

    draw(x) {
        const topPipeY = this.y;
        const bottomPipeY = this.y + this.topPipeSource.height + this.topPipeSource.height * 0.25;
        this.topPipe.draw(x, topPipeY);
        this.bottomPipe.draw(x, bottomPipeY);
    }
}


class Pipe extends StaticObjectBase {
    x = NaN;
    y = NaN;

    constructor(canvasWidth, canvasHeight, context, sprite, source, verticalOffset) {
        super(canvasWidth, canvasHeight, context, sprite, source, verticalOffset);
        // Заполняем основные параметры трубы как статичного объекта
    }

    draw(x, y) {
        this.x = x;
        this.y = y;
        this.context.drawImage(
            this.sprite.image,
            this.source.x,
            this.source.y,
            this.source.width,
            this.source.height,
            this.x,
            this.y,
            this.source.width,
            this.source.height,
        );
        // console.log(x);
    }
}

export default PipePair;
