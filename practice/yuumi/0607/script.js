const canvas = document.getElementById("mainCanvas");
const ctx = canvas.getContext("2d");
const character = new Image();
character.src = "../images/BlobStand.png";
const SPEED = 4.0;
const SCROLL_SPEED = 7.0;
const THEGROUND = 400 - 51 + 8;


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
    ctx.fillRect(this.x, 410 - this.height - this.y, this.width, this.height)
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
    ctx.drawImage(this.image, this.x, 410 - this.height - this.y, this.width, this.height)
    }

    //jump定義
    jump() {
        if (this.isGround) {
          this.isGround = false
          this.vy = 25;
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
        }
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
const player = new Player(character, 0, 0, 75, 51)
// let vy = 0; //y方向の速度
// let ay = 2; //y方向の加速度

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
    ctx.fillRect(0, 0, 500, 400)

    ctx.fillStyle = "#256d17"
    ctx.fillRect(0, 400, 500, 100)


    player.draw(ctx);
    // ctx.drawImage(character, x, y, 75, 51);

     for(const obstacle of obstacles){
        obstacle.x -= SCROLL_SPEED;
        obstacle.draw(ctx);
        
        if (player.checkCollision(obstacle)) {
            console.log("atateruyo!");
            return
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




//よく出てくる数とか色は名前がついてたほうがわかりやすい
//character width and height とおくとわかりやすい