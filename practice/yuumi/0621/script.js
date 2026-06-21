const canvas = document.getElementById("mainCanvas");
const ctx = canvas.getContext("2d");

const character = new Image();
character.src = "../images/BlobStand.png";
const SPEED = 4.0;
const SCROLL_SPEED = 7.0;
const THEGROUND = 400 - 51 + 8;
const PLAYER_WIDTH = 75;
const PLAYER_HEIGHT = 51;
const GROUND_HEIGHT = 410; //キャラクターや障害物のGROUND
const CANVAS_WIDTH = 500;
const CANVAS_HEIGHT = 500;
const CANVASGROUND_HEIGHT = CANVAS_HEIGHT - 400; //見た目のGROUND


class Obstacle {
    x;
    y;
    width;
    height;

    constructor(x, y, w, h){
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
    }

    draw(ctx){
    ctx.fillStyle = "#bd2828"
    ctx.fillRect(this.x, GROUND_HEIGHT - this.height - this.y, this.width, this.height)
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
    isGround;

    jumpSound = new Audio("../sounds/se_jump01.mp3");
    hitSound = new Audio("../sounds/se_collide.mp3");

    constructor(image, x, y, w, h){
        this.image = image;
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
        this.vy = 0;
        this.ay = -2;
        this.isGround = true;
    }

    draw(ctx){
    ctx.drawImage(this.image, this.x, GROUND_HEIGHT - this.height - this.y, this.width, this.height)
    }

    //jump定義
    jump() {
        if (this.isGround) {
          this.isGround = false
          this.vy = 25;
          this.jumpSound.play();
      }
    }

    //player情報更新定義
    update(){
        if (this.isGround) return; //地面ついてたらすることないので帰ってください
        this.vy += this.ay;
        this.y += this.vy;
    
        if(this.y < 0){
            this.vy = 0;
            this.y = 0;
            this.isGround = true
            this.jumpSound.pause();
            this.jumpSound.currentTime = 0;
        }
    }

    hit(){
        character.src = "../images/BlobCollide.png";
        this.hitSound.play();
    }
    //当たり判定
    checkCollision(obstacle){
        return !(
            this.x + this.width < obstacle.x ||
            this.x > obstacle.x + obstacle.width ||
            this.y - this.height > obstacle.y ||
            this.y < obstacle.y - obstacle.height
        )
    }
    //  || = 又は, && = かつ
}

// let x = 5;
// let y = 400 - 51 + 8;
// let vy = 0; //y方向の速度
// let ay = 2; //y方向の加速度

const player = new Player(character, 0, 0, PLAYER_WIDTH, PLAYER_HEIGHT)

let frame = 0;

const obstacles = [
    new Obstacle(500, 0, 30, 50),
    new Obstacle(800, 0, 30, 50),
];


//無限ループたち
function tick(){
    frame++;
    // x = (x + frame / 50) % 500;

    player.update();


    ctx.fillStyle = "#1a5585"
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

    ctx.fillStyle = "#256d17"
    ctx.fillRect(0, 400, CANVAS_WIDTH, CANVASGROUND_HEIGHT)


    player.draw(ctx);
    // ctx.drawImage(character, x, y, 75, 51);

     for(const obstacle of obstacles){
        obstacle.x -= SCROLL_SPEED;
        obstacle.draw(ctx);
        
        if (player.checkCollision(obstacle)) {
            console.log("atateruyo!");
            player.hit();
            return;
        }
    }
    

    requestAnimationFrame(tick);
}

requestAnimationFrame(tick)


//キー押されてるかな？てやつ
window.addEventListener("keydown", (e) => {
    if(e.key == "ArrowRight"){
        character.src = "../images/BlobStand.png";
        player.x += SPEED
    }

    if(e.key == "ArrowLeft"){
        character.src = "../images/BlobStandBack.png";
        player.x -= SPEED
    }
    if (e.key == "ArrowUp"){
        player.jump();
    }
    
});
//押されたらこうしてねーっていう範囲の中に動きを指定しないと動いてくれない
//jsはfunctionなら呼び出した後に定義書いても大丈夫



//クラスの頭文字は大文字、コンストラクター（const）の頭文字は小文字にすることが多い
//よく出てくる数とか色は名前がついてたほうがわかりやすい
//character width and height とおくとわかりやすい