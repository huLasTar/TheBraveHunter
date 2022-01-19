class Bird {
    constructor() {
        this.spritewidth = 150;
        this.spriteheight = 150;
        this.width = 150;
        this.height = 150;
        this.x = canvas.width;
        this.y = Math.random() * ((canvas.height/2) - this.height);
        this.directionX = Math.random() * 5 + 2;
        this.directionY = Math.random() * 5 - 1;
        this.image = new Image();
        this.image.src = "./assets/bird.png";
        this.frame = 0;
        this.maxframe = 0;
        this.sinceflaptime = 0;
        this.flapduration = Math.random() * 50 + 50;
        this.killedBird = false;
        this.randomColors = [Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), Math.floor(Math.random() * 255)];
        this.color = 'rgb(' + this.randomColors[0] + ', ' + this.randomColors[1] + ', ' + this.randomColors[2] + ')';
    }
    update(timedifference) {
        // if a bird reaches the top or the bottom of the canvas, the vertical (flying) direction will change to the opposite:
        if (this.y < 0 || this.y > canvas.height/2 - this.height) {
            this.directionY = this.directionY * -1;
        }

        this.x -= this.directionX;
        // this.x = 200;
        this.y += this.directionY;
        
        // if a bird reaches the left side of the canvas, the game is over:
        if (this.x < 0-this.width) {
            this.killedBird = true;
        }

        // frame correction, remove the flickering of objects:
        this.sinceflaptime += timedifference;
        if (this.sinceflaptime > this.flapduration) {
            if (this.frame > this.maxframe) {
                this.frame = 0;
            } else {
                this.frame++;
            }
            this.sinceflaptime = 0;
        }
        if (this.x < 0-this.width) {
            gameover = true;
        }
    }
    draw() {
        collisionContext.fillStyle = this.color;
        collisionContext.fillRect(this.x, this.y, this.width, this.height);
        context.drawImage(this.image, this.frame * this.spritewidth, 0, this.spritewidth, this.spriteheight, Math.floor(this.x), Math.floor(this.y), this.width, this.height);
    }
}