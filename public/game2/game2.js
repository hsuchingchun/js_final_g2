//畫面切換
let screen = 0;

//圖片變數
let gate2;
let gate2bg;
let instruction;
let info;
let menu;
let allDish;
let player1Intro;
let player1;
let envelope;

//計算分數
let salary = 0;
let totalCost; //總伙食費加總

//金幣組、黑手組
let coins;
let blackHands;

//倒數時間
let timeLeft = 30;

function preload() {
  gate2 = loadImage("../assets/Gate2/背景/Gate2背景(+物件).png");
  gate2bg = loadImage("../assets/Gate2/背景/背景藍灰漸層.png");

  instruction = loadImage("../assets/Gate2/遊戲說明/資產 2.png");
  info = loadImage("../assets/Gate2/遊戲說明/遊戲說明.png");
  menu = loadImage("../assets/Gate2/菜單/菜單按鈕.png");
  allDish = loadImage("../assets/Gate2/菜單/菜單選取.png");
  player1Intro = loadImage("../assets/主角/玩家狀態二.png");

  player1 = createSprite(windowWidth / 2, 200);
  player1.addImage("player1", loadImage("../assets/主角/玩家狀態二.png"));
  player1.scale = 0.2;

  envelope = createSprite(windowWidth / 2, 200);
  envelope.addImage("envelope", loadImage("../assets/Gate2/關卡/薪資袋.png"));
  envelope.scale = 0.2;
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(LEFT, TOP);
  textFont("Auraka點陣宋");

  //screen===3 gameOn()使用
  coins = new Group(); // 創建一個 sprite 組
  blackHands = new Group(); // 創建一個 sprite 組
}

function draw() {
  //螢幕場景切換
  if (screen === 0) {
    startScreen();
    // chooseDish();
    // gameOn();
  } else if (screen === 1) {
    intro();
  } else if (screen === 2) {
    chooseDish();
  } else if (screen === 3) {
    gameOn();
  }
  // } else if (screen === 4) {
  //   gameEnd();
  // }
}
//---------------------- 畫面內容 function ---------------------------------------------------------------

//----------------------Screen0 遊戲開始前 startScreen() ----------------------------------------------

//文字動畫使用
let textSpeed = 5; // 打字速度
let textIndex = 0; // 文字索引
let lineIndex = 0; // 行索引
let displayText = ""; // 要顯示的文字
let textSpacing = 30; // 字的行句
let allTextDisplayed = false; // 是否所有文字都已經打印完畢

let alphaValue = 0;

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

  //畫出玩家
  image(
    player1Intro,
    windowWidth / 2,
    windowHeight / 2 + 150,
    player1Intro.width / 5,
    player1Intro.height / 5
  );

  //打完字後才出現 start
  if (allTextDisplayed === true) {
    //開始賺錢文字、框
    fill(0, 0, 0, alphaValue);
    noStroke();
    rect(
      windowWidth / 2 - 55,
      windowHeight / 2 + 150,
      textWidth("START") + 70,
      50,
      30
    );
    // 漸進增加透明度
    if (alphaValue < 180) {
      alphaValue += 5; // 調整此值以控制漸變速度
    }

    fill("white");
    textSize(32);
    textAlign(CENTER, CENTER);
    text("START", width / 2, height / 2 + 180);
  }

  reset();
}

//----------------------Screen0 End ----------------------------------------------------------

//----------------------Screen1 遊戲說明 intro() ----------------------------------------------
function intro() {
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

  //畫出玩家
  image(
    player1Intro,
    windowWidth / 2 + 200,
    windowHeight / 2 + 150,
    player1Intro.width / 5,
    player1Intro.height / 5
  );

  //遊戲說明
  image(
    instruction,
    windowWidth / 2,
    windowHeight / 2,
    instruction.width / 5.5,
    instruction.height / 5.5
  );

  fill(0, 0, 0, alphaValue);
  textSize(22);
  textAlign(CENTER, CENTER);
  text("任意點擊繼續 >>>", width / 2 - 30, height / 2 + 200);
  // 漸進增加透明度
  if (alphaValue < 180) {
    alphaValue += 0.5;
  }
}

//----------------------Screen1 End ----------------------------------------------------------

//----------------------Screen2 餐點選擇 chooseDish()------------------------------------------

//按鈕變數
let decreaseButtons = []; // 存放減號按鈕的陣列
let increaseButtons = []; // 存放加號按鈕的陣列
let buttonCount = 4; // 按鈕數量

let buttonSpacing = 188; // 按鈕間距

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

  //遊戲說明
  image(info, 50, 50, info.width / 5, info.height / 5);

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

//----------------------Screen2 End ----------------------------------------------------------

