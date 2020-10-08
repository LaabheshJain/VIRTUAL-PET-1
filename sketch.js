var dog, dogImg, happyDog, database, foodS, foodStock;

function preload()
{
  dogImg = loadImage("dogImg.png");
  happyDog = loadImage("dogImg1.png");
}

function setup() {
  createCanvas(500, 500);
  
  dog = createSprite(250,300,10,10);
  dog.addImage(dogImg);
  dog.scale=0.15;

  database = firebase.database();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
}


function draw() {  
background(46, 139, 87);

if(keyWentDown(UP_ARROW)){
  writeStock(foodS);
  dog.addImage(happyDog);
}

if(frameCount%100===0){
  dog.addImage(dogImg);
}

  drawSprites();

  textSize(18);  
  fill("white");
  stroke("black");
  text("Food Remaining : "+ foodS,160,200)

  textSize(14);
  fill("white");
  stroke("black");
  text("Note : Press UP_ARROW Key To Feed Dragon Milk!",100,25);
}

//Function to read values from DB
function readStock(data){
  foodS=data.val();
}

//Function to write values in DB
function writeStock(x){

  if(x<=0){
    x=0
  }else{
    x=x-1
  }

  database.ref('/').update({
    Food:x
  })
}