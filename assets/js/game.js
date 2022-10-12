import Sprite from './sprite.js';
import Config from './config.js';
import Background from './background.js';
import Bird from './bird.js';
// import Pipe from './pipe.js';
import PipePair from './pipe.js';

const config = new Config();

function randPositionX() {
    return Math.random() * (800 - 300) + 300
}

function randTubeOffset() {
    return -(Math.random() * (400 - 100) + 100)
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

const pipeArray = [];

const firstPipe = new PipePair(
    config.canvas.width,
    config.canvas.height,
    context,
    sprite,
    config.topPipeSource,
    config.bottomPipeSource
);
firstPipe.setY(randTubeOffset());
firstPipe.setX(config.canvas.width);

pipeArray.push(firstPipe);


let index = 0;
let birdFrameIndex = 0;

// let pipeLineX = config.canvas.width;


const render = () => {
    index += 0.3;
    birdFrameIndex = Math.round(birdFrameIndex) == 3 ? birdFrameIndex = 0 : birdFrameIndex += 0.3;
    const backgroundX = -((index * config.speed) % config.canvas.width);
    const bgOneX = backgroundX + config.canvas.width;
    const bgTwoX = backgroundX;

    context.clearRect(0, 0, config.canvas.width, config.canvas.height);

    backgroundSkyOne.draw(bgOneX);

    backgroundSkyTwo.draw(bgTwoX);

    for (let pipePair of pipeArray) {
        pipePair.topPipe.x -= 2;
        pipePair.bottomPipe.x -= 2;
        pipePair.draw(pipePair.getX());

        if (pipePair.getX() == config.canvas.width - Math.round(config.canvas.width / 2)) {
            // Добавление новой трубы
            const newPipePair = new PipePair(
                config.canvas.width,
                config.canvas.height,
                context,
                sprite,
                config.topPipeSource,
                config.bottomPipeSource
            );
            newPipePair.setY(randTubeOffset());
            newPipePair.setX(config.canvas.width);
            pipeArray.push(newPipePair);
        }
        if (pipePair.getX() <= -config.topPipeSource.width) {
            // Удаление трубы, которая зашла за левый край
            pipeArray.splice(0, 1);
        }
    }

    backgroundFloorOne.draw(bgOneX);
    backgroundFloorTwo.draw(bgTwoX);

    bird.draw(0, 0, Math.round(birdFrameIndex));

    window.requestAnimationFrame(render);
}

sprite.image.onload = render();
