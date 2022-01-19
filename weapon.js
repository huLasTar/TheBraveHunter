class Weapon {
    constructor() {
        this.width = 300;
        this.height = 300;
        this.x = (canvas.width-this.width)/2;
        this.y = canvas.height-this.height;
        this.image = new Image();
        this.image.src = "./assets/weapon.png";
    }
    draw() {
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}