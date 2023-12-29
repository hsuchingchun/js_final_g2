let screen = 0;
var y = -20;
var x = 200;
var speed = 2;
var score = 0;
//圖片變數
let gate2;
let gate2bg;
let instruction;
let info;
let menu;
let allDish;
let player1;
let envelope;
let gold;
let silver;
let blackHand;

let totalCost = 1000;

function preload() {
  gate2 = loadImage("../assets/Gate2/背景/Gate2背景(+物件).png");
  gate2bg = loadImage("../assets/Gate2/背景/背景藍灰漸層.png");

  instruction = loadImage("../assets/Gate2/遊戲說明/資產 2.png");
  info = loadImage("../assets/Gate2/遊戲說明/遊戲說明.png");
  menu = loadImage("../assets/Gate2/菜單/菜單按鈕.png");
  allDish = loadImage("../assets/Gate2/菜單/菜單選取.png");
  player1 = loadImage("../assets/主角/玩家狀態二.png");

  envelope = loadImage("../assets/Gate2/關卡/薪資袋.png");
  gold = loadImage("../assets/Gate2/關卡/金色錢幣.png");
  silver = loadImage("../assets/Gate2/關卡/銀色錢幣.png");
  blackHand = loadImage("../assets/Gate2/關卡/黑手.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(LEFT, TOP);
  textFont("Auraka點陣宋");
}

function draw() {
  gameOn();
}

function gameOn() {
  imageMode(CENTER);
  //背景圖
  image(
    gate2,
    windowWidth / 2,
    windowHeight / 2,
    windowWidth * 1.06,
    gate2.height / 5
  );

  image(
    player1,
    mouseX,
    windowHeight / 2 + 150,
    player1.width / 5,
    player1.height / 5
  );
  image(
    envelope,
    mouseX,
    windowHeight / 2 + 200,
    envelope.width / 5,
    envelope.height / 5
  );

  fill("white");
  textSize(18);
  text(`伙食費：${totalCost}`, 20, windowHeight / 2 + 100);
  text(`目前薪資：`, 20, windowHeight / 2 + 130);
  ellipse(x, y, 20, 20);
  rectMode(CENTER);
  //   rect(mouseX, height - 10, 50, 30);
  y += speed;
  if (y > height) {
    screen = 0;
  }
  if (y > height - 10 && x > mouseX - 20 && x < mouseX + 20) {
    y = -20;
    speed += 0.5;
    score += 1;
  }
  if (y == -20) {
    pickRandom();
  }
}

function pickRandom() {
  x = random(20, width - 20);
}

//----------------------Step3 End ----------------------------------------------------------

function endScreen() {
  background(150);
  textAlign(CENTER);
  text("GAME OVER", width / 2, height / 2);
  text("SCORE = " + score, width / 2, height / 2 + 20);
  text("click to play again", width / 2, height / 2 + 40);
}
