const canvas = document.getElementById("mainCanvas");
const ctx = canvas.getContext("2d");

// 塗りつぶしの色を #FF0000 = 赤 にセット
ctx.fillStyle = "#11e457";

// (x: 0, y: 0) から 500px × 500px の四角形で塗りつぶし
ctx.fillRect(0, 0, 500, 500);

// 塗りつぶし色を白に
ctx.fillStyle = "#ffffff"
// ctx.fillRect(100, 100, 100, 100); // 左上
// ctx.fillRect(300, 100, 100, 100); // 右上
// ctx.fillRect(100, 300, 100, 100); // 左下
// ctx.fillRect(300, 300, 100, 100); // 右下

let frame = 0;
function tick() {
    frame++;

    // 前の画面を塗りつぶして上書き
    // ctx.fillStyle = "#ff0000";
    // ctx.fillRect(0, 0, 500, 500);
    // 動く四角形の描画
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(frame/2, 450, 50, 50);

    requestAnimationFrame(tick);
}

requestAnimationFrame(tick)