class StaticObjectBase {
    // Класс статичного объекта для фона и труб

    source = {};
    canvasWidth = NaN;
    canvasHeight = NaN;
    context = undefined;
    sprite = undefined;
    verticalOffset = 0;

    constructor(canvasWidth, canvasHeight, context, sprite, source, verticalOffset) {
        this.canvasHeight = canvasHeight;
        this.canvasWidth = canvasWidth;
        this.context = context;
        this.sprite = sprite;
        this.source = source;
        this.verticalOffset = verticalOffset;
    }
}

export default StaticObjectBase;
