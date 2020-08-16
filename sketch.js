//Create variables here
var dog, dogImg,happyDog ,happyDogImg,database, foodS, foodStock;

function preload()
{
  //load images here
  dogImg = loadImage("images/dogImg.png");
  happyDogImg = loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(500, 500);
  database = firebase.database();
  dog = createSprite(200,200);
  dog.addImage(dogImg);
  dog.scale = 0.2;
  foodStock=database.ref('Food');
  foodStock.on("value",readStock,showErr);
}


function draw() {  
  background(46, 139, 87);

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDogImg);
  }

  drawSprites();
  //add styles here
  textSize(30);
  fill("red");
  text("Note: Press Up_Arrow key to feed",10,50);
  text(" the dog milk",75,90);
  text("Food Remaining:"+foodS,10,350);
}

function readStock(data){
  foodS=data.val();
}

function writeStock(x){

  if(x<=0){
    x=0;
  }else{
    x = x-1;
  }
  database.ref('/').set({
    Food:x
  })
}

function showErr(){
  console.log("Error in reading the database");
}