var screen = 0;
var y = -20;
var x = 200;
var speed = 2;
var score = 0;

//圖片變數
let gate2;
let gate2bg;
let instruction;
let menu;
let allDish;

function preload() {
  gate2 = loadImage("../assets/Gate2/背景/Gate2背景(+物件).png");
  gate2bg = loadImage("../assets/Gate2/背景/背景藍灰漸層.png");
  instruction = loadImage("../assets/Gate2/遊戲說明/資產 2.png");
  menu = loadImage("../assets/Gate2/菜單/菜單按鈕.png");
  allDish = loadImage("../assets/Gate2/菜單/菜單選取.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(LEFT, TOP);
  textFont("Auraka點陣宋");
}

function draw() {
  //螢幕場景切換
  if (screen == 0) {
    chooseDish();
    // startScreen();
  } else if (screen == 1) {
    intro();
  } else if (screen == 2) {
    chooseDish();
  }
}

//Step 0 遊戲開始前 startScreen()
let introText = [
  "「我想要到台灣努力工作，賺錢以後要幫忙家裡。」",
  "看著每個月的薪資都拿去還高額的仲介費債務與服務費抽成",
  "薪水還需要寄回家鄉",
  "因此即使每天努力工作仍賺不了錢",
  "為什麼想在台灣過生活這麼難呢？",
];

function startScreen() {
  //放圖片放文字
  background(gate2bg);

  textAlign(CENTER);
  textStyle(BOLD);
  textSize(25);
  text("GAME 2", width / 2, height / 2 - 150);

  textStyle(NORMAL);
  textSize(16);
  text(introText[0], width / 2, height / 2 - 110);

  text(introText[1], width / 2, height / 2 - 80);
  text(introText[2], width / 2, height / 2 - 50);

  text(introText[3], width / 2, height / 2 - 20);
  text(introText[4], width / 2, height / 2 + 10);

  fill("white");
  noStroke();
  rect(windowWidth / 2 - 40, height / 2 + 62, textWidth("START") + 40, 30, 10);

  textStyle(BOLD);
  textSize(20);
  fill("black");
  // noFill();
  // stroke("black");
  text("START", width / 2, height / 2 + 70);

  reset();
}

//Step1 遊戲說明 intro()
function intro() {
  background(gate2bg);
  imageMode(CENTER);
  image(
    instruction,
    windowWidth / 2,
    windowHeight / 2,
    instruction.width / 5.5,
    instruction.height / 5.5
  );
}

//Step2 餐點選擇 chooseDish()
//TODO 各個餐點選擇按鈕
let dish1 = 0;
let buttonInc, buttonDec;
let buttonWidth = 30;
let buttonHeight = 30;

//按鈕變數
let buttons = []; // 存放按鈕的陣列
let buttonCount = 4; // 按鈕數量
// let startX = windowWidth / 2 - 245; // 第一個按鈕的起始 X 座標
// let startY = windowHeight / 2 + 80; // 按鈕的 Y 座標
let buttonSpacing = 50; // 按鈕間距

// 每個按鈕的餐點價格和數量的陣列
let dishInfo = [
  { price: 100, count: 0 },
  { price: 60, count: 0 },
  { price: 80, count: 0 },
  { price: 50, count: 0 },
];

// let totalCost = 0;
let totalCost = dishInfo.reduce((acc, val) => acc + val.count * val.price, 0);

function chooseDish() {
  // background(gate2bg);
  imageMode(CENTER);

  image(
    gate2bg,
    windowWidth / 2,
    windowHeight / 2,
    windowWidth * 1.06,
    gate2bg.height / 5
  );

  image(
    menu,
    windowWidth / 2,
    windowHeight / 2 - 200,
    menu.width / 5,
    menu.height / 5
  );

  image(
    allDish,
    windowWidth / 2,
    windowHeight / 2 - 50,
    allDish.width / 5.5,
    allDish.height / 5.5
  );

  //劃出按鈕
  for (let i = 0; i < buttonCount; i++) {
    buttons.push(createButton("+")); // 創建加號按鈕
    buttons[i].position(
      windowWidth / 2 - 245 + i * buttonSpacing,
      windowHeight / 2 + 80
    ); // 設置按鈕位置
    buttons[i].size(30, 30); // 設置按鈕大小
    buttons[i].mousePressed(() => incrementValue(i)); // 按鈕按下時的操作
  }

  // 創建增加數值的按鈕
  buttonInc = createButton("+");
  buttonInc.position(windowWidth / 2 - 245, windowHeight / 2 + 80);
  buttonInc.size(buttonWidth, buttonHeight);
  buttonInc.mousePressed(incrementValue);

  // 創建減少數值的按鈕
  buttonDec = createButton("-");
  buttonDec.position(windowWidth / 2 - 345, windowHeight / 2 + 80);
  buttonDec.size(buttonWidth, buttonHeight);
  buttonDec.mousePressed(decrementValue);

  // 顯示點餐量
  textSize(28);
  textAlign(CENTER, CENTER);
  text(count, windowWidth / 2 - 280, windowHeight / 2 + 100);

  // 顯示總額
  // 計算總費用並顯示

  text(`總費用: ${totalCost}元`, width / 2, height / 2 + 140);

  textSize(24);
  textAlign(CENTER, CENTER);
  text("伙食費 " + totalCost + " 元", width / 2, height / 2 + 140);

  fill(0, 0, 0, 180);
  noStroke();
  rect(
    windowWidth / 2 - 80,
    windowHeight / 2 + 192,
    textWidth("開始賺錢") + 70,
    50,
    30
  );

  // 顯示總額
  fill("white");
  textSize(32);
  textAlign(CENTER, CENTER);
  text("開始賺錢", width / 2, height / 2 + 220);
}

function incrementValue() {
  dishInfo[index].count++;
  // dish1++;
  // totalCost = dish1 * 70;
}

function decrementValue() {
  if (dish1 > 0) {
    dish1--;
  }

  totalCost = dish1 * 70;
}

function gameOn() {
  background(0);
  text("score = " + score, 30, 20);
  ellipse(x, y, 20, 20);
  rectMode(CENTER);
  rect(mouseX, height - 10, 50, 30);
  y += speed;
  if (y > height) {
    screen = 2;
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

function endScreen() {
  background(150);
  textAlign(CENTER);
  text("GAME OVER", width / 2, height / 2);
  text("SCORE = " + score, width / 2, height / 2 + 20);
  text("click to play again", width / 2, height / 2 + 40);
}

function mousePressed() {
  if (screen == 0) {
    screen = 1;
  } else if (screen == 1) {
    screen = 2;
  }
}

function reset() {
  score = 0;
  speed = 2;
  y = -20;
}

//讓圖片符合螢幕尺寸
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
