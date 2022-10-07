import Sprite from './sprite.js';
import Config from './config.js';
import Background from './background.js';
import Bird from './bird.js';
import Pipe from './pipe.js';

const config = new Config();

function randPositionX () {
    return Math.random() * (800 - 300) + 300
}

function randTubeOffset () {
    return Math.random() * (400 - 100) + 100
}

const canvas = document.getElementById(config.canvas.id);
const context = canvas.getContext('2d');
const sprite = new Sprite('assets/img/sprite.png');
const backgroundSkyOne = new Background(
    // Небо кусок 1
    config.canvas.width,
    config.canvas.height,
    context,
    sprite,
    config.skySource,
    config.floorSource.height
);
const backgroundSkyTwo = new Background(
    // Небо кусок 2
    config.canvas.width,
    config.canvas.height,
    context,
    sprite,
    config.skySource,
    config.floorSource.height
);
const backgroundFloorOne = new Background(
    // Пол 1
    config.canvas.width,
    config.canvas.height,
    context,
    sprite,
    config.floorSource,
    0
);
const backgroundFloorTwo = new Background(
    // Пол 2
    config.canvas.width,
    config.canvas.height,
    context,
    sprite,
    config.floorSource,
    0
);
const bird = new Bird(
    config.canvas.width,
    config.canvas.height,
    context,
    sprite
)

const pipeArray = [];  // Стек труб

const pipeCount = Math.round((config.canvas.width / 52 + 1) / 2);

for (let i = 0; i <= pipeCount; i++) {
    const pipeOffset = randTubeOffset();
    const bottomPipe = new Pipe(
        config.canvas.width,
        config.canvas.height,
        context,
        sprite,
        config.bottomPipeSource,
        pipeOffset
    );
    const topPipe = new Pipe(
        config.canvas.width,
        config.canvas.height,
        context,
        sprite,
        config.topPipeSource,
        pipeOffset + 500
    );
    const pipePair = [topPipe, bottomPipe, randPositionX()];
    pipeArray.push(pipePair);
}


let index = 0;
let birdFrameIndex = 0;

const render = () => {
    index += 0.3;
    birdFrameIndex = Math.round(birdFrameIndex) == 3 ? birdFrameIndex = 0: birdFrameIndex += 0.3;
    const backgroundX = -((index * config.speed) % config.canvas.width);
    const bgOneX = backgroundX + config.canvas.width;
    const bgTwoX = backgroundX;
    
    context.clearRect(0, 0, config.canvas.width, config.canvas.height);
    
    backgroundSkyOne.draw(bgOneX);
    
    backgroundSkyTwo.draw(bgTwoX);

    let pipePosition = 0;

    for (let item of pipeArray) {
        // let x = config.canvas.width + pipePosition - (index * config.speed * 300);
        // if (x <= -config.canvas.width - config.topPipeSource.width * pipeArray.length) {
        //     pipePosition = 0;
        // }
        console.log(pipePosition);
        item[0].draw(config.canvas.width + pipePosition - (index * config.speed * 300), config.topPipeSource.height);
        item[1].draw(config.canvas.width + pipePosition - (index * config.speed * 300), config.bottomPipeSource.height);
        pipePosition += item[2];
    }

    
    backgroundFloorOne.draw(bgOneX);
    backgroundFloorTwo.draw(bgTwoX);
    
    bird.draw(0, 0, Math.round(birdFrameIndex));
    
    window.requestAnimationFrame(render);
}

sprite.image.onload = render();
