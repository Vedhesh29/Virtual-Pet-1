var database; 
 
//creating dog and a happydog
var dog,happyDog;
 
//creating dogimage
var dogImage;

//creating foodstock      
var foodS,foodStock;

//creating background image
var backgroundimage;

function preload(){

  //loading all images
  dogImage = loadImage("dogImg.png");
  happyDog = loadImage("dogImg1.png");
}

function setup() {
  createCanvas(500,500);
  
  //Assigning database to firebase.database
  database = firebase.database();
   
  //creating dogSprite,adding image and scaling 
  dog = createSprite(250,365,10,10);
  dog.addImage(dogImage);
  dog.scale = 0.2;
   
  //Fetching foodStock from the database
  foodStock = database.ref("Food").on("value",readStock);
} 

function draw(){
 //adding image to background
 background(255);

 //telling to feed and change the image when 'Up' arrow is pressed
 if(keyWentDown(UP_ARROW)){
   writeStock(foodS);
   dog.y = 380;
   dog.addImage(happyDog);
 } 

 //telling to drawSprites
 drawSprites();

 //giving textSize,textFont,fill and text
 textSize(20);
 textFont("Aharoni");
 fill("black");
 text("Food Left : "+ foodS,190,275);
 text("See! The Dog Is Hungry....",10,20);
 text("Press 'UP Arrow' To Feed The Dog.",10,50);
}
 
//defining readStock(data)
function readStock(data){
  foodS = data.val();
}
 
//defining writeStock(x)
function writeStock(x){
  if(x <= 0){
    x = 0;
  }else{
    x = x -1;
  }
  database.ref('/').update({
    Food : x
  })
}