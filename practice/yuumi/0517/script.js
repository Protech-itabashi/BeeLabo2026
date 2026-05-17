const canvas = document.getElementById("mainCanvas");
const ctx = canvas.getContext("2d");
const character = new Image();
character.src = "../images/BlobStand.png";

let frame = 0;
let x = 5;
function tick(){
    frame++;
    x = (x + frame / 50) % 500;

    ctx.fillStyle = "#1a5585"
    ctx.fillRect(0, 0, 500, 400)

    ctx.fillStyle = "#256d17"
    ctx.fillRect(0, 400, 500, 100)

    ctx.drawImage(character, x, 400 - 51 + 8, 75, 51);

    requestAnimationFrame(tick);
}

requestAnimationFrame(tick)



//よく出てくる数とか色は名前がついてたほうがわかりやすい

//character.onload = () => {
//    ctx.drawImage(character, 5, 400 - 51 + 8, 75, 51);
//}

//character width and height とおくとわかりやすい

