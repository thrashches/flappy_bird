class Config {
    speed = 3;

    canvas = {
        id: 'gameArea',
        height: NaN,
        width: NaN
    };

    skySource = {
        x: 0,
        y: 0,
        width: 275,
        height: 225,
    };

    floorSource = {
        x: 277,
        y: 0,
        width: 222,
        height: 112,
    };

    bird = {

    };

    topPipeSource = {
        x: 555,
        y: 0,
        width: 52,
        height: 400,
    };

    bottomPipeSource = {
        x: 503,
        y: 0,
        width: 52,
        height: 400,
    };

    gameOverSource = {
        x: 175,
        y: 229,
        width: 228,
        height: 43,
    }

    constructor () {
        // this.canvas.height = document.body.clientHeight;
        this.canvas.height = document.getElementById('wrapper').offsetHeight;
        this.canvas.width = (Math.round(document.getElementById('wrapper').offsetWidth / this.skySource.width) + 1) * this.skySource.width;
        const canvas = document.getElementById(this.canvas.id);
        canvas.setAttribute('height', this.canvas.height);
        canvas.setAttribute('width', this.canvas.width);
    }
}

export default Config;