//----------------------Screen3 遊戲開始 gameOn()------------------------------------------
//TODO 貼上 gameOn.js
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

  //玩家
  player1.position.y = windowHeight / 2 + 150;

  //薪資袋
  envelope.position.y = windowHeight / 2 + 200;

  //鍵盤控制方向
  if (keyIsDown(LEFT_ARROW)) {
    // left
    player1.setVelocity(-2, 0);
    envelope.setVelocity(-2, 0);
  } else if (keyIsDown(RIGHT_ARROW)) {
    player1.setVelocity(2, 0);
    envelope.setVelocity(2, 0);
  } else {
    // no key press ‐> stand still
    player1.setVelocity(0, 0);
    envelope.setVelocity(0, 0);
  }

  //顯示分數和時間
  textSize(30);
  textAlign(CENTER);
  text(`剩餘時間: ${timeLeft} 秒`, windowWidth / 2, 130);

  textAlign(LEFT);
  fill("white");
  textSize(26);
  text(`伙食費：${totalCost}`, 50, windowHeight / 2 + 95);
  text(`目前薪資：${salary}`, 50, windowHeight / 2 + 140);

  // 判斷遊戲是否結束
  if (salary >= totalCost) {
    textAlign(CENTER);
    fill("black");
    textSize(28);
    text("成功了！", width / 2, height / 2 - 50);
    text("「原來我曾經這麼努力才能飽餐一頓啊！」", width / 2, height / 2);

    noLoop();
  } else if (timeLeft <= 0) {
    textAlign(CENTER);
    fill("black");
    textSize(28);
    text("失敗了！", width / 2, height / 2 - 50);
    text("你賺得錢不夠支付你想吃的餐點！", width / 2, height / 2);

    noLoop();
  } else {
    // 更新時間
    if (frameCount % 60 === 0) {
      timeLeft--;
    }
    //金幣掉落
    if (frameCount % 30 === 0) {
      createCoin(random(width), -50); // 從隨機x座標位置掉落金幣，y座標設為-50，從畫布頂端開始掉落
    }

    //黑手掉落
    if (frameCount % 90 === 0) {
      createBlackHand(random(width), -50);
    }

    //偵測金幣、信封碰撞
    for (let i = coins.length - 1; i >= 0; i--) {
      if (coins[i].overlap(envelope)) {
        //碰撞後薪水+10、移除金幣
        //TODO 顯示加的分數在畫面
        salary += 10;
        coins[i].remove(); //刪除金幣圖片
        coins.splice(i, 1); //從群組刪掉金幣
      }
    }

    //偵測黑手抽成、信封碰撞
    for (let i = blackHands.length - 1; i >= 0; i--) {
      if (blackHands[i].overlap(envelope)) {
        //碰撞後薪水+10、移除金幣
        //TODO 顯示加的分數在畫面
        salary -= 10;
        blackHands[i].remove();
        blackHands.splice(i, 1);
      }
    }

    drawSprites();
  }
}

//TODO 畫銀幣
//畫出金幣
function createCoin(x, y) {
  let coin = createSprite(x, y);
  //TODO random 出現金或銀
  coin.addImage("gold", loadImage("../assets/Gate2/關卡/金色錢幣.png"));
  coin.scale = 0.25;
  coin.velocity.y = 2; // 金幣向下掉落速度
  coins.add(coin);
}

//畫出黑手
function createBlackHand(x, y) {
  let hand = createSprite(x, y);
  hand.addImage("blackHand", loadImage("../assets/Gate2/關卡/黑手.png"));
  hand.scale = 0.25;
  hand.velocity.y = 1.8; // 金幣向下掉落速度
  blackHands.add(hand);
}

//----------------------Screen3 End ----------------------------------------------------------

//----------------------Screen4 遊戲結束 gameEnd() --------------------------------------------

function gameEnd() {
  // background(150);
  // textAlign(CENTER);
  // text("GAME OVER", width / 2, height / 2);
  // text("SCORE = " + score, width / 2, height / 2 + 20);
  // text("click to play again", width / 2, height / 2 + 40);
}

//----------------------Screen4 End ----------------------------------------------------------

//----------------------Screen切換與其他 --------------------------------------------
//點擊滑鼠進行畫面轉換
function mousePressed() {
  // 遊戲說明點擊
  //TODO 點擊說明info小圖繪出現遊戲說明

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
    //TODO 按鈕出現
    // for (let i = 0; i < buttonCount; i++) {
    //   increaseButtons[i].show();
    //   decreaseButtons[i].show();
    // }
  } else if (
    //Step2 選餐畫面開始，點選開始賺錢切畫面
    screen === 2 &&
    mouseX > screen2StartX &&
    mouseX < screen2StartX + textWidth("開始賺錢") + 70 &&
    mouseY > screen2StartY &&
    mouseY < screen2StartY + 50 &&
    totalCost > 0
  ) {
    //選完餐點之後，隱藏按鈕，進入遊戲開始關卡
    //切換畫面
    screen = 3;
    //隱藏按鈕
    for (let i = 0; i < buttonCount; i++) {
      increaseButtons[i].hide();
      decreaseButtons[i].hide();
    }
  }
}

function reset() {
  //TODO 分數歸零
  totalCost = 0;
}

//讓圖片符合螢幕尺寸
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
