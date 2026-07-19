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
        ctx.fillStyle = COLOR_OBSTACLE;
        ctx.fillRect(this.x,SKY_HEIGHT - this.height - this.y,this.width,this.height);
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
    isAlive;

    jumpSound = new Audio("../sounds/se1.mp3");
    hitSound = new Audio("../sounds/se2.mp3");

    baseImage = new Image();
    diedImage = new Image();


    constructor(x,y,w,h){
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
        this.vy = 0;
        this.ay = -2;
        this.isGround = true
        this.isAlive = true

        this.baseImage.src = ("../images/character_stand.png")
        this.diedImage.src = ("../images/character_2.png")
    }
    draw(ctx){
       ctx.drawImage(this.isAlive ? this.baseImage:this.diedImage,this.x,SKY_HEIGHT - this.height - this.y,this.width,this.height);
    }

    jump(){
    if (this.isGround) {
        this.isGround = false
        this.vy = 30;
        this.jumpSound.play();
    }
}

    update(){
    if(this.isGround)return;
        this.vy += this.ay;
        this.y += this.vy;

    if(this.y < 0){
        this.vy = 0;
        this.y = 0
        this.isGround = true;
        this.jumpSound.pause();
        this.jumpSound.currentTime = 0;
    
    }
}

    hit(){
        this.isAlive = false;
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
const GAME_STATE_INGAME = 1;
const GAME_STATE_GAMEOVER = 2;

// 画面幅・高さの定義
const CANVAS_WIDTH = 500;
const CANVAS_HEIGHT = 500;
const GROUND_HEIGHT = 150;
const SKY_HEIGHT = CANVAS_HEIGHT - GROUND_HEIGHT;
const CHARACTER_WIDTH = 85;
const CHARACTER_HEIGHT = 60;
const GROUND_POS = SKY_HEIGHT - CHARACTER_HEIGHT 
// 色の定義
const COLOR_SKY = "#8adaff";
const COLOR_GROUND = "#7eff5e";
const COLOR_CLEAR = "#ffffff";
const COLOR_OBSTACLE = "rgb(255, 219, 15)"
const SPEED = 20.0;
const SCROLL_SPEED=2.0;


let frame = 0;
let gamestate = GAME_STATE_TITLE;
let x = 0;
let y = GROUND_POS; 
const player = new Player(0,0,CHARACTER_HEIGHT,CHARACTER_HEIGHT);

const obstacles = [
    new Obstacle(550,0,20,35),
    new Obstacle(850,0,20,35),
    new Obstacle(1150,0,20,35),
    new Obstacle(1450,0,20,35),
    new Obstacle(1750,0,20,35),
];



function tick() {
    if (gamestate === GAME_STATE_TITLE){
        ctx.fillStyle = COLOR_SKY;
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // 地面の描画
        ctx.fillStyle = COLOR_GROUND;
        ctx.fillRect(0, SKY_HEIGHT, CANVAS_WIDTH, GROUND_HEIGHT);
    }
    else if (gamestate === GAME_STATE_INGAME){
       frame++;
       //x = (x + frame / 100) % CANVAS_WIDTH;

       player.update();
       // 再描画のリクエスト

       // (x: 0, y: 0) から画面サイズの四角形で塗りつぶし
       ctx.fillStyle = COLOR_SKY;
       ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

       // 地面の描画
       ctx.fillStyle = COLOR_GROUND;
       ctx.fillRect(0, SKY_HEIGHT, CANVAS_WIDTH, GROUND_HEIGHT);
    
       player.draw(ctx);


     for(const obstacle of obstacles){
      obstacle.x -= SCROLL_SPEED;
      obstacle.draw(ctx);
      if (player.checkCollision(obstacle)){
        console.log("ぶつかった！");
        player.hit();
        player.draw(ctx)
        return

      }
    }
    }
    // キャラクター画像の描画
   //
   
    requestAnimationFrame(tick);
}



// 初期描画のリクエスト
requestAnimationFrame(tick)

window.addEventListener("keydown",(e) => {
   if (gamestate === GAME_STATE_TITLE){
    if(e.key == " "){
        gamestate =GAME_STATE_INGAME;
    }
   } else if(gamestate === GAME_STATE_INGAME){
       if(e.key == "ArrowRight"){
        player.x += SPEED
   }

   if(e.key == "ArrowLeft"){
        player.x -= SPEED
   }

   if(e.key == "ArrowUp")
        player.jump();}


} );


