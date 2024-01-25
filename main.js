x = 0;
y = 0;

screenWidth = window.innerWidth();
screenHeight = window.innerHeight();

drawApple = "";

apple = "";
speakData = "";
toNumber = 0;

function preload()
{
  apple = loadImage("apple.png");
}

var SpeechRecognition = window.webkitSpeechRecognition;
  
var recognition = new SpeechRecognition();

function start()
{
  document.getElementById("status").innerHTML = "O sistema está ouvindo. Por favor, fale.";  
  recognition.start();
} 
 
recognition.onresult = function(event) {

 console.log(event); 

 content = event.results[0][0].transcript;

    document.getElementById("status").innerHTML = "A fala foi reconhecida: " + content; 
    toNumber = Number(content);
    if(Number.isInteger(toNumber))
    {
      document.getElementById("status").innerHTML = "A maçã começou a ser desenhada."; 
      drawApple = "set";
    }
    else
    {
      document.getElementById("status").innerHTML = "O número não foi reconhecido."; 
    }

}

function setup() {
  screenWidth = window.innerWidth;
  screenHeight = window.innerHeight;

  canvas = createCanvas(screenWidth, screenHeight-150);
  canvas.position(0,150);
}

function draw() {
  if(drawApple == "set")
  {
    for(var i = 1 ; i <= toNumber; i++)
    {
      x = Math.floor(Math.random() * 700);
      y = Math.floor(Math.random() * 400);
      image(apple, x, y, Math.random() * 50, Math.random() * 50);
    }
    document.getElementById("status").innerHTML = toNumber + " maçãs desenhadas";
    speakData = toNumber + " maçãs desenhadas";
    speak();
    drawApple = "";
  }
}

function speak(){
    var synth = window.speechSynthesis;

    var utterThis = new SpeechSynthesisUtterance(speakData);

    synth.speak(utterThis);

    speakData = "";
}
