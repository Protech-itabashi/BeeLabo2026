// 1行コメント

/*
    複数行
    コメント
*/

/*
    変数定義
    let 変数名;

    変数定義＋初期化
    let 変数名 = 初期値;
*/
let variable1; // undefined
let variable2 = 10;

console.log(variable1);

/*
    定数定義 (初期化必須)
    const 定数名 = 初期値;
*/
const constant1 = 12;

/*
    文字出力関数
    console.log(表示したいもの)

    表示したいものは変数でも式でも良い
*/
console.log(constant1) // 12
console.log("Hello, world!") // Hello, world!

let message = "こんにちは";
console.log(message); // こんにちは

/*
    データ型
    
    プリミティブ型:
        Number: 数字，整数・少数問わず
            例: 10, 20, 30, 0.1, 0.5, -2
        String: 文字列
            例: "aiueo", 'Hello', `protech`
        Boolean: 真偽値
            例: true，false
        null: null
        undefined: 未定義の値
    オブジェクト型:
        Array: 配列型，連続して複数のプリミティブ型またはオブジェクト型の値を持つ
               要素にアクセスするときは 配列変数[アクセスする要素の番号] の形で使用する
            例: [0, 1, 2, 3, 4], ["I", "have", "a", "pen"], [true, false, undefined, null], [[0, 0, 1], [1, 0, 0]]
            　  const array = ["I", "have", "a", "pen", "."]
                array[0] // "I"
                array[2] // "a"
        Object: オブジェクト型（Pythonでいう辞書型），キー・値のペアでデータを持つ
                値にアクセスするときは オブジェクト変数.キー名 または オブジェクト変数["キー名"] の形で使用する
                いわゆるJSONと呼ばれるものとほとんど同じ
            例: {id: 0, name: "Taro", age: 20}
                const user = {
                    id: 0,
                    name: "Taro",
                    age: 20,
                }
                user.id // 0
                user.name // Taro
                user["age"] // 20
        
    
*/
const num = 1234;
const str = "Protech";
const cond = false;
const nul = null;
let undef;
const arr = [5, 6, 7];
const obj = {
    id: 0,
    name: "Yamada",
    nums: arr, // 配列を値として持つこともできる
    items: { // オブジェクトを値として持つこともできる
        itemNum: 20,
    }
}


console.log(str) // Protech
console.log(undef) // undefined
console.log(arr[1]) // 6
console.log(obj.items.itemNum) // 20
obj.items.itemNum = 30
console.log(obj.items.itemNum) // 30

/*
    数値型の四則演算
    +: 加算（+）
    -: 減算（-）
    *: 乗算（×）
    /: 除算（÷）

    演算順序の括弧も使える
    const s = (1 + 2) * 3     // 9
*/
const a = 1 + 2 * 3 / 4
const b = a * 5

/*
    文字列の足し算
    文字列では特別に足し算が可能

    const s = "Hello" + "world!" // "Helloworld!"
*/
const s = "Hello, " + "world!"

/*
    スコープ (文の塊)
    {}

    この中で定義した変数・定数などはこの括弧の外では使用不可
*/
{
    let i = 10;
    const j = 20;
}

/*
    条件分岐
    スコープの直前に if (条件式) をつけると，そのスコープは条件式が true の時のみ実行される
    そのスコープ直後に else {} を置くと条件が false だった時に実行するスコープを指定できる
    if と else は組み合わせて else if () とすることもできる 
*/
if (num == 10)  {
    console.log("NUM is 10!");
    console.log("NUM is 10!");
    console.log("NUM is 10!");
    console.log("NUM is 10!");
    console.log("NUM is 10!");
    console.log("NUM is 10!");
}

if (num < 10) {
    console.log("NUM < 10!");
} else {
    console.log("NUM >= 10!");
}

if (num % 15 == 0) {
    console.log("NUM % 15 == 0");
} else if (num % 3 == 0) {
    console.log("NUM % 3 == 0");
} else {
    console.log("OTHER");
}

/*
    繰り返し処理
    あらかじめ回数が分かる場合: for文
    終了条件が決まっている場合: while文

    for (let 変数名 = 初期値; 継続条件; 変数処理) {}
    
        例:
        for (let i = 0; i < 5; i++) {
            console.log(i); // 0 1 2 3 4
        }
    
    while (条件式) {}

    どちらも break; で途中でループを抜けることができ，
    continue で次のループに飛ぶことができる

    for (let i = 0; i < 10; i++) {
        if (i % 2 == 0) continue;
        if (i > 5) break;

        console.log(i); // 1 3 5
    }
*/
for (let i = 0; i < 10; i++) {
    console.log(i);
}

let count = 10;
while (count > 0) {
    console.log(count);
    count--
}

/*
    関数定義
    スコープに名前を与えて再利用できるようにする
    その実行に必要な変数を与えたり，実行結果の値を返却することができる
    前者を引数，後者を戻り値と呼ぶ
    どちらとも必要ない場合は省略することができる
    定義するのみでは何も実行されない

    function 関数名(引数名1, 引数名2, ...) {
        return 返却値 // 省略可能
    }
    
    定義した関数を呼び出す時には 関数名(引数) とする
    引数は基本的に関数定義時に定義した個数分渡す
*/
function getGreeting(language) {
    if (language == "japanese") {
        return "こんにちは";
    } else {
        return "Hello";
    }
}

const greet = getGreeting("japanese"); // こんにちは

/*
    練習１
    2 ~ 100 の数のうち素数を列挙（出力形式は問わない）
*/