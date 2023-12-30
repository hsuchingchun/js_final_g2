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
// let gold;
// let silver;
// let blackHand;

//計算分數
let salary = 0;
let totalCost = 100; //貼回去後要把=100刪掉

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
  coins = new Group(); // 創建一個 sprite 組
  blackHands = new Group(); // 創建一個 sprite 組
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
