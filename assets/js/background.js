import StaticObjectBase from "./static.js";

class Background  extends StaticObjectBase{
    
    frameCount = 1;

    constructor(canvasWidth, canvasHeight, context, sprite, source, verticalOffset) {
        super(canvasWidth, canvasHeight, context, sprite, source, verticalOffset);
        this.frameCount = Math.round(canvasWidth / source.width) + 1;
    }

    draw(x) {
        for (let i = x; i <= this.frameCount; i++) {
            this.context.drawImage(
                this.sprite.image,  // Источник спрайта
                this.source.x,  // Верхний левый угол картинки в источнике
                this.source.y,  // --//--
                this.source.width,  // Ширина картинки в источнике
                this.source.height,  // Высота картинки в источнике
                i * this.source.width, 
                this.canvasHeight - this.source.height - this.verticalOffset,
                this.source.width,
                this.source.height,
            );
        }
    }
}


export default Background;