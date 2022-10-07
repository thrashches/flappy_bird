class Config {
    speed = 0.03;

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

    constructor () {
        // this.canvas.height = document.body.clientHeight;
        this.canvas.height = document.getElementById('wrapper').offsetHeight;
        this.canvas.width = document.getElementById('wrapper').offsetWidth;
        const canvas = document.getElementById(this.canvas.id);
        canvas.setAttribute('height', this.canvas.height);
        canvas.setAttribute('width', this.canvas.width);
    }
}

export default Config;