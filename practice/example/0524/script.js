const canvas = document.getElementById("mainCanvas");
const ctx = canvas.getContext("2d");

// キャラクター画像の定義
const character = new Image();
character.src = "../images/character_stand.png";

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


let frame = 0;
let x = 0; // プレイヤーのX座標
let y = GROUND_POS; // プレイヤーのY座標
let vy = 0; // プレイヤーのY方向の速度
let ay = 2; // プレイヤーのY方向の加速度
let isGround = true; // プレイヤーが地面に立ってるか

function tick() {
    frame++;
    // x = (x + frame / 100) % CANVAS_WIDTH;

    // (x: 0, y: 0) から画面サイズの四角形で塗りつぶし
    ctx.fillStyle = COLOR_SKY;
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // 地面の描画
    ctx.fillStyle = COLOR_GROUND;
    ctx.fillRect(0, SKY_HEIGHT, CANVAS_WIDTH, GROUND_HEIGHT);

    // キャラクター画像の描画
    ctx.drawImage(character, x, y, CHARACTER_WIDTH, CHARACTER_HEIGHT);

    // プレイヤーの情報を更新
    playerUpdate();

    // 再描画のリクエスト
    requestAnimationFrame(tick);
}

// 初期描画のリクエスト
requestAnimationFrame(tick)

// キーボード操作
window.addEventListener("keydown", (e) => {
    // 右移動
    if (e.key == "ArrowRight") {
        x += SPEED
    }

    // 左移動
    if (e.key == "ArrowLeft") {
        x -= SPEED
        
    } 
    
    // ジャンプ
    if (e.key == "ArrowUp") {
        jump();
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

// ジャンプをする
function jump() {
    // 地面についてるなら
    if (isGround) {
        isGround = false // 地面から離す
        vy = -30; // 初速度を与える
    }

    // if (player.isGround) {
    //     player.isGround = false
    //     player.vel.y = -10
    // }
}

// プレイヤーの情報を更新
function playerUpdate() {
    // もし地面についていたら何もしない
    if (isGround) return;

    // Y座標・速度を変化させる
    vy += ay;
    y += vy;

    // 地面についたら終わり
    if (y > GROUND_POS) {
        vy = 0;
        y = GROUND_POS;
        isGround = true;
    }

    // if (player.isGround) return;

    // player.vel.y += player.accel;
    // player.pos.y += player.vel.y;

    // if (player.pos.y > GROUND_POS) {
    //     player.pos.y = GROUND_POS;
    //     player.vel.y = 0
    //     player.isGround = true;
    // }
}