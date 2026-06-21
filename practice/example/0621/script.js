const canvas = document.getElementById("mainCanvas");
const ctx = canvas.getContext("2d");

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
    image;
    x;
    y;
    width;
    height;
    vy;
    ay;
    isGround;

    constructor(image, x, y, w, h) {
        this.image = image;
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
        this.vy = 0;
        this.ay = GRAVITY;
        this.isGround = true;
    }

    // プレイヤーの描画
    draw(ctx) {
        ctx.drawImage(this.image, this.x, SKY_HEIGHT - this.height - this.y, this.width, this.height);
    }

    // ジャンプ
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

    checkCollision(obstacle) {
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
const COLOR_OBSTACLE = "#ba2f2f"

// 速度系定数の定義
const MOVE_SPEED = 2.0;
const GRAVITY = -2.0;

// 横移動の速度
const SPEED = 5.0;
const SCROLL_SPEED = 10.0;

// プレイヤー情報
const player = new Player(character, 0, 0, CHARACTER_WIDTH, CHARACTER_HEIGHT);
let frame = 0;

const obstacles = [
    new Obstacle(550, 0, 25, 65),
    new Obstacle(1050, 0, 25, 65),
    new Obstacle(1450, 0, 50, 65),
    new Obstacle(1950, 0, 50, 65),
];

function tick() {
    // フレームのカウント
    frame++;

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
});


