let screen = 0;
// var y = -20;
// var x = 200;
var speed = 2;
// var score = 0;
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

let salary = 0;
let totalCost = 1000;

//test
let coins = [];
let bombs = [];
let score = 0;
let timeLeft = 30;
let targetScore = 50;

function preload() {
  gate2 = loadImage("../assets/Gate2/背景/Gate2背景(+物件).png");
  gate2bg = loadImage("../assets/Gate2/背景/背景藍灰漸層.png");

  instruction = loadImage("../assets/Gate2/遊戲說明/資產 2.png");
  info = loadImage("../assets/Gate2/遊戲說明/遊戲說明.png");
  menu = loadImage("../assets/Gate2/菜單/菜單按鈕.png");
  allDish = loadImage("../assets/Gate2/菜單/菜單選取.png");
  //   player1 = loadImage("../assets/主角/玩家狀態二.png");

  player1 = createSprite(windowWidth / 2, 200);
  player1.addImage("envelope", loadImage("../assets/主角/玩家狀態二.png"));
  player1.scale = 0.2;

  envelope = createSprite(windowWidth / 2, 200);
  envelope.addImage("envelope", loadImage("../assets/Gate2/關卡/薪資袋.png"));
  envelope.scale = 0.2;

  //   gold = createSprite(100, 200);
  //   gold.addImage("gold", loadImage("../assets/Gate2/關卡/金色錢幣.png"));

  //   silver = createSprite(100, 200);
  //   silver.addImage("silver", loadImage("../assets/Gate2/關卡/銀色錢幣.png"));

  //   blackHand = createSprite(100, 200);
  //   blackHand.addImage("blackHand", loadImage("../assets/Gate2/關卡/黑手.png"));

  //   envelope = loadImage("../assets/Gate2/關卡/薪資袋.png");
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

  //玩家
  player1.position.y = windowHeight / 2 + 150;
  //   image(
  //     player1,
  //     mouseX,
  //     windowHeight / 2 + 150,
  //     player1.width / 5,
  //     player1.height / 5
  //   );

  //薪資袋
  envelope.position.y = windowHeight / 2 + 200;
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

  //   image(
  //     envelope,
  //     mouseX,
  //     windowHeight / 2 + 200,
  //     envelope.width / 5,
  //     envelope.height / 5
  //   );

  // 顯示分數和時間
  textSize(30);
  textAlign(CENTER);
  //   text(`Score: ${score}`, 20, 30);
  text(`剩餘時間: ${timeLeft} 秒`, windowWidth / 2, 130);

  textAlign(LEFT);
  fill("white");
  textSize(26);
  text(`伙食費：${totalCost}`, 50, windowHeight / 2 + 95);
  text(`目前薪資：${salary}`, 50, windowHeight / 2 + 140);

  // 判斷遊戲是否結束
  if (score >= targetScore) {
    textAlign(CENTER);
    textSize(40);
    text("You win!", width / 2, height / 2);
    noLoop();
  } else if (timeLeft <= 0) {
    textAlign(CENTER);
    textSize(40);
    text("Game over!", width / 2, height / 2);
    noLoop();
  } else {
    // 更新時間
    if (frameCount % 60 === 0) {
      timeLeft--;
    }

    // 生成金幣和炸彈
    if (frameCount % 30 === 0) {
      let coinType = random() > 0.5 ? "5" : "10"; // 隨機決定是加五分還是加十分的金幣
      coins.push(new Coin(random(width), random(-100, -50), coinType));
    }
    if (frameCount % 80 === 0) {
      bombs.push(new Bomb(blackHand, random(width), random(-100, -50)));
    }

    // 顯示和更新金幣
    for (let i = coins.length - 1; i >= 0; i--) {
      coins[i].display();
      coins[i].update();
      if (coins[i].offScreen()) {
        coins.splice(i, 1);
      }

      // 當滑鼠碰觸到金幣時，根據金幣的分數值加分
      let collectedScore = coins[i].catch();
      //   console.log(collectedScore);
      salary += collectedScore;
      if (collectedScore > 0) {
        coins.splice(i, 1);
      }
    }

    // 顯示和更新炸彈
    for (let i = bombs.length - 1; i >= 0; i--) {
      bombs[i].display();
      bombs[i].update();
      if (bombs[i].offScreen()) {
        bombs.splice(i, 1);
      }
    }
  }
  drawSprites();
}

class Coin {
  constructor(x, y, type) {
    this.x = x;
    this.y = y;
    this.speed = 2;
    this.size = 40;
    this.type = type; // 金幣的類型，5或10
    this.image = this.type === "5" ? silver : gold; // 根據類型選擇圖片
  }

  display() {
    // this.image.position.x = this.x - this.size / 2;
    // this.image.position.y = this.y - this.size / 2;
    // this.image.width = this.size;
    // this.image.height = this.size;
    image(
      this.image,
      this.x - this.size / 2,
      this.y - this.size / 2,
      this.size,
      this.size
    );
  }

  update() {
    this.y += this.speed;
  }

  offScreen() {
    return this.y > height;
  }
  catch() {
    // console.log("catch");
    // console.log(this.y, this.x);
    // console.log(envelope.x === this.x);
    //TODO 偵測碰撞事件
    // if (this.image.overlap(envelope)) {
    //   console.log(this.image.overlap(envelope));
    //   return this.value;
    //   // let d = dist(envelope.x, envelope.y, this.x, this.y);
    //   // if (d < this.size / 2) {
    //   //   console.log(value);
    //   //   return this.value; // 返回金幣的分數值
    // } else {
    //   return 0; // 若未碰觸到金幣則返回 0 分
    // }
  }
}
class Bomb {
  constructor(img, x, y) {
    this.img = img;
    this.x = x;
    this.y = y;
    this.speed = 3;
    this.size = 60;
    this.color = color(255, 0, 0);
  }

  display() {
    // this.img.scale = 0.2;
    // this.img.position.x = this.x - this.size / 2;
    // this.img.position.y = this.y - this.size / 2;
    image(
      blackHand,
      this.x - this.size / 2,
      this.y - this.size / 2,
      this.size,
      this.size
    );
  }

  update() {
    this.y += this.speed;
  }

  offScreen() {
    return this.y > height;
  }

  catch(x, y) {
    let d = dist(x, y, this.x, this.y);
    if (d < this.size / 2) {
      return true;
    } else {
      return false;
    }
  }
}

//   gold.scale = 0.2;
//   gold.position.x = random();
//   gold.position.y = y;

//   ellipse(x, y, 20, 20);
//   rectMode(CENTER);
//   //   rect(mouseX, height - 10, 50, 30);
//   y += speed;
//   if (y > height) {
//     screen = 0;
//   }

//   if (y == -20) {
//     pickRandom();
//   }

// }

// function pickRandom() {
//   x = random(20, width - 20);
// }

//----------------------Step3 End ----------------------------------------------------------

function endScreen() {
  background(150);
  textAlign(CENTER);
  text("GAME OVER", width / 2, height / 2);
  text("SCORE = " + score, width / 2, height / 2 + 20);
  text("click to play again", width / 2, height / 2 + 40);
}
