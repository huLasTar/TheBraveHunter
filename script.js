const killedBirds = [];

const gameArea = {
    canvas: document.getElementById('canvas'),
    frames: 0,
    start: function () {
      this.canvas.width = 1024;
      this.canvas.height = 768;
      this.context = this.canvas.getContext('2d');
      this.interval = setInterval(updateGameArea, 20);
      window.addEventListener('mousemove', function (e) {
        gameArea.x = e.pageX;
        gameArea.y = e.pageY;
      })
    },
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop: function () {
        clearInterval(this.interval);
    },
    score: function () {
        const points = Math.floor(this.frames / 5);
        this.context.font = '18px serif';
        this.context.fillStyle = 'black';
        this.context.fillText(`Score: ${points}`, 350, 50);
    },
  };

  class Component {
    constructor(width, height, color, x, y, type) {
      this.type = type;
      if (type == "image") {
        this.image = new Image();
        this.image.src = color;
      }
      this.width = width;
      this.height = height;
      this.color = color;
      this.x = x;
      this.y = y;

      this.speedX = 0;
      this.speedY = 0;
    }
  
    newPos() {
        this.x += this.speedX;
        this.y += this.speedY;
    }

    update() {
      const ctx = gameArea.context;

      /*
      const bird = new Image();
      bird.src = "./assets/bird.png";
      ctx.drawImage(bird, 0, 0);
      */

      // const gun = new Image();
      // gun.src = "./assets/gun2.png";
      //gun.onload = () => ctx.drawImage(gun, (canvas.width-gun.width)/2, canvas.height-gun.height);
      // ctx.drawImage(gun, (canvas.width-gun.width)/2, canvas.height-gun.height);

      if (type == "image") {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
      } else {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
      }
    }
  }

  function checkGameOver() {
    const crashed = killedBirds.some(function (obstacle) {
      return player.crashWith(obstacle);
    });
  
    if (crashed) {
      gameArea.stop();
    }
  }
  
  function updateBirds() {
    for (i = 0; i < killedBirds.length; i++) {
        killedBirds[i].x += -1;
        killedBirds[i].update();
      }
    gameArea.frames += 1;
    if (gameArea.frames % 120 === 0) {
      let x = gameArea.canvas.width;
      let minHeight = 20;
      let maxHeight = 200;
      let height = Math.floor(Math.random() * (maxHeight - minHeight + 1) + minHeight);
      let minGap = 50;
      let maxGap = 200;
      let gap = Math.floor(Math.random() * (maxGap - minGap + 1) + minGap);
      killedBirds.push(new Component(10, height, 'green', x, 0));
      killedBirds.push(new Component(10, x - height - gap, 'green', x, height + gap));
    }
  }
  
  function updateGameArea() {
    gameArea.clear();
    if (gameArea.x && gameArea.y) {
      player.x = gameArea.x;
      player.y = 768;
    }
    //player.newPos();
    player.update();
    //updateBirds();
    checkGameOver();
    //gameArea.score();
  }
  
  //const player = new Component(30, 30, 'red', 0, 110);

  const myGamePiece = new Component(405, 405, "./assets/gun2.png", 512, 384, "image");

  gameArea.start();