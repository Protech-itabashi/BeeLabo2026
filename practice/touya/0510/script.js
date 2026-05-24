const canvas = document.getElementById("mainCanvas")
const ctx = canvas.getContext("2d");

let frame = 0;
function tick(){
    frame++

ctx.fillStyle = "#ff0000";
ctx.fillRect(0,0,500,500);

ctx.fillStyle = "#ffffff";
ctx.fillRect(frame/2,450,50,50);

//ctx.fillStyle = "#ffffff";
//ctx.fillRect(300,100,50,50);

// ctx.fillStyle = "#ffffff";
// ctx.fillRect(100,300,50,50);

// ctx.fillStyle = "#ffffff";
// ctx.fillRect(100,100,50,50);


    requestAnimationFrame(tick);
}
requestAnimationFrame(tick)