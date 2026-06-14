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
        ctx.fillStyle =  "#ff0000"
        ctx.fillRect(this.x, SKY_HEIGHT - this.height - this.y, this.width, this.height);

    }
}

class Player {
    image;
    x;
    y;
    width;
    height;
    vy;
    ay;
    isGround

    constructor(image, x,y,w,h){
        this.image = image
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
        this.vy = 0;
        this.ay = -2;
        this.isGround = true;
    }

    draw(ctx){
        ctx.drawImage(this.image, this.x, SKY_HEIGHT-this.height-this.y, this.width, this.height);

    }
     jump() {
    // 地面についてるなら
        if (this.isGround) {
            this.isGround = false // 地面から離す
            this.vy = 30; // 初速度を与える

        }
    }
    
    update() {
    // もし地面についていたら何もしない
        if (this.isGround) return;

    // Y座標・速度を変化させる
        this.vy += this.ay;
        this.y += this.vy;

    // 地面についたら終わり
        if (this.y < 0) {
            this.vy = 0;
            this.y = 0;
            this.isGround = true;
        }
    
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
// キャラクター画像の定義
const character = new Image();
character.src = "../images/bouhuman.png";

// 画面幅・高さの定義
const CANVAS_WIDTH = 500;
const CANVAS_HEIGHT = 500;
const GROUND_HEIGHT = 150;
const CHARACTER_WIDTH = 85;
const CHARACTER_HEIGHT = 60;
const SKY_HEIGHT = CANVAS_HEIGHT - GROUND_HEIGHT;
const GROUND_POS = SKY_HEIGHT - CHARACTER_HEIGHT;

// 色の定義
const COLOR_SKY = "#8adaff";
const COLOR_GROUND = "#7eff5e";
const COLOR_CLEAR = "#ffffff";

// 速度系定数の定義
const MOVE_SPEED = 2.0;
const GRAVITY = 0.375;

// 横移動の速度
const SPEED = 5.0;
const SCROLL_SPEED = 10.0;

// プレイヤー座標の定義
// const player = {
//     pos: {
//         x: 0,
//         y: GROUND_POS,
//     },
//     vel: {
//         x: 0,
//         y: 0,
//     },
//     accel: GRAVITY,
//     isGround: true,
// };
const player = new Player(character, 0, 0, CHARACTER_WIDTH, CHARACTER_HEIGHT)

const obstacles = [
    new Obstacle(250, 0, 50, 75),
    new Obstacle(550, 0, 50, 75),
    new Obstacle(750, 0, 50, 75),
    new Obstacle(950, 0, 50, 75),
];





//let x = 0; // プレイヤーのX座標
//let y = GROUND_POS; // プレイヤーのY座標
 // プレイヤーのY方向の加速度
 // プレイヤーが地面に立ってるか
let frame = 0;
function tick() {
    frame++;
    // x = (x + frame / 100) % CANVAS_WIDTH;

    // プレイヤーの情報を更新
    player.update();

    // (x: 0, y: 0) から画面サイズの四角形で塗りつぶし
    ctx.fillStyle = COLOR_SKY;
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // 地面の描画
    ctx.fillStyle = COLOR_GROUND;
    ctx.fillRect(0, SKY_HEIGHT, CANVAS_WIDTH, GROUND_HEIGHT);

    player.draw(ctx);
    
  

    // キャラクター画像の描画
    

    for (const obstacle of obstacles){
        obstacle.x-= SCROLL_SPEED;
        obstacle.draw(ctx);

    if (player.checkCollision(obstacle)){
        console.log(
            player, 
            obstacle
        )
        return
        // alert("ぶつかった！");
    }
}
    



    // 再描画のリクエスト
    requestAnimationFrame(tick);
}

// 初期描画のリクエスト
requestAnimationFrame(tick)

// キーボード操作
window.addEventListener("keydown", (e) => {
    // 右移動
    if (e.key == "ArrowRight") {
        player.x += SPEED
    }

    // 左移動
    if (e.key == "ArrowLeft") {
        player.x -= SPEED
        
    } 
    
    // ジャンプ
    if (e.key == "ArrowUp") {
        player.jump();
    }


    // switch (e.key) {
    //     case "ArrowRight":
    //         player.pos.x += MOVE_SPEED;
    //         break;
    //     case "ArrowLeft":
    //         player.pos.x -= MOVE_SPEED;
    //         break;
    //     case "ArrowUp":
    //         jump();
    //         console.log(player)
    //         break;
    // }
});


//  ジャンプをする

    

    // if (player.isGround) {
    //     player.isGround = false
    //     player.vel.y = -10
    // }


// プレイヤーの情報を更新

    // if (player.isGround) return;

    // player.vel.y += player.accel;
    // player.pos.y += player.vel.y;

    // if (player.pos.y > GROUND_POS) {
    //     player.pos.y = GROUND_POS;
    //     player.vel.y = 0
    //     player.isGround = true;
    // }
