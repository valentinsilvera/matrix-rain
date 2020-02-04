var streams = [];
var fadeInterval = 1.6;
var symbolSize = 25;

function setup() {
  createCanvas(
    window.innerWidth,
    window.innerHeight
  );
  background(0);

  var x = 0;
  for (var i = 0; i <= width / symbolSize; i++) {
    var stream = new Stream();
    stream.generateSymbols(x, random(-2000, 0));
    streams.push(stream);
    x += symbolSize
  }

  textFont('Consolas');
  textSize(symbolSize-1);
}

function draw() {
  background(0, 150);
  streams.forEach(function(stream) {
    stream.render();
  });
}

function Symbol(x, y, speed, first, opacity, color) {
  this.x = x;
  this.y = y;
  this.value;

  this.speed = speed;
  this.first = first;
  this.opacity = opacity;
  this.color = color;

  this.switchInterval = round(random(5, 25));

  this.setToRandomSymbol = function() {
    var charType = round(random(0, 5));
    if (frameCount % this.switchInterval == 0) {
      if (charType > 1) {
        // set it to Katakana
        this.value = String.fromCharCode(
          0x30A0 + floor(random(0, 97))
        );
      } else {
        // set it to numeric
        this.value = floor(random(0,10));
      }
    }
  }

  this.rain = function() {
    this.y = (this.y >= height) ? 0 : this.y += this.speed;
  }

}

function Stream() {
  this.symbols = [];
  this.totalSymbols = round(random(5, 35));
  this.speed = random(3, 10);

  this.generateSymbols = function(x, y) {
    var opacity = 255;
    var first = round(random(0, 4)) == 1;
    var color = round(random(0,4));
    for (var i =0; i <= this.totalSymbols; i++) {
      symbol = new Symbol(
        x,
        y,
        this.speed,
        first,
        opacity,
        color
      );
      symbol.setToRandomSymbol();
      this.symbols.push(symbol);
      opacity -= (255 / this.totalSymbols) / fadeInterval;
      y -= symbolSize;
      first = false;
    }
  }

  this.render = function() {
    this.symbols.forEach(function(symbol) {
      if (symbol.first) {
        fill(256, 236, 256, symbol.opacity);
      } else if (symbol.color == 1) {
        fill(255, 159, 26, symbol.opacity); //orange
      } else if (symbol.color == 2) {
        fill(24, 220, 255, symbol.opacity); //blue
      } else if (symbol.color == 3) {
        fill(125, 95, 255, symbol.opacity); //purple
      } else if (symbol.color == 4) {
        fill(255, 242, 0, symbol.opacity); //yellow
      } else {
        fill(50, 255, 126, symbol.opacity); //green
      }
      text(symbol.value, symbol.x, symbol.y);
      symbol.rain();
      symbol.setToRandomSymbol();
    });
  }
}
