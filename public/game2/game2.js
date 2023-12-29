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
let player1;

function preload() {
  gate2 = loadImage("../assets/Gate2/背景/Gate2背景(+物件).png");
  gate2bg = loadImage("../assets/Gate2/背景/背景藍灰漸層.png");
  instruction = loadImage("../assets/Gate2/遊戲說明/資產 2.png");
  menu = loadImage("../assets/Gate2/菜單/菜單按鈕.png");
  allDish = loadImage("../assets/Gate2/菜單/菜單選取.png");
  player1 = loadImage("../assets/主角/玩家狀態二.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(LEFT, TOP);
  textFont("Auraka點陣宋");
}

function draw() {
  //螢幕場景切換
  if (screen == 0) {
    startScreen();
  } else if (screen == 1) {
    intro();
  } else if (screen == 2) {
    chooseDish();
  }
}
//---------------------- 畫面內容 function ---------------------------------------------------------------

//----------------------Step 0 遊戲開始前 startScreen() ----------------------------------------------

//文字動畫使用
let textSpeed = 5; // 打字速度
let textIndex = 0; // 文字索引
let lineIndex = 0; // 行索引
let displayText = ""; // 要顯示的文字
let textSpacing = 30; // 字的行句
let allTextDisplayed = false; // 是否所有文字都已經打印完畢

function startScreen() {
  let introText = [
    "「我想要到台灣努力工作，賺錢以後要幫忙家裡。」",
    "看著每個月的薪資都拿去還高額的仲介費債務與服務費抽成",
    "薪水還需要寄回家鄉",
    "因此即使每天努力工作仍賺不了錢",
    "為什麼想在台灣過生活這麼難呢？",
  ];

  // background(gate2bg);

  imageMode(CENTER);

  //背景圖
  image(
    gate2bg,
    windowWidth / 2,
    windowHeight / 2,
    windowWidth * 1.06,
    gate2bg.height / 5
  );

  //Game2 標題
  textAlign(CENTER);
  textStyle(BOLD);
  textSize(32);
  stroke("white");
  text("GAME 2", windowWidth / 2, windowHeight / 2 - 180);

  //印出故事文字動畫
  textStyle(NORMAL);
  noStroke();
  textSize(16);

  // 顯示已打完的文字
  for (let i = 0; i < introText.length; i++) {
    if (i < lineIndex) {
      text(
        introText[i],
        windowWidth / 2,
        windowHeight / 2 - 120 + i * textSpacing
      );
    }
  }

  // 逐字打字
  if (!allTextDisplayed) {
    displayText = introText[lineIndex].substring(0, textIndex);
    text(
      displayText,
      windowWidth / 2,
      windowHeight / 2 - 120 + lineIndex * textSpacing
    );

    // 控制打字速度
    if (
      frameCount % textSpeed === 0 &&
      textIndex < introText[lineIndex].length
    ) {
      textIndex++;
    } else if (textIndex >= introText[lineIndex].length) {
      lineIndex++; // 移至下一行
      textIndex = 0; // 重置字元索引

      if (lineIndex === introText.length) {
        allTextDisplayed = true; // 所有文字都已打印完畢
      }
    }
  }

  if (allTextDisplayed === true) {
    //畫出玩家
    image(
      player1,
      windowWidth / 2,
      windowHeight / 2 + 150,
      player1.width / 5,
      player1.height / 5
    );

    //開始賺錢文字、框
    fill(0, 0, 0, 180);
    noStroke();
    rect(
      windowWidth / 2 - 55,
      windowHeight / 2 + 150,
      textWidth("START") + 70,
      50,
      30
    );

    fill("white");
    textSize(32);
    textAlign(CENTER, CENTER);
    text("START", width / 2, height / 2 + 180);
  }

  reset();
}

//----------------------Step0 End ----------------------------------------------------------

//----------------------Step1 遊戲說明 intro() ----------------------------------------------
function intro() {
  // background(gate2bg);
  //背景圖
  image(
    gate2bg,
    windowWidth / 2,
    windowHeight / 2,
    windowWidth * 1.06,
    gate2bg.height / 5
  );
  imageMode(CENTER);
  image(
    instruction,
    windowWidth / 2,
    windowHeight / 2,
    instruction.width / 5.5,
    instruction.height / 5.5
  );
}

//----------------------Step1 End ----------------------------------------------------------

//----------------------Step2 餐點選擇 chooseDish()------------------------------------------

//按鈕變數
let decreaseButtons = []; // 存放減號按鈕的陣列
let increaseButtons = []; // 存放加號按鈕的陣列
let buttonCount = 4; // 按鈕數量

let buttonSpacing = 188; // 按鈕間距
let totalCost; //總費用加總

// 每個按鈕的餐點價格和數量的陣列
let dishInfo = [
  { price: 100, count: 0 },
  { price: 60, count: 0 },
  { price: 80, count: 0 },
  { price: 50, count: 0 },
];

function chooseDish() {
  // background(gate2bg);
  imageMode(CENTER);

  //背景圖
  image(
    gate2bg,
    windowWidth / 2,
    windowHeight / 2,
    windowWidth * 1.06,
    gate2bg.height / 5
  );

  //菜單標題
  image(
    menu,
    windowWidth / 2,
    windowHeight / 2 - 200,
    menu.width / 5,
    menu.height / 5
  );

  //菜單選單
  image(
    allDish,
    windowWidth / 2,
    windowHeight / 2 - 50,
    allDish.width / 5.5,
    allDish.height / 5.5
  );

  //畫出四組按鈕
  for (let i = 0; i < buttonCount; i++) {
    // 創建減號按鈕
    decreaseButtons.push(createButton("-"));
    decreaseButtons[i].position(
      windowWidth / 2 - 340 + i * buttonSpacing,
      windowHeight / 2 + 70
    );
    decreaseButtons[i].size(30, 30);
    decreaseButtons[i].mousePressed(() => decreaseValue(i));
  }

  for (let i = 0; i < buttonCount; i++) {
    // 創建加號按鈕
    increaseButtons.push(createButton("+"));
    increaseButtons[i].position(
      windowWidth / 2 - 260 + i * buttonSpacing,
      windowHeight / 2 + 70
    );
    increaseButtons[i].size(30, 30);
    increaseButtons[i].mousePressed(() => increaseValue(i));
  }

  // 顯示每個按鈕對應的餐點數量
  textSize(28);
  textAlign(CENTER, CENTER);

  for (let i = 0; i < buttonCount; i++) {
    text(
      ` ${dishInfo[i].count}`,
      windowWidth / 2 - 290 + i * buttonSpacing,
      windowHeight / 2 + 88
    );
  }

  // 計算伙食費並顯示
  totalCost = dishInfo.reduce((acc, val) => acc + val.count * val.price, 0); //reduce 讓陣列每個數值做相同動作
  textSize(24);
  textAlign(CENTER, CENTER);
  text(`伙食費: ${totalCost}元`, width / 2, height / 2 + 140);

  //開始賺錢文字、框
  fill(0, 0, 0, 180);
  noStroke();
  rect(
    windowWidth / 2 - 80,
    windowHeight / 2 + 192,
    textWidth("開始賺錢") + 70,
    50,
    30
  );

  fill("white");
  textSize(32);
  textAlign(CENTER, CENTER);
  text("開始賺錢", width / 2, height / 2 + 220);
}

//增加對應餐點數
function increaseValue(index) {
  dishInfo[index].count++;
}

//減少對應餐點數量
function decreaseValue(index) {
  if (dishInfo[index].count > 0) {
    dishInfo[index].count--;
  } else {
    //讓餐點數量不會呈負數
    dishInfo[index].count = 0;
  }
}

//----------------------Step2 End ----------------------------------------------------------

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

//點擊滑鼠進行畫面轉換
function mousePressed() {
  // Step0 開始進入遊戲的方框位置
  let screen0StartX = windowWidth / 2 - 55;
  let screen0StartY = windowHeight / 2 + 150;

  //Step2 開始賺錢的方框位置
  let screen2StartX = windowWidth / 2 - 80;
  let screen2StartY = windowHeight / 2 + 192;

  if (
    //Step0 Game2 起始畫面
    screen === 0 &&
    mouseX > screen0StartX &&
    mouseX < screen0StartX + textWidth("START") + 70 &&
    mouseY > screen0StartY &&
    mouseY < screen0StartY + 50
  ) {
    screen = 1;
  } else if (screen === 1) {
    //Step1 遊戲說明畫面
    screen = 2;
  } else if (
    //Step2 選餐畫面開始，點選開始賺錢切畫面
    screen === 2 &&
    mouseX > screen2StartX &&
    mouseX < screen2StartX + textWidth("開始賺錢") + 70 &&
    mouseY > screen2StartY &&
    mouseY < screen2StartY + 50
  ) {
    //選完餐點之後，隱藏按鈕，進入遊戲開始關卡
    //切換畫面
    screen = 0;
    //隱藏按鈕
    for (let i = 0; i < buttonCount; i++) {
      increaseButtons[i].hide();
      decreaseButtons[i].hide();
    }
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
