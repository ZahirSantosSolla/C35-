var pipa, pipa1, pipa2;
var boy, garoto1, garoto2;
var database;
var height;
var invisibleGround1,invisibleGround2,invisibleGround3,invisibleGround4;


function preload(){
   bg =loadImage("Images/cityImage.png");

   pipa1=loadImage("Images/Pipa1.png");
   pipa2=loadImage("Images/Pipa2.png");

   garoto1=loadImage("Images/Garoto1.png");
   garoto2=loadImage("Images/Garoto2.png");

  }

//Função para definir o ambiente inicial
function setup() {

   database = firebase.database();
 

  createCanvas(1305,620);

  

  var pipaHeight = database.ref('pipa/height');
  pipaHeight.on("value",readHeight, showError);

  pipa=createSprite(625,600,150,150);
  pipa.addImage("PiPa",pipa1);
  pipa.scale=0.20;

  boy=createSprite(625,540,200,200);
  boy.addImage("Boy",garoto1);
  boy.scale=0.55;

  invisibleGround1 = createSprite(650,-40,1310,100);
  invisibleGround1.visible = false;

  invisibleGround2 = createSprite(610,660,1500,100);
  invisibleGround2.visible = false;

  invisibleGround3 = createSprite(1350,310,100,620);
  invisibleGround3.visible = false;

  invisibleGround4 = createSprite(-40,310,100,620);
  invisibleGround4.visible = false;

  textSize(20); 
}

// função para exibir a UI
function draw() {
  background(bg);

 if(height !== undefined){

  if(keyDown(LEFT_ARROW)){
    writeHeight(-10,0);
    pipa.addImage("PiPa",pipa2);
  }
  else if(keyDown(RIGHT_ARROW)){
    writeHeight(10,0);
    pipa.addImage("PiPa",pipa1);
  }
  else if(keyDown(UP_ARROW)){
    writeHeight(0,-10);
    pipa.scale=pipa.scale -0.005;
  }
  else if(keyDown(DOWN_ARROW)){
    writeHeight(0,+10);
    pipa.scale=pipa.scale+0.005;
  }

  pipa.collide(invisibleGround1);
  pipa.collide(invisibleGround2);
  pipa.collide(invisibleGround3);
  pipa.collide(invisibleGround4);

  if(pipa.x <= 625){

    boy.addImage("Boy",garoto2);

  }
  else if(pipa.x >= 625){

    boy.addImage("Boy", garoto1);

  }

  if(pipa.collide(invisibleGround1)){

    pipa.scale = pipa.scale;
    
  }

  if(pipa.collide(invisibleGround2)){
    

  }

  drawSprites();

  }

  fill(0);
  stroke("white");
  textSize(25);
  text("**Use as setas para mover a pipa!",40,40);
}

function writeHeight(x,y){
  database.ref('pipa/height').set({
    'x': height.x + x ,
    'y': height.y + y
  })
}

 /*function updateHeight(x,y){
   database.ref('pipa/height').set({
     'x': height.x + x ,
     'y': height.y + y
   })
 }*/

 function readHeight(data){
   height = data.val();
   pipa.x = height.x;
   pipa.y = height.y;
 }

function showError(){
  console.log("Erro ao escrever no banco de dados");
}
