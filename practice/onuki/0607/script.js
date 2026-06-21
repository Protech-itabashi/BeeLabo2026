const canvas = document.getElementById("MainCanvas");
const ctx = canvas.getContext("2d");
const SCROLL_SPEED = 10.0
const SPEED = 5.0
const CANVAS_HEIGHT = 500
const CANVAS_WIDTH = 500
const GROUND_HEIGHT = 100
const CHARACTER_HEIGHT = 60
const CHARACTER_WIDTH = 60
const SKY_HEIGHT = CANVAS_HEIGHT-CHARACTER_HEIGHT
const GROUND_POS = SKY_HEIGHT-CHARACTER_HEIGHT

class Obstacle {
    x;
    y;
    width;
    height;
    constructor(x,y,w,h){
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;

    }
    draw(ctx){
        ctx.fillStyle = "#e91a0b";
        ctx.fillRect(this.x, 400-this.height-this.y, this.width, this.height);

    }
}

class Cahractar {
    Image;
    x;
    y;
    width;
    height;
    vy;
    ay;
    isGround;

    constructor(Image,x,y,w,h){
        this.Image = Image
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
        this.vy=0;
        this.ay= -2;
        this.isGround=true;
    }

    draw(ctx){
        ctx.drawImage(this.Image,this.x, 400-this.height-this.y, this.width, this.height);

    }

    jump(){
        if(this.isGround){
            this.isGround = false
            this.vy = 32//初速度を与える
        }
    }

    update() {
      if(this.isGround) return;

      this.vy += this.ay;
      this.y += this.vy;

      if(this.y < 0){
          this.vy = 0;
          this.y = 0;
          this.isGround = true;
      }
    }

    checkCollision(obstacle){
    return !(
        this.x +this.width<obstacle.x||
        this.x >obstacle.x+obstacle.width||
        this.y -this.height>obstacle.y||
        this.y <obstacle.y-obstacle.height
    )
}

       
}

    
   
    ctx.fillStyle = "#e91a0b";
    ctx.fillRect(100, 200, 300, 300);

  
//const cahractar_x = 90
//const cahractar_y = 75
//const cahractarspeed = 10
//const SCROLL_SPEED = 2.0
const cahractar = new Image();
cahractar.src = "../images/karby.png"
const player = new Cahractar(cahractar, 0, 0, 60, 60)

let frame = 0;
//let X = 0
//let Y = 325
let vy = 0 //yのデフォルトの速度
let ay = 2 //yの加速度
let isGround = true;//キャラが地面にいるか

const obstacles = [
    new Obstacle(350, 0, 50, 100),
    new Obstacle(450, 0, 50, 100),
    new Obstacle(650, 0, 50, 100),
    new Obstacle(850, 0, 50, 100),
    new Obstacle(1050, 0, 50, 100),
    new Obstacle(1250, 0, 50, 100),
];

function tick(){
    frame++;
    
    ctx.fillStyle = "#47f9ff";
    ctx.fillRect(0, 0, 500, 500);
    ctx.fillStyle = "#00ff37";
    ctx.fillRect(0, 400, 500, 500);
    

    player.draw(ctx);
    for (const obstacle of obstacles){
        obstacle.x-=SCROLL_SPEED;
        obstacle.draw(ctx);

        if (player.checkCollision(obstacle)){
            console.log(
                player,
                obstacle
            )
           return
        }
    }
    
    player.update();
    requestAnimationFrame(tick)

}

requestAnimationFrame(tick)


window.addEventListener("keydown",(e) => {
    if(e.key == "ArrowRight"){
         player.x += SPEED
    }
    if(e.key == "ArrowLeft"){
         player.x -= SPEED
    }
    if(e.key == "ArrowUp"){
        player.jump();
    }

});


