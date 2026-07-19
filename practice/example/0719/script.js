const canvas = document.getElementById("mainCanvas");
const ctx = canvas.getContext("2d");

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

// 障害物クラス
class Obstacle {
    x;
    y;
    width;
    height;

    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
    }

    // 障害物の描画
    draw(ctx) {
        ctx.fillStyle = COLOR_OBSTACLE;
        ctx.fillRect(this.x, SKY_HEIGHT - this.height - this.y, this.width, this.height);
    }
}

// プレイヤークラス
class Player {
    x;
    y;
    width;
    height;
    vy;
    ay;
    isGround;
    isAlive;

    // 効果音の読み込み
    jumpSound = new Audio("../sounds/se_jump.mp3");
    hitSound = new Audio("../sounds/se_hit.mp3");

    // キャラクタ画像の読み込み
    baseImage = new Image();
    diedImage = new Image();

    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
        this.vy = 0;
        this.ay = GRAVITY;
        this.isGround = true;
        this.isAlive = true;

        this.baseImage.src = "../images/character_stand.png";
        this.diedImage.src = "../images/character_died.png";
    }

    // プレイヤーの描画
    draw(ctx) {
        ctx.drawImage(this.isAlive ? this.baseImage : this.diedImage, this.x, SKY_HEIGHT - this.height - this.y, this.width, this.height);
    }

    // ジャンプ
    jump() {
        // 地面についてるなら
        if (this.isGround) {
            this.isGround = false // 地面から離す
            this.vy = 30; // 初速度を与える
            this.jumpSound.play();
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
            this.jumpSound.pause();
            this.jumpSound.currentTime = 0;
        }
    }

    hit() {
        this.isAlive = false;
        this.hitSound.play();
    }

    checkCollision(obstacle) {
        return !(
            this.x + this.width < obstacle.x ||
            this.x > obstacle.x + obstacle.width ||
            this.y - this.height > obstacle.y ||
            this.y < obstacle.y - obstacle.height
        )
    }
}

// ゲームの状態の定義
const GAME_STATE_TITLE = 0;
const GAME_STATE_INGAME = 1;
const GAME_STATE_GAMEOVER = 2;

// 画面幅・高さの定義
const CANVAS_WIDTH = 500;
const CANVAS_HEIGHT = 500;
const GROUND_HEIGHT = 150;
const CHARACTER_WIDTH = 85;
const CHARACTER_HEIGHT = 60;
const MIN_OBSTACLE_WIDTH = 20;
const MAX_OBSTACLE_WIDTH = 40;
const SKY_HEIGHT = CANVAS_HEIGHT - GROUND_HEIGHT;
const GROUND_POS = SKY_HEIGHT - CHARACTER_HEIGHT;

// 色の定義
const COLOR_SKY = "#8adaff";
const COLOR_GROUND = "#7eff5e";
const COLOR_CLEAR = "#ffffff";
const COLOR_OBSTACLE = "#ba2f2f"

// 速度系定数の定義
const MOVE_SPEED = 2.0;
const GRAVITY = -2.0;
const MIN_INTERVAL = 300;
const MAX_INTERVAL = 500;


// 横移動の速度
const SPEED = 5.0;
const SCROLL_SPEED = 10.0;

// プレイヤー情報
const player = new Player(0, 0, CHARACTER_WIDTH, CHARACTER_HEIGHT);
let frame = 0;
let gameState = GAME_STATE_TITLE;
let distance = 0;

const obstacles = [
    new Obstacle(550, 0, 25, 65),
    new Obstacle(1050, 0, 25, 65),
    new Obstacle(1450, 0, 50, 65),
    new Obstacle(1950, 0, 50, 65),
];

function tick() {
    if (gameState === GAME_STATE_TITLE) {
        // (x: 0, y: 0) から画面サイズの四角形で塗りつぶし
        ctx.fillStyle = COLOR_SKY;
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        // 地面の描画
        ctx.fillStyle = COLOR_GROUND;
        ctx.fillRect(0, SKY_HEIGHT, CANVAS_WIDTH, GROUND_HEIGHT)
    } else if (gameState === GAME_STATE_INGAME) {
        // フレームのカウント
        frame++;
        distance += SCROLL_SPEED;

        // プレイヤーの情報を更新
        player.update();

        // (x: 0, y: 0) から画面サイズの四角形で塗りつぶし
        ctx.fillStyle = COLOR_SKY;
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        // 地面の描画
        ctx.fillStyle = COLOR_GROUND;
        ctx.fillRect(0, SKY_HEIGHT, CANVAS_WIDTH, GROUND_HEIGHT);

        // キャラクター画像の描画
        player.draw(ctx);

        // 障害物の描画
        for (const obstacle of obstacles) {
            obstacle.x -= SCROLL_SPEED;
            obstacle.draw(ctx);

            // 障害物との衝突判定
            if (player.checkCollision(obstacle)) {
                console.log(
                    player,
                    obstacle
                )
                player.hit();
                // alert("ぶつかった！");
                player.draw(ctx)
                return;
            }
        }
        ctx.fillStyle = "#000000"
        ctx.fillText(`${distance} cm`, 20, 20);

        for (let i = 0; i < obstacles.length; i++) {
            // 画面外に出た障害物の排除
            if (obstacles[i].x + obstacles[i].width < 0) {
                obstacles.splice(i, 1); // 配列のi番目を削除
            
                // 新しい障害物の追加
                obstacles.push(new Obstacle(
                    getRandomArbitrary(
                        obstacles[obstacles.length-1].x + MIN_INTERVAL,
                        obstacles[obstacles.length-1].x + MAX_INTERVAL
                    ), // X座標
                    0, // Y座標
                    getRandomArbitrary(
                        MIN_OBSTACLE_WIDTH,
                        MAX_OBSTACLE_WIDTH
                    ),  // 幅
                    50, // 高さ
                ));
            }
        }
    }

    // 再描画のリクエスト
    requestAnimationFrame(tick);
}

// 初期描画のリクエスト
requestAnimationFrame(tick)

// キーボード操作
window.addEventListener("keydown", (e) => {
    console.log(e.key)
    if (gameState === GAME_STATE_TITLE) {
        if (e.key == " " || e.key == "Enter") {
            gameState = GAME_STATE_INGAME;
            console.log("gameState: ", gameState)
        }
    } else if (gameState === GAME_STATE_INGAME) {
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
    }
});


