const canvas = document.getElementById("MainCanvas");
const ctx = canvas.getContext("2d");

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
ctx.fillStyle = "#ff0000";
ctx.fillRect(0, 0, 500, 500);
let frame = 0;
function tick() {
    frame++;

    ctx.fillStyle = "#ff0000";
    ctx.fillRect(0, 0, 500, 500);

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(frame/2, 450, 50, 50);

    requestAnimationFrame(tick);
}
requestAnimationFrame(tick)