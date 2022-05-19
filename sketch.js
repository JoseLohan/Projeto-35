var balloon,balloonImage1,balloonImage2;
var database;
var height;
var bottomEdge;

function preload(){
   bg =loadImage("Images/cityImage.png");
   balloonImage1=loadAnimation("Images/HotAirBallon01.png");
   balloonImage2=loadAnimation("Images/HotAirBallon02.png");
  }

//Função para definir o ambiente inicial
function setup() {

   database=firebase.database();

  createCanvas(1500,700);

  balloon=createSprite(250,650,150,150);
  balloon.addAnimation("hotAirBalloonBasic", balloonImage1)
  balloon.addAnimation("hotAirBalloon",balloonImage2);
  balloon.changeAnimation("hotAirBalloonBasic")
  balloon.scale=0.5;

  var balloonHeight=database.ref('Balloon/height');
  balloonHeight.on("value",readHeight, showError);

  bottomEdge = createEdgeSprites();

  textSize(20); 
}

// função para exibir a UI
function draw() {
  background(bg);

  if(keyDown(LEFT_ARROW)){
    updateHeight(-10,0);
    balloon.changeAnimation("hotAirBalloon");
  }
  if(keyDown(RIGHT_ARROW)){
    updateHeight(+10,0);
    balloon.changeAnimation("hotAirBalloon");
  }
  if(keyDown(UP_ARROW)){
    updateHeight(0,-10);
    balloon.changeAnimation("hotAirBalloon");
    balloon.scale=balloon.scale -0.005;
  }
  if(keyDown(DOWN_ARROW)){
    updateHeight(0,+10);
    balloon.changeAnimation("hotAirBalloon");
    balloon.scale=balloon.scale+0.005;
  }

  balloon.collide(bottomEdge[3])

  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("**Use as setas para mover o balão de ar quente!",40,40);
}

 function updateHeight(x,y){
   database.ref('Balloon/height').set({
     'x': height.x + x ,
     'y': height.y + y
   })
 }

function readHeight(data){
  height = data.val();
  balloon.x = height.x;
  balloon.y = height.y;
}

function showError(){
  console.log("Erro ao escrever no banco de dados");
}
