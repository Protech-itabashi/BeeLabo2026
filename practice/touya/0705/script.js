const canvas = document.getElementById("mainCanvas");
const ctx = canvas.getContext("2d");

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
        ctx.fillStyle =  COLOR_RED;
        ctx.fillRect(this.x, SKY_HEIGHT - this.height - this.y, this.width, this.height);

    }
}

class Player {
    x;
    y;
    width;
    height;
    vy;
    ay;
    isGround;
    isAlibve;

    jumpSound = new Audio("../sounds/se_jump.mp3")
    hitSound = new Audio("../sounds/se_ぶつかる音.mp3")

    baseImage = new Image();
    diedImage = new Image();

    constructor(x,y,w,h){
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
        this.vy = 0;
        this.ay = -2;
        this.isGround = true;
        this.isAlibve = true;

        this.baseImage.src = "../images/bouhuman.png";
        this.diedImage.src = "../images/gameover.png";
    }

    draw(ctx){
        ctx.drawImage(this.isAlibve ? this.baseImage : this.diedImage, this.x, SKY_HEIGHT-this.height-this.y, this.width, this.height);

    }
     jump() {

        if (this.isGround) {
            this.isGround = false 
            this.vy = 30; 
            this.jumpSound.play();
        }
    }
    
    update() {

        if (this.isGround) return;
 
        this.vy += this.ay;
        this.y += this.vy;
 
        if (this.y < 0) {
            this.vy = 0;
            this.y = 0;
            this.isGround = true;
            this.jumpSound.pause();
            this.jumpSound.currentTime = 0;
        }
    

    }

    hit(){
        this.isAlibve = false;
        this.hitSound.play();
    }

    checkCollision(obstacle){
        return !(
            this.x + this.width < obstacle.x ||
            this.x > obstacle.x + obstacle.width ||
            this.y - this.height > obstacle.y ||
            this.y < obstacle.y - obstacle.height
        )
    }

}

const GAME_STATE_TITLE = 0;
const GAME_STATE_IMAGE = 1;
const GAME_STATE_GAMEOVER = 2;

const CANVAS_WIDTH = 500;
const CANVAS_HEIGHT = 500;
const GROUND_HEIGHT = 150;
const CHARACTER_WIDTH = 85;
const CHARACTER_HEIGHT = 60;
const SKY_HEIGHT = CANVAS_HEIGHT - GROUND_HEIGHT;
const GROUND_POS = SKY_HEIGHT - CHARACTER_HEIGHT;


const COLOR_SKY = "#8adaff";
const COLOR_GROUND = "#7eff5e";
const COLOR_CLEAR = "#ffffff";
const COLOR_RED = "#ff0000"

 
const MOVE_SPEED = 2.0;
const GRAVITY = 0.375;
 
const SPEED = 5.0;
const SCROLL_SPEED = 10.0;


const player = new Player(0, 0, CHARACTER_WIDTH, CHARACTER_HEIGHT)

const obstacles = [
    new Obstacle(750, 0, 50, 75),
    new Obstacle(1050, 0, 50, 75),
    new Obstacle(1350, 0, 50, 75),
    new Obstacle(1650, 0, 50, 75),
    new Obstacle(2000, 0, 50, 75),
    new Obstacle(2350, 0, 50, 75),
];

 
let frame = 0;
let gameState = GAME_STATE_TITLE;


function tick() {
    if (gameState === GAME_STATE_TITLE){
         ctx.fillStyle = COLOR_SKY;
         ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

         ctx.fillStyle = COLOR_GROUND;
         ctx.fillRect(0, SKY_HEIGHT, CANVAS_WIDTH, GROUND_HEIGHT);
    }else if(gameState === GAME_STATE_IMAGE){
    
    frame++;
 
    player.update();
 
    ctx.fillStyle = COLOR_SKY;
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);


    ctx.fillStyle = COLOR_GROUND;
    ctx.fillRect(0, SKY_HEIGHT, CANVAS_WIDTH, GROUND_HEIGHT);

    player.draw(ctx);
    


    for (const obstacle of obstacles){
        obstacle.x-= SCROLL_SPEED;
        obstacle.draw(ctx);

        if (player.checkCollision(obstacle)){
            console.log(
                player, 
                obstacle
            )
            player.hit();
            player.draw(ctx)
            return;
        
    }
}

}    
 
    requestAnimationFrame(tick);
}


requestAnimationFrame(tick)


window.addEventListener("keydown", (e) => {

    if (gameState === GAME_STATE_TITLE){
        if(e.key == " "||e.key == "Enter"){
            gameState = GAME_STATE_IMAGE;
            console.log("gameState", gameState)
        }
    }else if (gameState === GAME_STATE_IMAGE){
        if (e.key == "ArrowRight") {
        player.x += SPEED
    }


        if (e.key == "ArrowLeft") {
        player.x -= SPEED
        
    } 
     
        if (e.key == "ArrowUp") {
        player.jump();
    }

        
        }
    



 });

