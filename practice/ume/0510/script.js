const canvas = document.getElementById("mainCanvas");
const ctx = canvas.getContext("2d");

ctx.fillStyle = "#4a4066";
ctx.fillRect(0,0,500,500);

ctx.fillStyle = "#ffffff";
ctx.fillRect(10,10,20,20);

ctx.fillStyle = "#ffffff";
ctx.fillRect(40,10,20,20);

ctx.fillStyle = "#ffffff";
ctx.fillRect(10,50,20,20);

ctx.fillStyle = "#ffffff";
ctx.fillRect(40,50,20,20);

let frame = 0;
function tick() {
    frame++;
    ctx.fillStyle = "#4a4066";
    ctx.fillRect(0,0,500,500);
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(frame/2,450,40,40);

    requestAnimationFrame(tick);
}

requestAnimationFrame(tick)