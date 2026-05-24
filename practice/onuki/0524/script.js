const canvas = document.getElementById("MainCanvas");
const ctx = canvas.getContext("2d");
const cahractar_x = 90
const cahractar_y = 75
const cahractarspeed = 10
const cahractar = new Image();
cahractar.src = "../images/karby.png"
//ctx.fillStyle = "#542000";
//ctx.fillRect(0, 0, 500, 500);
//ctx.fillStyle = "#ffffff";
//ctx.fillRect(10, 10, 50, 50);
//ctx.fillStyle = "#ffffff";
//ctx.fillRect(440, 10, 50, 50);
//ctx.fillStyle = "#ffffff";
//ctx.fillRect(10, 440, 50, 50);
//ctx.fillStyle = "#ffffff";
//ctx.fillRect(440, 440, 50, 50);
let frame = 0;
let X = 0
let Y = 325
let vy = 0 //yのデフォルトの速度
let ay = 2 //yの加速度
let isGround = true;//キャラが地面にいるか
function tick(){
    frame++;
    // X = (X + frame/100) % 500;
    ctx.fillStyle = "#47f9ff";
    ctx.fillRect(0, 0, 500, 500);
    ctx.fillStyle = "#00ff37";
    ctx.fillRect(0, 400, 500, 500);

    ctx.drawImage(cahractar, X, Y, 90, 75);

    playreUpdate();
    requestAnimationFrame(tick)

}

requestAnimationFrame(tick)


window.addEventListener("keydown",(e) => {
    if(e.key == "ArrowRight"){
         X += cahractarspeed
    }
    if(e.key == "ArrowLeft"){
         X -= cahractarspeed
    }
    if(e.key == "ArrowUp"){
        jump();
    }

});
function jump(){
    if(isGround){
        isGround = false
        vy = -32//初速度を与える
    }
}
function playreUpdate(){
    if(isGround) return;
    vy += ay;
    Y += vy;

    if(Y > 325){
        yv = 0;
        Y = 325
        isGround = true;
    }

}