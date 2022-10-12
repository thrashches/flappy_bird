import Sprite from './sprite.js';
import Config from './config.js';
import Background from './background.js';
import Bird from './bird.js';
// import Pipe from './pipe.js';
import PipePair from './pipe.js';

const config = new Config();

function randTubeOffset() {
    return -(Math.random() * (400 - 100) + 100)
}

function getBestScore() {
    const score = window.localStorage.getItem('score');
    if (score) {
        return parseInt(score);
    }
    else {
        return 0;
    }
}

function saveScore(score) {
    window.localStorage.setItem('score', score);
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
    config.bottomPipeSource,

);
firstPipe.setY(randTubeOffset());
firstPipe.setX(config.canvas.width);

pipeArray.push(firstPipe);


let index = 0;
let birdFrameIndex = 0;

// let pipeLineX = config.canvas.width;

let scores = 0;

const scoresElement = document.getElementById('scores');

const render = () => {
    let birdDead = bird.isDead(config.canvas.height); // Жива ли птица

    index += 0.3;
    birdFrameIndex = Math.round(birdFrameIndex) == 3 ? birdFrameIndex = 0 : birdFrameIndex += 0.3;  // Кадр птицы
    const backgroundX = -((index * config.speed) % config.canvas.width);
    const bgOneX = backgroundX + config.canvas.width;
    const bgTwoX = backgroundX;

    context.clearRect(0, 0, config.canvas.width, config.canvas.height);  // Очистка холста, чтобы избежать артефактов

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
                config.bottomPipeSource,

            );
            newPipePair.setY(randTubeOffset());
            newPipePair.setX(config.canvas.width);
            pipeArray.push(newPipePair);
        }
        
        if (bird.position.x + bird.width >= pipePair.getX() && bird.position.x <= pipePair.getX() + pipePair.topPipeSource.width) {
            // Если птица проходит между труб
            pipePair.passing = true;  // переключаем проход трубы
            birdDead = bird.isDead(config.canvas.height, pipePair);
            
        } else {
            if (pipePair.passing && pipePair.getX() + pipePair.topPipeSource.width <= bird.position.x) {
                scores += 1;
            }
            pipePair.passing = false;
        }
        if (pipePair.getX() <= -config.topPipeSource.width) {
            // Удаление трубы, которая зашла за левый край
            pipeArray.splice(0, 1);
        }
    }
    
    backgroundFloorOne.draw(bgOneX);
    backgroundFloorTwo.draw(bgTwoX);
    bird.fallSpeed += 0.1;
    bird.position.y += 1 * bird.fallSpeed;
    bird.draw(Math.round(birdFrameIndex));
    scoresElement.innerText = `Score: ${scores}`;

    if (!birdDead) {
        window.requestAnimationFrame(render);
    }
    else {
        saveScore(scores);
    }

}

sprite.image.onload = render();
document.addEventListener('keydown', (event) => {
    if (event.code == 'Space') {
        bird.jump();
    }
})