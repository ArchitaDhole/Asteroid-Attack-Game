let bullets = [];
let enemies = [];
let sZoneGroup = [1];
let bombGroup = [];
let score = 0;
var player;
var bg, bgImg;
var arrow, arrowImg;
var asteroidImg, asteroidImg2;
var vel = 3;
var powerUpImg;
var img, imgX, imgY;
var sZone, sZoneImg;
var a = 1380, b = 0;
var bombImg;

function setup() {
  createCanvas(windowWidth - 20, windowHeight - 30);
  intro();
  player = createSprite(40, height - 10, 20, 20);
  imgX = width / 2;
  imgY = height - 50;
  img = createSprite(imgX, imgY, 1, 1);
}

function preload() {
  bgImg = loadImage("bg.jpg");
  arrowImg = loadImage("/arrow.png");
  asteroidImg = loadImage("/asteroid.png");
  asteroidImg2 = loadImage("/asteroid2.png");
  powerUpImg = loadImage("/pUp.png");
  sZoneImg = loadImage("/pU.png");
  bombImg = loadImage("/bomb.png");
}

function draw() {

  background(100);
  image(bgImg, 0, 0, width, height);

  player.addImage("img", arrowImg);
  player.scale = 0.2;
  player.x = World.mouseX;

  if (keyDown("SPACE")) {
    arrow();
  }

  for (let enemy of enemies) {
    for (bullet of bullets) {
      if (dist(enemy.x, enemy.y, bullet.x, bullet.y) < 50) {
        enemies.splice(enemies.indexOf(enemy), 1);
        bullets.splice(bullets.indexOf(bullet), 1);
        enemy.destroy();
        bullet.destroy();
        score += 1;
      }
    }
  }

  for (let bullet of bullets) {
    for (let bomb of bombGroup) {
      if (dist(bullet.x, bullet.y, bomb.x, bomb.y) < 50) {
        bombGroup.splice(sZoneGroup.indexOf(bomb), 1);
        bullets.splice(bullets.indexOf(bullet), 1);
        bullet.destroy();
        bomb.destroy();
        gameOver2();
      }
    }
  }

  for (let bullet of bullets) {
    for (let powerUpp of sZoneGroup) {
      if (dist(bullet.x, bullet.y, powerUpp.x, powerUpp.y) < 50) {
        sZoneGroup.splice(sZoneGroup.indexOf(powerUpp), 1);
        bullets.splice(bullets.indexOf(bullet), 1);
        bullet.destroy();
        powerUpp.destroy();
        powerUps();
      }
    }
  }

  for (let enemy of enemies) {
    if (enemy.isTouching(img)) {
      enemy.destroy();
      score += 1;
    }
  }

  for (let bomb of bombGroup) {
    if (bomb.isTouching(img)) {
      bomb.destroy();
      score += 1;
    }
  }

  for (enemy of enemies) {
    if (enemy.y >= height) {
      gameOver();
    }
  }

  fill("white");
  textSize(30);
  text("Score: " + score, 30, 40);

  spawnBomb();
  safe();
  yEnemy();
  drawSprites();
}

function showBullets() {
  let bullet = {
    x: mouseX,
    y: height - 50
  }
  bullets.push(bullet);
}

function yEnemy() {
  if (frameCount % 60 == 0) {
    var yEnemy = createSprite(random(0, width - 50), random(-500, 0), 20, 20);
    yEnemy.velocityY = vel;

    var rand = Math.round(random(1, 2));
    if (rand == 1) {
      yEnemy.addImage(asteroidImg);
    }
    else if (rand == 2) {
      yEnemy.addImage(asteroidImg2);
    }

    yEnemy.scale = random(0.1, 0.5);
    enemies.push(yEnemy);
  }
}

function arrow() {
  var arrow = createSprite(World.mouseX, height - 10, 20, 20);
  arrow.velocityY = -10;
  arrow.addImage(arrowImg);
  arrow.scale = 0.1;
  bullets.push(arrow);
}

function spawnBomb() {
  if (frameCount % 180 == 0) {
    var bomb = createSprite(random(0, width - 50), random(-500, 0), 20, 20);
    bomb.velocityY = vel;
    bomb.scale = 0.2;
    bomb.addImage(bombImg);
    bombGroup.push(bomb);
  }
}

function safe() {
  if (frameCount % 600 == 0) {
    sZone = createSprite(random(0, width), 0, 20, 20);
    sZone.velocityY = 1;
    sZone.addImage(sZoneImg);
    sZone.scale = 0.1;
    sZoneGroup.push(sZone);
  }
}

function powerUps() {
  a = 1380;
  img.visible = true;
  img.addImage(powerUpImg);
  img.scale = 1.2;
  img.setCollider("circle", 0, 1220, a);
  setTimeout(() => {
    img.visible = false;
    a = 0;
    img.setCollider("circle", 0, 1220, a);
  }, 10000);
}

function intro() {
  noLoop();
  swal(
    {
      title: `Instructions`,
      text: "Welcome, here some asteroids are trying to attack on our Earth to save her move the mouse to displace horizontally and press space or click button to shoot. After some time you will get a powerup which will create a protective layer around the earth and it will last for 10 seconds. A bomb will also appear, if you hit the bomb then you will lose. Good Luck",
      confirmButtonText: "Play",
      confirmButtonColor: "#003153"
    },
    function (isConfirm) {
      if (isConfirm) {
        console.log("Game Started");
        loop();
      }
    }
  );
}

function gameOver() {
  noLoop();
  swal(
    {
      title: `Game Over!!!`,
      text: "Thanks for playing!!",
      imageUrl:
        "/go.jpg",
      imageSize: "200x200",
      confirmButtonText: "Play Again",
      confirmButtonColor: rgb(20, 3, 54)

    },
    function (isConfirm) {
      if (isConfirm) {
        location.reload();
      }
    }
  );
}

function gameOver2() {
  noLoop();
  swal(
    {
      title: `Game Over!!!`,
      text: "Thanks for playing!!",
      imageUrl:
        "/bombExplosion.jpg",
      imageSize: "250x250",
      confirmButtonText: "Play Again",
      confirmButtonColor: rgb(20, 3, 54)

    },
    function (isConfirm) {
      if (isConfirm) {
        location.reload();
      }
    }
  );
}

function mousePressed() {
  arrow();
}