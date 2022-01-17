class Bird {
    constructor() {
        this.spritewidth = 100;
        this.spriteheight = 100;
        this.resizer = Math.random() * 0.05 + 0.1;
        this.width = 100;
        this.height = 100;
        this.x = canvas.width;
        this.y = Math.random() * (canvas.height - this.height);
        this.directionX = Math.random() * 5 + 2;
        this.directionY = Math.random() * 5 - 1;
        this.deleteentity = false;
        this.image = new Image();
        this.image.src = "./assets/bird.png";
        this.frame = 0;
        this.maxframe = -1;
        this.sinceflaptime = 0;
        this.flapduration = Math.random() * 50 + 50;
        this.randomColors = [Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), Math.floor(Math.random() * 255)];
        this.color = 'rgb(' + this.randomColors[0] + ', ' + this.randomColors[1] + ', ' + this.randomColors[2] + ')';
    }
    update(timedifference) {
        // if a bird reaches the top or the bottom of the canvas, the vertical (flying) direction will change to the opposite:
        if (this.y < 0 || this.y > canvas.height - this.height) {
            this.directionY = this.directionY * -1;
        }

        this.x = this.directionX;
        this.y += this.directionY;

        if (this.x < 0-this.width) {
            this.deleteentity = true;
        }

        this.sinceflaptime += timedifference;
        if (this.sinceflaptime > this.flapduration) {
            if (this.frame > this.maxframe) {
                this.frame = 0;
            } else {
                this.frame++;
            }
            this.sinceflaptime = 0;
        }
    }
    draw() {
        //context.fillRect(this.x, this.y, this.width, this.height);
        context.fillStyle = this.color;
        context.drawImage(this.image, this.frame * this.spritewidth, 0, this.spritewidth, this.spriteheight, this.x, this.y, this.width, this.height);
    }
}