// Create the main canvas:
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
canvas.width = 1024;
canvas.height = 768;

// Create another canvas for collision detection:
const collisionCanvas = document.getElementById('collisionCanvas');
const collisionContext = collisionCanvas.getContext('2d');
collisionCanvas.width = canvas.width;
collisionCanvas.height = canvas.height;

// Variables for mouse position on canvas:
const bounding = canvas.getBoundingClientRect();
const offsetX = bounding.left;
const offsetY = bounding.top;

// Initialize a variable for Weapon class:
const weapon = new Weapon();

// Initialize a variable for Bird class:
const bird = new Bird();

// Declare and preload an audio file for gunshots:
const gunShot = new Audio("./assets/shotgun.wav");
gunShot.preload = 'auto';
gunShot.load();

// Declare and preload an audio file for game over:
const gameOverSound = new Audio("./assets/gameover.mp3");
gameOverSound.preload = 'auto';
gameOverSound.load();

let lasttime = 0;
let timetonextbird = 0;
let birdgap = 1000;
let birds = [];
let ammo = 20;
let score = 0;
let gameover = false;

function animate(timestamp) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    collisionContext.clearRect(0, 0, canvas.width, canvas.height);
    let timedifference = timestamp-lasttime;
    lasttime = timestamp;
    timetonextbird += timedifference;
    if (timetonextbird > birdgap) {
        // if (birds.length < 8) {
            birds.push(new Bird());
        // }
        timetonextbird = 0;
        birds.sort(function (bird1, bird2) {
            return bird1.width - bird2.width;
        })
    }
    [...birds].forEach(object => object.update(timedifference));
    [...birds].forEach(object => object.draw());

    // Filter birds which are still alive:
    birds = birds.filter(object => !object.killedBird);
    
    // Show weapon
    weapon.draw();

    // Show score
	context.fillStyle = "black";
	context.font = "30px Impact";
	context.textAlign = "left";
	context.textBaseline = "top";
	context.fillText("BIRDS KILLED: " + score, 10, 10);

    // Show ammo
	context.fillStyle = "yellow";
	context.font = "30px Impact";
	context.textAlign = "right";
	context.textBaseline = "bottom";
	context.fillText("REMAINING AMMO: " + ammo, canvas.width-10, canvas.height-10);

    // if (!gameover && ammo > 0) {
    if (!gameover) {
        requestAnimationFrame(animate);
    } else {
        stopGame();
    }
}

animate(0);

// Check if the player clicks with the mouse button:
window.addEventListener('click', function (e) {
    
    // Get the real position of the mouse click on canvas:
    const mouseX = e.clientX - offsetX;
    const mouseY = e.clientY - offsetY;
    
    // Get hitbox color from collision canvas:
    const detectPixelColor = collisionContext.getImageData(mouseX, mouseY, 1, 1);
    const pixelColor = detectPixelColor.data;

    // Check the hits on each birds
    birds.forEach(object => {
        if (object.randomColors[0] === pixelColor[0] && object.randomColors[1] === pixelColor[1] && object.randomColors[2] === pixelColor[2]) {
            console.log("hit");
            gunShot.play();
            object.killedBird = true;
            ammo--;
            score++;
        } else {
            gunShot.play();
            ammo--;
            console.log("no hit");
        }  
    });
});

// Show the "Game Over" message when the game ends:
function stopGame() {
    context.font = "75px Impact";
    context.textAlign = "center";
    context.fillStyle = "red";
    context.shadowColor = 'black';
    context.shadowBlur = 15;
    context.fillText("GAME OVER", canvas.width/2, canvas.height/2);
}