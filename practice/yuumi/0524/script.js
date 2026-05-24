const canvas = document.getElementById("mainCanvas");
const ctx = canvas.getContext("2d");
const character = new Image();
character.src = "../images/BlobStand.png";
const SPEED = 4.0;
const THEGROUND = 400 - 51 + 8;


let frame = 0;
let x = 5;
let y = 400 - 51 + 8;
let vy = 0; //y方向の速度
let ay = 2; //y方向の加速度
let isGround = true;

//無限ループたち
function tick(){
    frame++;
    // x = (x + frame / 50) % 500;

    ctx.fillStyle = "#1a5585"
    ctx.fillRect(0, 0, 500, 400)

    ctx.fillStyle = "#256d17"
    ctx.fillRect(0, 400, 500, 100)

    ctx.drawImage(character, x, y, 75, 51);

    playerUpdate();

    requestAnimationFrame(tick);
}

requestAnimationFrame(tick)

//キー押されてるかな？てやつ
window.addEventListener("keydown", (e) => {
    if(e.key == "ArrowRight"){
        character.src = "../images/BlobStand.png";
        x += SPEED
    }

    if(e.key == "ArrowLeft"){
        character.src = "../images/BlobStandBack.png";
        x -= SPEED
    }
    if (e.key == "ArrowUp"){
        jump();
    }
    
});
//押されたらこうしてねーっていう範囲の中に動きを指定しないと動いてくれない

//jsはfunctionなら呼び出した後に定義書いても大丈夫

//jump定義
function jump() {
    if (isGround) {
        isGround = false
        vy = -25;

    }
}

//player情報更新定義
function playerUpdate(){
    if (isGround) return; //地面ついてたらすることないので帰ってください
    vy += ay;
    y += vy;
    
    if(y > THEGROUND){
        vy - 0;
        y = THEGROUND;
        isGround = true
    }
}

//よく出てくる数とか色は名前がついてたほうがわかりやすい

//character width and height とおくとわかりやすい
