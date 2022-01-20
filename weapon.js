class Weapon {
    constructor() {
        this.width = 300;
        this.height = 300;
        this.x = (canvas.width-this.width)/2;
        this.y = canvas.height-this.height;
        this.image = new Image();
        this.image.src = "./assets/weapon.png";
        this.frame = 0;
        this.sound = new Audio();
        this.sound.src = "./assets/gunshot.mp3";
        this.timeSinceLastFrame = 0;
        this.frameInterval = 200;
        this.killedBird = false;
    }
    update(deltatime) {
        if (this.frame === 0) {
            this.sound.play();
        }
        this.timeSinceLastFrame += deltatime;
        if (this.timeSinceLastFrame > this.frameInterval) {
            this.frame++;
        }
    }
    draw() {
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}