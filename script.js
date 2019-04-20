var data;
var dataMeteo;
var i;
var urlLufdaten;
var urlMeteo;
var menuWidth;

//Images

var sun;
var drop;
var temperature;
var wind;


// Options for map
var options = {
  lat: 48.6500000,
  lng: -2.0166700,
  zoom: 15,
  style: 'http://tile.stamen.com/toner/{z}/{x}/{y}.png'
}

// Create an instance of Leaflet
var mappa = new Mappa('Leaflet');
var myMap;

var canvas;
var meteorites;



function preload() {
  // Get the location
  //locationData =  getCurrentPosition();
  // Get the most recent lufdaten database
  var url1 =
  'https://api.luftdaten.info/v1/filter/country=FR';
   //'https://api.luftdaten.info/static/v1/data.json';
  data = loadJSON(url1);
  var url2 =
   'https://api.openweathermap.org/data/2.5/weather?id=6454049&lang=fr&units=metric&appid=aa242e550e1e1d4bf91a7c76e9f521c3';
  dataMeteo = loadJSON(url2);
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);

  // Create a tile map and overlay the canvas on top.
  myMap = mappa.tileMap(options);
  myMap.overlay(canvas);

  //Load images

  sun = loadImage("data/002-sunny.png");  // Load the image
  drop = loadImage("data/001-drop.png");  // Load the image
  drop = loadImage("data/001-drop.png");  // Load the image
  temperature  = loadImage("data/004-temperature.png");  // Load the image
  vent  = loadImage("data/005-wind.png");  // Load the image
  jauge  = loadImage("data/jauge.png");  // Load the image

sun.filter(GRAY,0.5)
drop.filter(GRAY);
temperature.filter(GRAY);
vent.filter(GRAY);


  // Load the data
  //meteorites = loadTable('../../data/Meteorite_Landings.csv', 'csv', 'header');
//  var url ='https://api.luftdaten.info/static/v1/data.json';
  //data = loadJSON(url);

  //var url =
 //https://api.luftdaten.info/static/v1/data.json';
//loadJSON(url, drawdata);

  // Only redraw the meteorites when the map change and not every frame.
  myMap.onChange(drawData);
  desc=dataMeteo.weather[0].description;
  temp=dataMeteo.main.temp;
  ville=dataMeteo.name;
  d=new Date(dataMeteo.dt*1000);
  wind=dataMeteo.wind.speed;
  direction=dataMeteo.wind.deg;
  hum=dataMeteo.main.humidity;

  fill(70, 203,31);
  stroke(100);
}

// The draw loop is fully functional but we are not using it for now.
function draw() {
  //clear();

  if(windowWidth>400){
  menuWidth = (20/100)*windowWidth;
  fill(0);
  noStroke();
  rect(windowWidth-menuWidth,0,400,windowHeight);
  fill(255);
  textSize(12);
  textAlign(CENTER);
  //affichage de l'API openweathermap
  text("Bulletin Météo du : ",windowWidth-menuWidth/2,30);
  text(d.toLocaleString(),windowWidth-menuWidth/2,60);
  //temps
  image(sun,(windowWidth-menuWidth/2)-20,70,40,40);
  text("Météo à "+ville+" : ",windowWidth-menuWidth/2,160);
  text(desc,windowWidth-menuWidth/2,180);
  //température
  image(temperature,(windowWidth-menuWidth/2)-20,210,40, 40);
  text("Température : "+temp+"°C",windowWidth-menuWidth/2,300);
  //vent
  image(vent,(windowWidth-menuWidth/2)-20,340,40,40);
  text("vent : "+wind+"km/h, direction : "+direction+"°",windowWidth-menuWidth/2,430);
  //humidité
  image(drop,(windowWidth-menuWidth/2)-20,480,40,40);
  text("humidité : "+hum+" %",windowWidth-menuWidth/2,570);

  //jauge
  image(jauge,windowWidth/3,0,182,41);

}
  else if(windowWidth<400){
    menuHeight = 80;
    fill(0);
    noStroke();
    rect(0,windowHeight-menuHeight,windowWidth,menuHeight);
    fill(255);
    textSize(13);
    textAlign(CENTER);
    //affichage de l'API openweathermap
    //text("Bulletin Météo du : ",windowWidth-menuWidth/2,30);
    text(d.toLocaleString(),windowWidth/2,70);
    //temps
    image(sun,((1/5)*windowWidth)-(sun.width/3)/2,windowHeight-menuHeight-(sun.width/3)/2,sun.width/3,sun.height/3);
    //text("Météo à "+ville+" : ",((1/5)*windowWidth),windowHeight-menuHeight/2);
    text(desc,((1/5)*windowWidth),windowHeight-menuHeight/2);
    //température
    image(temperature,((2/5)*windowWidth)-(temperature.width/3)/2,windowHeight-menuHeight-(temperature.width/3)/2,temperature.width/3,temperature.height/3);
    text(temp,((2/5)*windowWidth),windowHeight-menuHeight/2);
    //vent
    image(vent,((3/5)*windowWidth)-(vent.width/3)/2,windowHeight-menuHeight-(vent.width/3)/2,temperature.width/3,temperature.height/3);
    text(wind+"km/h",((3/5)*windowWidth),windowHeight-menuHeight/2);
    text(direction+"°",((3/5)*windowWidth),windowHeight-menuHeight/2+20);

    //humidité
    image(drop,((4/5)*windowWidth)-(vent.width/3)/2,windowHeight-menuHeight-(vent.width/3)/2,temperature.width/3,temperature.height/3);
    text(hum+" %",((4/5)*windowWidth),windowHeight-menuHeight/2);

      image(jauge,windowWidth/3.5,0,182,41);
  }
}



function drawData() {
  // Clear the canvas
clear();

  for (var i = 0; i < 400; i++) {
    //clear();
    // Get the lat/lng of Point
    var dataID = data[i].id;
    var latitude = data[i].location.latitude;
    var longitude = data[i].location.longitude;
    var dataValue = data[i].sensordatavalues[1].value;

      //textAlign(CENTER);
      //text(dataID, 0, height - 30, width, 30);
    	//text(latitude, 0, height - 60, width, 30);

    if (myMap.map.getBounds().contains({lat: latitude, lng: longitude})) {
      // Transform lat/lng to pixel position
      var pos = myMap.latLngToPixel(latitude, longitude);
      noStroke();
      size = map(dataValue, 0, 1000000, 1, 600) + myMap.zoom();
      strokeWeight(4);
      stroke(51);
      //ellipse(pos.x, pos.y, 20+(dataValue*0.5) , 20+(dataValue*0.5));

console.log(dataValue);

      if(dataValue<10){
        ellipse(pos.x, pos.y, 20 , 20);
        fill(255);
      }

       if(dataValue>=10 && data<20){
        fill(200);
        ellipse(pos.x, pos.y, 30 , 30);
      }

      else if(dataValue>=20 && data<30){
        fill(160);
        ellipse(pos.x, pos.y, 40 , 40);
      }

      else if(dataValue>=30 && data<40){
        fill(120);
      }

      else if(dataValue>40 && data<50){
        fill(80);
      }

      else if(dataValue>50 && data<60){
        fill(40);
      }

      else if(dataValue>60 && data<70){
        fill(0);
      }




      //textSize(20);
      //text(dataValue, pos.x-30, pos.y+20, 60, 60);
    }
  }
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}
