let movementDisplay = document.querySelector('#movement');
let game = document.querySelector('#game');

// Initialize the canvas
let ctx = game.getContext('2d');

// Match the canvas size to the size of the containing div
let computedStyle = getComputedStyle(game);
let height = computedStyle.height;
let width = computedStyle.width;
game.height = parseInt(height);
game.width = parseInt(width);

// Set the style elements
ctx.strokeStyle = 'red';
ctx.fillStyle = 'white';
ctx.lineWidth = 5;

// Draw/create elements
// ctx.fillRect(10, 10, 100, 100);
// ctx.strokeRect(10, 10, 100, 100);

function drawBox(x, y, size, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, size, size);
}

// drawBox(200, 200, 50, 'pink');
// drawBox(300, 200, 50, 'green');

// Character objects
// let ogre = {
//   x: 10,
//   y: 10,
//   color: "#BADA55",
//   width: 40,
//   height: 80,
//   alive: true,
//   render: function() {
//     ctx.fillStyle = this.color;
//     ctx.fillRect(this.x, this.y, this.width, this.height);
//   }
// };

// let hero = {
//   x: 0,
//   y: 0,
//   color: "hotpink",
//   width: 20,
//   height: 20,
//   alive: true,
//   render: function() {
//     ctx.fillStyle = this.color;
//     ctx.fillRect(this.x, this.y, this.width, this.height);
//   }
// };

class Crawler {
  constructor(x, y, color, width, height) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.width = width;
    this.height = height;
    this.alive = true;
  }
  render() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
  clear() {
    ctx.clearRect(this.x, this.y, this.width, this.height);
  }
}

let ogre = new Crawler(400, 100, '#BADA55', 40, 80);
let hero = new Crawler(0, 0, 'hotpink', 20, 20);

document.getElementById('btm-right').addEventListener('click', () => {
  setInterval(rePaint, 1000 / 60);
});

document.addEventListener('keydown', moveHero);

function moveHero() {
  if (event.key === 'ArrowUp' && hero.y > 0) {
    hero.y -= 10;
  } else if (event.key === 'ArrowLeft' && hero.x > 0) {
    hero.x -= 10;
  } else if (event.key === 'ArrowDown' && (hero.y + hero.height) < game.height) {
    hero.y += 10;
  } else if (event.key === 'ArrowRight' && (hero.x + hero.width) < game.width) {
    hero.x += 10;
  }
}

function detectHit() {
  if (hero.x < ogre.x + ogre.width
    && hero.x + hero.width > ogre.x
    && hero.y < ogre.y + ogre.height
    && hero.y + hero.height > ogre.y) {
    document.removeEventListener('keydown', moveHero);
    console.log(`It's a hit!`);
  }
}

function rePaint() {
  ctx.clearRect(0, 0, game.width, game.height);
  hero.render();
  ogre.render();
  movementDisplay.textContent = `X: ${hero.x}, Y: ${hero.y}`;
  detectHit();
}
