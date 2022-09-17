Webcam.set({
    width:350,
    height:300,
    image_format: 'png',
    png_quality:90
});

camera = document.getElementById("camera");

Webcam.attach('#camera');

function take_snapshot(){
    Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
    });

}

console.log('ml5 version:', ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/1tmM2wT05/model.json', modelLoaded);

function modelLoaded(){
    console.log('Model Loaded!');
}

function speak(){
    var synth = window.speechSynthesis;
    speak_data_1 = "The first prediction is " + prediction_1;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1)
    synth.speak(utterThis);
}

function check(){
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResult);
}

function gotResult(error, results){
    if (error){
        console.error(error);
    } else {
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML = results[0].label;
        prediction_1 = results[0].label;
        speak();

        if(results[0].label == "Thumbs Up"){
            document.getElementById("update_emoji").src = "https://images.emojiterra.com/google/android-10/512px/1f44d.png";
        }
        if(results[0].label == "Victory"){
            document.getElementById("update_emoji").src = "https://c.tenor.com/d-mxCfVUGyMAAAAM/hand-emoji-victory.gif";
        }
        if(results[0].label == "Nice"){
            document.getElementById("update_emoji").src = "https://cdn-icons-png.flaticon.com/512/2165/2165851.png";
        }
        if(results[0].label == "Pointing"){
            document.getElementById("update_emoji2").src = "https://media0.giphy.com/media/eIarelIdwLsn7Yzk89/giphy.gif?cid=6c09b9528d2ewapjxqp3ke4xolhu4jy89i951v0biu2fvb6p&rid=giphy.gif&ct=s"
        }
        if(results[0].label == "Clap"){
            document.getElementById("update_emoji2").src = "https://c.tenor.com/yICKyE-jYPkAAAAC/wow-clap.gif"
        }  

    }
}