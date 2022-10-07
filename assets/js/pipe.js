import StaticObjectBase from "./static.js";

class PipePair {
    topPipeSource = {};
    bottomPipeSource = {};



    constructor(topPipeSource, bottomPipeSource) {
        this.topPipeSource = topPipeSource;
        this.bottomPipeSource = bottomPipeSource;
        
    }


}


class Pipe extends StaticObjectBase {
    constructor(canvasWidth, canvasHeight, context, sprite, source, verticalOffset) {
        super(canvasWidth, canvasHeight, context, sprite, source, verticalOffset);
    }

    draw(x, y) {
        this.context.drawImage(
            this.sprite.image,
            this.source.x,
            this.source.y,
            this.source.width,
            this.source.height,
            x,
            this.canvasHeight - this.verticalOffset,
            this.source.width,
            this.source.height,

        );
        // console.log(x);
    }
}


// export default PipePair;
export default Pipe;
