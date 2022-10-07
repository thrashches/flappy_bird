class Sprite {
    image = undefined;

    constructor (src) {
        this.image = new Image();
        this.image.src = src;
    }

}

export default Sprite;