var balloon,balloonImage1,balloonImage2;
// ! 2. criar varavel do BANCO DE DADOS
var database;
var height;

function preload(){
   bg =loadImage("Images/cityImage.png");
   balloonImage1=loadAnimation("Images/HotAirBallon01.png");
   balloonImage2=loadAnimation("Images/HotAirBallon01.png","Images/HotAirBallon01.png",
   "Images/HotAirBallon01.png","Images/HotAirBallon02.png","Images/HotAirBallon02.png",
   "Images/HotAirBallon02.png","Images/HotAirBallon03.png","Images/HotAirBallon03.png","Images/HotAirBallon03.png");
  }


function setup() {
  //! 3. CHAMAR VARIÁVEL DO BD AQUI
  database=firebase.database();
  
  createCanvas(1500,700);

  balloon=createSprite(250,650,250,650);
  balloon.addAnimation("hotAirBalloon",balloonImage1);
  balloon.scale=0.5;

  // ! 6. conectar banco de dadors
  var balloonHeight=database.ref('balloon/height');
  balloonHeight.on("value",readHeight, showError);
  textSize(20); 
}

// função para exibir a interface do usuário
function draw() {
  background(bg);

  if(keyDown(LEFT_ARROW)){
    // ? 4.1 adicionar os updates de movimento e 
    updateHeight(-10,0);
    balloon.addAnimation("hotAirBalloon",balloonImage2);
  }
  
  else if(keyDown(RIGHT_ARROW)){
    updateHeight(10,0);
    balloon.addAnimation("hotAirBalloon",balloonImage2);
  }

  else if(keyDown(UP_ARROW)){
    updateHeight(0,-10);
    balloon.scale=balloon.scale -0.005;
    balloon.addAnimation("hotAirBalloon",balloonImage2);
  }

  else if(keyDown(DOWN_ARROW)){
    updateHeight(0,+10);
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    balloon.scale=balloon.scale+0.005;
  }

  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("**Use as setas para mover o balão de ar quente!",40,40);

}

// ! 4. criar função updateHeight
function updateHeight(x,y){
  database.ref('balloon/height').update({
    'x': height.x + x ,
    'y': height.y + y
  })
}


//! 5. criar propriedade do readHeight
function readHeight(data){
  height = data.val();
  console.log(height.x);
  balloon.x = height.x;
  balloon.y = height.y;
 }

function showError(){
  console.log("Erro ao escrever no banco de dados");
}
