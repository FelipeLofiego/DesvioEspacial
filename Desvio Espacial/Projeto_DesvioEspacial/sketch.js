let rocket;
let asteroids = [];
let bgSpeed = 2;
let rocketSpeed = 5;
let asteroidSpeed = 16;
let gameOver = false;
let gameStarted = false;
let startTime;
let endTime;
let survivalTime = 0;

function setup() {
  createCanvas(1800, 950);
  rocket = new Rocket();
  for (let i = 0; i < 10; i++) {
    asteroids.push(new Asteroid(random(width), random(-height, -50), asteroidSpeed));
  }
}

function draw() {
  background(135, 206, 250);

  if (!gameStarted) {
    drawMenu();
  } else if (gameOver) {
    drawGameOver();
  } else {
    for (let i = 0; i < asteroids.length; i++) {
      asteroids[i].move();
    }
    for (let i = 0; i < asteroids.length; i++) {
      asteroids[i].display();
    }
    rocket.move();
    rocket.display();
    
    checkCollision();

    survivalTime = round((millis() - startTime) / 1000);
    displaySurvivalTime();
  }
}

function drawMenu() {
  
  textAlign(CENTER);
  textSize(50);
  fill(255);
  text("Desvio Espacial", width / 2, height / 3);

  rectMode(CENTER);
  fill(0, 255, 0);
  rect(width / 2, height / 2, 150, 50);
  textSize(24);
  fill(0);
  text("Começar", width / 2, height / 2 + 10);

  textSize(15);
  fill(255);
  text("Para mover o foguete, clique as teclas de setinha DIREITA & ESQUERDA", width / 2, height - 50);
}

function drawGameOver() {
  textAlign(CENTER);
  textSize(32);
  fill(255);
  text("Você perdeu!!", width / 2, height / 3);

  textSize(24);
  fill(255);
  text("Sobreviveu por " + survivalTime + " segundos", width / 2, height / 2);
  text("Pressione a tecla 'E' para reiniciar", width / 2, height / 2 + 50);
}

function mouseClicked() {
  if (!gameStarted && mouseX >= width / 2 - 75 && mouseX <= width / 2 + 75 && mouseY >= height / 2 - 25 && mouseY <= height / 2 + 25) {
    gameStarted = true;
    startTime = millis();
  }
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    rocket.moveLeft();
  } else if (keyCode === RIGHT_ARROW) {
    rocket.moveRight();
  } else if (keyCode === 69) {
    if (gameOver) {
      restartGame();
    }
  }
}

function keyReleased() {
  if (keyCode === LEFT_ARROW || keyCode === RIGHT_ARROW) {
    rocket.stopMoving();
  }
}

function resetGame() {
  rocket = new Rocket();
  asteroids = [];
  for (let i = 0; i < 10; i++) {
    asteroids.push(new Asteroid(random(width), random(-height, -50), asteroidSpeed));
  }
  gameOver = false;
  startTime = millis();
  survivalTime = 0;
}

function restartGame() {
  gameStarted = false;
  resetGame();
}

function checkCollision() {
  for (let i = 0; i < asteroids.length; i++) {
    if (rocket.isColliding(asteroids[i])) {
      gameOver = true;
      endTime = millis();
      break;
    }
  }
}

function displaySurvivalTime() {
  textSize(16);
  fill(255);
  text(survivalTime + " Segundo's", 50, 30);
}

class Rocket {
  constructor() {
    this.x = width / 2;
    this.y = height - 100;
    this.size = 50;
    this.xSpeed = 0;
  }

  move() {
    this.x += this.xSpeed;
    this.x = constrain(this.x, 0, width - this.size);
  }

  moveLeft() {
    this.xSpeed = -rocketSpeed;
  }

  moveRight() {
    this.xSpeed = rocketSpeed;
  }

  stopMoving() {
    this.xSpeed = 0;
  }

  display() {
    fill(255, 0, 0);
    rect(this.x, this.y, this.size, this.size);
  }

  isColliding(asteroid) {
    return (
      this.x < asteroid.x + asteroid.size &&
      this.x + this.size > asteroid.x &&
      this.y < asteroid.y + asteroid.size &&
      this.y + this.size > asteroid.y
    );
  }
}

class Asteroid {
  constructor(x, y, speed) {
    this.x = x;
    this.y = y;
    this.size = random(20, 60);
    this.speed = speed;
  }

  move() {
    this.y += this.speed;
    if (this.y > height) {
      this.y = random(-height, -50);
      this.x = random(width);
    }
  }

  display() {
    fill(0, 0, 0);
    rect(this.x, this.y, this.size, this.size);
  }
}
