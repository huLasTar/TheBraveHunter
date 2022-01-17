const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 768;

const bird = new Bird();

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
    console.log(birds);
    requestAnimationFrame(animate);
}
animate(0);

window.addEventListener('click', function (e) {
    const detectpixelcolor = context.getImageData(e.x, e.y, 1, 1);
    // console.log(detectpixelcolor);
    const pixelcolor = detectpixelcolor.data;

    birds.forEach(object => {
        if (object.randomColors[0] === pixelcolor[0] && object.randomColors[1] === pixelcolor[1] && object.randomColors[2] === pixelcolor[2]) {
            // console.log("hit");
            score++;
            // scorecount.innerHTML = score;
            object.deleteentity = true;
        } else {
            console.log("no hit");
        }

    });
});

