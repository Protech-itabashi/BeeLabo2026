const canvas = document.getElementById("mainCanvas");
const ctx = canvas.getContext("2d");

// キャラクター画像の定義
const character = new Image();
character.src = "../images/character_stand.png";

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

const SPEED = 20.0;


let frame = 0;
let x = 0;
let y = GROUND_POS; 
let vy = 0;//速度
let ay = 2;//加速度
let isGround = true;//プレイヤーが地面に立ってるか

function tick() {
    frame++;
    //x = (x + frame / 100) % CANVAS_WIDTH;

    // (x: 0, y: 0) から画面サイズの四角形で塗りつぶし
    ctx.fillStyle = COLOR_SKY;
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // 地面の描画
    ctx.fillStyle = COLOR_GROUND;
    ctx.fillRect(0, SKY_HEIGHT, CANVAS_WIDTH, GROUND_HEIGHT);

    // キャラクター画像の描画
    ctx.drawImage(character, x, y, CHARACTER_WIDTH, CHARACTER_HEIGHT);
    playerUpdate();
    // 再描画のリクエスト
    requestAnimationFrame(tick);
}

// 初期描画のリクエスト
requestAnimationFrame(tick)

window.addEventListener("keydown",(e) => {
   if(e.key == "ArrowRight"){
        x += SPEED
   }

   if(e.key == "ArrowLeft"){
        x -= SPEED
   }

   if(e.key == "ArrowUp")
      jump();

} );


function jump(){
    if (isGround) {
        isGround = false
        vy = -30;
    }
}

function playerUpdate(){

    if(isGround)return;
    vy += ay;
    y += vy;

    if(y > GROUND_POS){
        vy = 0;
        y = GROUND_POS
        isGround = true;
    }



}
