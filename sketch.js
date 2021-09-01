var dog, sadDog, happyDog, database;
var foodS, foodStock;
var fedTime, lastFed;
var feed, addFood;
var foodObj;
var food
function preload() {
  sadDog = loadImage("Dog.png");
  happyDog = loadImage("happy dog.png");
}

function setup() {
  database = firebase.database();
  createCanvas(1000, 400);

  dog = createSprite(800, 200, 150, 150);
  dog.addImage(sadDog);
  dog.scale = 0.15;

  addFood = createButton("Add Food");
  addFood.position(800, 95);
  addFood.mousePressed(addFoods);

  var ballpositionref = database.ref("food")
  ballpositionref.on("value", function(data){
   food = data.val()
   console.log(food)
  })
  
}

function draw() {
  background(46, 139, 87);
  

  fedTime = database.ref("FeedTime");
  fedTime.on("value", function (data) {
    lastFed = data.val();
  });

  fill(255, 255, 254);
  textSize(15);

  if (lastFed >= 12) {
    text("Last Feed : " + (lastFed % 12) + " PM", 350, 30);
  } else if (lastFed == 0) {
    text("Last Feed : 12 AM", 350, 30);
  } else {
    text("Last Feed : " + lastFed + " AM", 350, 30);
  }
    text("food remaining" + food,300,200)
  drawSprites();
}
function addFoods() {
database.ref("/").update({
  food : food + 1
})
}
