const canvas = document.getElementById("mainCanvas")
const ctx = canvas.getContext("2d");

const character = new Image();
character.src = "../images/bouhuman.png";

let frame = 0;
let x = 0;
function tick(){
    frame++
    x = (x + frame / 100) %  500;
 ctx.fillStyle = "#00f7ff";
 ctx.fillRect(0,0,500,500);

 ctx.fillStyle = "#009137";
 ctx.fillRect(0,400,500,500);
     ctx.drawImage(character, x, 320, 80, 80);
requestAnimationFrame(tick);
}
requestAnimationFrame(tick)

//ctx.fillStyle = "#ffffff";
//ctx.fillRect(300,100,50,50);

// ctx.fillStyle = "#ffffff";
// ctx.fillRect(100,300,50,50);

// ctx.fillStyle = "#ffffff";
// ctx.fillRect(100,100,50,50);


