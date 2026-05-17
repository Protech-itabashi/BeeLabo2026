const canvas = document.getElementById("mainCanvas");
const ctx = canvas.getContext("2d");

ctx.fillStyle = "#1a5585"
ctx.fillRect(0, 0, 500, 500);

ctx.fillStyle = "#000000"
ctx.fillRect(98, 98, 274, 154);
ctx.fillRect(105, 154, 10, 300)

ctx.fillStyle = "#1a5585"
ctx.fillRect(100, 100, 270, 150)

ctx.fillStyle = "#ffffff"
//for (let i = 1; i < 3; i++){
//    ctx.fillRect(100*i, 100, 50, 50)
//    ctx.fillRect(100, 100*i, 50, 50)
//    ctx.fillRect(100*i, 100*i, 50, 50)
//}
ctx.fillRect(100, 100, 70, 50);
ctx.fillRect(100, 200, 70, 50);
ctx.fillRect(220, 200, 150, 50);
ctx.fillRect(220, 100, 150, 50);

let frame = 0;
function tick(){
    frame++;
    ctx.fillStyle = "#1a5585"
    ctx.fillRect(0, 450, 500, 50);

    ctx.fillStyle = "#399ff0"
    ctx.fillRect(frame/3, 450, 50, 50);

    requestAnimationFrame(tick);
}

requestAnimationFrame(tick)