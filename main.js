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

// Declare and preload an audio file for gunfire:
const forestSound = new Audio("./assets/forest.wav");
forestSound.preload = 'auto';
forestSound.loop = true;
forestSound.load();

// Declare and preload an audio file for gunfire:
const gunShot = new Audio("./assets/gunshot.mp3");
gunShot.preload = 'auto';
gunShot.load();

// Declare and preload an audio file for the dry gunfire (no ammo):
const noAmmo = new Audio("./assets/noammo.mp3");
noAmmo.preload = 'auto';
noAmmo.load();

let lasttime = 0;
let timetonextbird = 0;
let birdgap = 1000;
let birds = [];
let shots = [];
let ammo = 20;
let score = 0;
let gameover = false;
let won = false;

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
            return bird1.width-bird2.width;
        })
    }
    [...birds, ...shots].forEach(object => object.update(timedifference));
    [...birds, ...shots].forEach(object => object.draw());

    // Filter birds which are still alive:
    birds = birds.filter(object => !object.killedBird);
    shots = shots.filter(object => !object.killedBird);

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

    if (!gameover ) {
        if (!won) {
            requestAnimationFrame(animate);
        } else {
            cancelAnimationFrame(animate);
            winGame();
        }
    } else { 
        ammo = 0;
        stopGame();
    }
}

// Start the game:
animate(0);

// Check if the player clicks with the mouse button:
window.addEventListener('click', function (e) {
    
    forestSound.play();

    if (ammo != 0) {
        // gunShot.play();
        ammo -= 1;

        // Get the real position of the mouse click on the canvas:
        const mouseX = e.clientX - offsetX;
        const mouseY = e.clientY - offsetY;
    
        // Get hitbox color from the collision canvas:
        const detectPixelColor = collisionContext.getImageData(mouseX, mouseY, 1, 1);
        const pixelColor = detectPixelColor.data;

        // Check the hits on each birds:
        birds.forEach(object => {
            if (object.randomColors[0] === pixelColor[0] && object.randomColors[1] === pixelColor[1] && object.randomColors[2] === pixelColor[2]) {
                object.killedBird = true;
                score++;
                shots.push(new Weapon());
            } else {
                gunShot.play();
            }
        });

        // Get 10 bullets after every 9 killed birds:
        if (score % 9 === 0 && score != 0) {
            ammo += 10;
        }

        // Change difficulty level after every 50 killed birds:
        if (score % 50 === 0 && birdgap >= 400) {
            birdgap -= 100;
        }

        // If the player reaches 5000 points, the game is won:
        if (score === 500) {
            won = true;
        }

    } else {
        noAmmo.play();
    }
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

// Show the "You win!" message when the game ends:
function winGame() {
    context.font = "75px Impact";
    context.textAlign = "center";
    context.fillStyle = "white";
    context.shadowColor = 'black';
    context.shadowBlur = 15;
    context.fillText("YOU WIN!", canvas.width/2, canvas.height/2);
}