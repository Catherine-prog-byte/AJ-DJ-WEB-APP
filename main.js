song="";
leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;
scoreleftWrist=0;
function setup() {
    canvas=createCanvas(600,550);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video , modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log("poseNet is Initialized");
}
 
function draw() {
    image(video,0,0,600,550);

    fill("#0501FF");
    stroke("#0501FF");

   if (scoreleftWrist >  0.2)   
 {
    circle(leftWristX,leftWristY,20);
    InNumberleftWristY = Number(leftWristY);
    remove_decimals = floor(InNumberleftWristY);
    volume= remove_decimals/500;
    document.getElementById("volume").innerHTML = "Volume =" +volume;
    song.setVolume(volume);
  }
}

function preload() {
    song=loadSound("music.mp3");
}

function play() {
    song.play();
    song.setVolume(0.5);
    song.rate(1);
}
function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        scoreleftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreLeftWrist =" + scoreleftWrist);
        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX+",leftWristY ="+ leftWristY);
        
        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;
        console.log("rightWritsX = " + rightWristX+",rightWristY ="+ rightWristY);
    }
}