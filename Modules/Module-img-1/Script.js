
var result;
var tempresult;
var poses = [];
let x ;
var imginput;
var img ;
var canvas;
/*function preload() {
	 
 let input = createFileInput(handleFile);
  input.position(500, 500);
  
  
  function handleFile(file){
	 
	 tempresult = file.data;
	  let result = loadJSON(tempresult, drawEarthquake);
	  
	  function drawEarthquake(res){
		  
		  poses = res;
		  console.log(poses);
	  }
 
 //console.log(poses);
 //console.log(poses[0].0.leftAnkle.x);

 //console.log(typeof posea);
  }
  
  
  
 
}*/

function handleimg(file){
	  
	  if (file.type === 'image') {
	  img = createImg(file.data);
	 
	
	  
	  
	  img.hide();
	  x = 2;
	  }
  }
  



function setup(){
	console.log("waiting");
	
canvas	 =  createCanvas(400, 400);
let divi = select(".module-container-canvas");
canvas.parent(divi);
imginput = createFileInput(handleimg);
imginput.id("canvas-input"); 
	//img = createImg('data/FJAFFW.jpg');
	//console.log(img.width);
	//console.log(img.size());
	
	
}

function draw(){
	
	if(x == 2){
	 resizeCanvas(img.width, img.height);
	 
	  // set some options

    let options = {
        imageScaleFactor: 1,
        minConfidence: 0.1
    }
    
    // assign poseNet
    poseNet = ml5.poseNet(modelReady, options);
    // This sets up an event that listens to 'pose' events
    poseNet.on('pose', function (results) {
        poses = results;
		console.log(poses);
    });
	
	 function modelReady() {
    //select('#status').html('Model Loaded');
     
    // When the model is ready, run the singlePose() function...
    // If/When a pose is detected, poseNet.on('pose', ...) will be listening for the detection results 
    // in the draw() loop, if there are any poses, then carry out the draw commands
    poseNet.singlePose(img)
}

	 
	 x = 3;
	}
	 
	if(img != null && poses.length > 0){
	image(img,0,0,width,height);
    drawknee(poses);
	noLoop();
	}
	
}



function drawknee(){
	
	let posee = poses["0"].pose.rightEar;
	let posek = poses["0"].pose.rightKnee;
	let posea = poses["0"].pose.rightAnkle;
	let poseh = poses["0"].pose.rightHip;
	console.log(poses[0]);
	
	console.log(poseh.x);
	console.log(poseh.y);
	fill(255);
                stroke(20);
                strokeWeight(4);
                ellipse(round(posek.x), round(posek.y), 8, 8);
				 ellipse(round(posea.x), round(posea.y), 8, 8);
				  ellipse(round(poseh.x), round(poseh.y), 8, 8);
				  
	var dx1 = poseh.x - posek.x;
    var dy1 = poseh.y - posek.y;
    var dx2 = posea.x - posek.x;
    var dy2 = posea.y - posek.y;
    var a1 = Math.atan2(dy1, dx1);
    var a2 = Math.atan2(dy2, dx2);
    var a = parseInt((a2 - a1) * 180 / Math.PI + 360) % 360;			  
				  if(a > 190){
					  a = 360 - a;
				  }
				console.log("angle " + a);  
				textSize(32);
				  text('angle :'+ a, posek.x + 10, posek.y + 10);
				  
		let texti = text("The Angle of Front Leg is" + a );		
		console.log(texti);
let info = select(".information");
	
				  console.log("y :" + posee.y);
				 // save(poses, 'my.json');
				  
		  
}
