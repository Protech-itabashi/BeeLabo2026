const canvas = document.getElementById("MainCanvas");
const ctx = canvas.getContext("2d");

const cahractar_x = 90
const cahractar_y = 75

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
X = 0
function tick(){
    frame++;
    X = (X + frame/100) % 500;
    ctx.fillStyle = "#47f9ff";
    ctx.fillRect(0, 0, 500, 500);
    ctx.fillStyle = "#00ff37";
    ctx.fillRect(0, 400, 500, 500);

    ctx.drawImage(cahractar, 0, 325, 90, 75);

    requestAnimationFrame(tick)

}

requestAnimationFrame(tick)


