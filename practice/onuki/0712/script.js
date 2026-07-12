const canvas = document.getElementById("MainCanvas");
const ctx = canvas.getContext("2d");
const SCROLL_SPEED = 2.0
const SPEED = 5.0
const CANVAS_HEIGHT = 500
const CANVAS_WIDTH = 500
const GROUND_HEIGHT = 100
const CHARACTER_HEIGHT = 60
const CHARACTER_WIDTH = 60
const SKY_HEIGHT = CANVAS_HEIGHT-CHARACTER_HEIGHT
const GROUND_POS = SKY_HEIGHT-CHARACTER_HEIGHT
const GAME_STATE_TITLE=0;
const GAME_STATE_INGAME=1;
const GAME_STATE_GAMEOVER=2;


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
    isAlive;

    jumpSound = new Audio("../sounds/ジャンプ.mp3")
    hitSound = new Audio("../sounds/ぐちゃっ！.mp3")

    baseImage = new Image();
    diedImege = new Image();
    
    constructor(x,y,w,h){
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
        this.vy=0;
        this.ay= -2;
        this.isGround=true;
        this.isAlive=true;

        this.baseImage.src = "../images/karby.png"
        this.diedImege.src = "../images/karby -died.png"
    }

    draw(ctx){
        ctx.drawImage(this.isAlive ? this.baseImage : this.diedImege,this.x, 400-this.height-this.y, this.width, this.height);

    }

    jump(){
        if(this.isGround){
            this.isGround = false
            this.vy = 32//初速度を与える
            this.jumpSound.play();
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
          this.jumpSound.pause();
          this.jumpSound.currentTime = 0;
      }
    }

    hit(){
       this.hitSound.play();
       this.isAlive=false;
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

    
   
  
//const cahractar_x = 90
//const cahractar_y = 75
//const cahractarspeed = 10
//const SCROLL_SPEED = 2.0

const player = new Cahractar( 0, 0, 60, 60)
let gameState=GAME_STATE_TITLE;



let frame = 0;
//let X = 0
//let Y = 325
let vy = 0 //yのデフォルトの速度
let ay = 2 //yの加速度
let isGround = true;//キャラが地面にいるか

const obstacles = [
    new Obstacle(450, 0, 50, 100),
    new Obstacle(650, 0, 50, 100),
    new Obstacle(850, 0, 50, 100),
    new Obstacle(1050, 0, 50, 100),
    new Obstacle(1250, 0, 50, 100),
];

function tick(){
    if(gameState ===GAME_STATE_TITLE){ 
        ctx.fillStyle = "#47f9ff";
        ctx.fillRect(0, 0, 500, 500);
        ctx.fillStyle = "#00ff37";
        ctx.fillRect(0, 400, 500, 500);

    }else if(gameState ===GAME_STATE_INGAME){
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
                player.hit();
                player.draw(ctx)
                return
            }
        }
    
    player.update();
}
    requestAnimationFrame(tick)

}

requestAnimationFrame(tick)


window.addEventListener("keydown",(e) => {
    console.log(e.key)
    if(gameState ===GAME_STATE_TITLE){
        if(e.key==""||e.key=="Enter"){
            gameState=GAME_STATE_INGAME;
            console.log("gameState:",gameState)
        }
    }else if(gameState ===GAME_STATE_INGAME){
        if(e.key == "ArrowRight"){
            player.x += SPEED
        }
        if(e.key == "ArrowLeft"){
            player.x -= SPEED
        }
        if(e.key == "ArrowUp"){
            player.jump();
        }
    }    
});


