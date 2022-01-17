const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const elemLeft = canvas.offsetLeft + canvas.clientLeft;
const elemTop = canvas.offsetTop + canvas.clientTop;

console.log(elemLeft);
console.log(elemTop);

canvas.width = 1024;
canvas.height = 768;

const bird = new Bird();
const weapon = new Weapon();

let lasttime = 0;
let timetonextbird = 0;
let birdgap = 1000;
let birds = [];
let score = 0;
let gameover = false;

function animate(timestamp) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    let timedifference = timestamp - lasttime;
    lasttime = timestamp;
    // console.log(timedifference);
    timetonextbird += timedifference;
    if (timetonextbird > birdgap) {
        if (birds.length < 5) {
            birds.push(new Bird());
        }
        timetonextbird = 0;
        birds.sort(function (bird1, bird2) {
            return bird1.width - bird2.width;
        })
    }
    
    for (let i = 0; i < birds.length; i++) {
        birds[i].update(timedifference);
        birds[i].draw();
    }
    
    //[...birds].forEach(object => object.update(timedifference));
    //[...birds].forEach(object => object.draw());
    birds = birds.filter(object => !object.deleteentity);
    // bird.update();
    // bird.draw();
    //console.log(birds);
    weapon.draw();
    requestAnimationFrame(animate);
}
animate(0);

window.addEventListener('click', function (e) {
    // const detectpixelcolor = context.getImageData(e.x, e.y, 1, 1);
    // console.log(detectpixelcolor);
    // const pixelcolor = detectpixelcolor.data;

    birds.forEach(object => {

        const birdX = e.pageX - elemLeft;
        const birdY = e.pageY - elemTop;
        const killedBirds = [];
    
        console.log(birdX, birdY);
        console.log(object.top);

        if (birdY > object.top && birdY < object.top + object.height && birdX > object.left && birdX < object.left + object.width) {
            console.log("hit");
            // score++;
            // scorecount.innerHTML = score;
            // object.deleteentity = true;
        } else {
            console.log("no hit");
        }
    });
}, false);

