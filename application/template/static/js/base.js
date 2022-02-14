var form = document.getElementById("form");
var text = document.getElementById("sech_txt_inpt");
var happy = document.getElementById('happy');
var neutral = document.getElementById('neutral');
var sad = document.getElementById('sad');
var sentiment = document.getElementById('predictedSentiment');


function overrideDefault(event) {
  event.preventDefault();
  event.stopPropagation();
}

function truncator(str, length, ending) {
  if (length == null) {
    length = 100;
  }
  if (ending == null) {
    ending = '...';
  }
  if (str.length > length) {
    return str.substring(0, length - ending.length) + ending;
  } else {
    return str;
  }
};




function getText(event) {
  event.preventDefault();

  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function(data) {    
    console.log(xhr.response);
  };
  xhr.onload = function() {
    var response = JSON.parse(this.responseText);
    var predictedSentiment = response.prediction;
    var query = response.query
    var dict = { 0 : "Happy", 1 : "Neutral", 2: "Sad"}

    console.log(predictedSentiment);
    if (query != ""){
      sentiment.style.display = "block";
      if (query.length < 100){
        sentiment.innerHTML = "Sentiment for <b>" + query + "</b> is <b>" + dict[predictedSentiment] + "</b>.";
      }
      else{
        sentiment.innerHTML = "Sentiment for <b>" + truncator(query) + "</b> is <b>" + dict[predictedSentiment] + "</b>.";
      }
      if (predictedSentiment == 0) {
        happy.style.filter = "drop-shadow(0 0 0.75rem white)"
        neutral.style.filter = "None"
        sad.style.filter = "None"
      }
      else if (predictedSentiment == 1){
        happy.style.filter = "None"
        neutral.style.filter = "drop-shadow(0 0 0.75rem white)"
        sad.style.filter = "None"
      }
      else{
        happy.style.filter = "None"
        neutral.style.filter = "None"
        sad.style.filter = "drop-shadow(0 0 0.75rem white)"
      }
  }
}

  xhr.open(form.method, form.action, true);
  xhr.send(text.value);
  text.value = ""
}


// ###########################################################
// navgation bar script


$('.navTrigger').click(function () {
  $(this).toggleClass('active');
  console.log("Clicked menu");
  $("#mainListDiv").toggleClass("show_list");
  $("#mainListDiv").fadeIn();
});



// Function used to shrink nav bar removing paddings and adding black background
$(window).scroll(function() {
  if ($(document).scrollTop() > 500) {
      $('.navBar').addClass('affix');
      document.getElementById("home").style.color = "#000000";
      if ($(window).width() < 768){
        document.getElementById("sentiment").style.color = "#ffffff";
        document.getElementById("emotion").style.color = "#ffffff";
        document.getElementById("1bar").style.backgroundColor = "#000000";
        document.getElementById("2bar").style.backgroundColor = "#000000";
        document.getElementById("3bar").style.backgroundColor = "#000000";
      }
      else{
        document.getElementById("sentiment").style.color = "#000000";
        document.getElementById("emotion").style.color = "#000000";
      }
  } else {
      $('.navBar').removeClass('affix');
      document.getElementById("home").style.color = "#ffffff";
      document.getElementById("sentiment").style.color = "#ffffff";
      document.getElementById("emotion").style.color = "#ffffff";
      if ($(window).width() > 768){
        document.getElementById("sentiment").style.color = "#ffffff";
        document.getElementById("emotion").style.color = "#ffffff";
      }
      else{
        document.getElementById("1bar").style.backgroundColor = "#ffffff";
        document.getElementById("2bar").style.backgroundColor = "#ffffff";
        document.getElementById("3bar").style.backgroundColor = "#ffffff";
      }
  }
});


// ###########################################################
// pop up script
// A $( document ).ready() block.
$(document).ready(function(){
  $('#exampleModal').modal('show');
});


// audio recorder
// credits : https://codepen.io/robert_bakiev/pen/VpoLYo?editors=0010

var msg_box = document.getElementById( 'msg_box' ),
    button = document.getElementById( 'button' ),
    canvas = document.getElementById( 'canvas' ),
lang = {
    'mic_error': 'Error accessing the microphone', //Ошибка доступа к микрофону
    'press_to_start': 'Press to start recording', //Нажмите для начала записи
    'recording': 'Recording', //Запись
    'play': 'Play', //Воспроизвести
    'stop': 'Stop', //Остановить
    'download': 'Download', //Скачать
    'use_https': 'This application in not working over insecure connection. Try to use HTTPS'
},
time;


msg_box.innerHTML = '<a href="#" class="txt_btn" style="font-size: 2vw;">' + lang.press_to_start + '</a>';

if ( navigator.mediaDevices === undefined ) {
    navigator.mediaDevices = {};
}


if ( navigator.mediaDevices.getUserMedia === undefined ) {
    navigator.mediaDevices.getUserMedia = function ( constrains ) {
        var getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia
        if ( !getUserMedia )  {
            return Promise.reject( new Error( 'getUserMedia is not implemented in this browser' ) );
        }
        return new Promise( function( resolve, reject ) {
            getUserMedia.call( navigator, constrains, resolve, reject );
        } );
    }
}


if ( navigator.mediaDevices.getUserMedia ) {
    var btn_status = 'inactive',
        mediaRecorder,
        chunks = [],
        audio = new Audio(),
        mediaStream,
        audioSrc,
        type = {
            'type': 'audio/wav, codecs=0'
        },
        ctx,
        analys,
        blob;

    button.onclick = function () {
        if ( btn_status == 'inactive' ) {
            start();
        } else if ( btn_status == 'recording' ) {
            stop();
        }
    }

    function parseTime( sec ) {
        var h = parseInt( sec / 3600 );
        var m = parseInt( sec / 60 );
        var sec = sec - ( h * 3600 + m * 60 );

        h = h == 0 ? '' : h + ':';
        sec = sec < 10 ? '0' + sec : sec;

        return h + m + ':' + sec;
    }


    function start() {
        navigator.mediaDevices.getUserMedia( { 'audio': true } ).then( function ( stream ) {
            mediaRecorder = new MediaRecorder( stream );
            mediaRecorder.start();

            button.classList.add( 'recording' );
            btn_status = 'recording';

            document.getElementById('bars').style.display = "block";

            msg_box.innerHTML = '<a href="#" class="txt_btn" style="font-size: 2vw;">' + lang.recording + '</a>';
          
            if ( navigator.vibrate ) navigator.vibrate( 150 );

            time = Math.ceil( new Date().getTime() / 1000 );


            mediaRecorder.ondataavailable = function ( event ) {
                chunks.push( event.data );
            }

            mediaRecorder.onstop = function () {
                stream.getTracks().forEach( function( track ) { track.stop() } );

                blob = new Blob( chunks, type );
                audioSrc = window.URL.createObjectURL( blob );

                audio.src = audioSrc;

                chunks = [];
            }   

            
            
        } ).catch( function ( error ) {
            if ( location.protocol != 'https:' ) {
              msg_box.innerHTML = '<a href="#" class="txt_btn" style="font-size: 2vw;">' + lang.mic_error + '<br>'  + lang.use_https + '</a>';
            } else {
              msg_box.innerHTML = '<a href="#" class="txt_btn" style="font-size: 2vw;">' + lang.mic_error + '</a>'; 
            }
            button.disabled = true;
        });
    }

    function stop() {
        mediaRecorder.stop();
        button.classList.remove( 'recording' );
        btn_status = 'inactive';
      
        document.getElementById('bars').style.display = "none";


        if ( navigator.vibrate ) navigator.vibrate( [ 200, 100, 200 ] );

        var now = Math.ceil( new Date().getTime() / 1000 );

        var t = parseTime( now - time );

        msg_box.innerHTML = '<a href="#" onclick="play(); return false;" class="txt_btn" style="font-size: 2vw;">' + lang.play + ' (' + t + 's)</a><br>' +
                            '<a href="#" onclick="save(); return false;" class="txt_btn" style="font-size: 2vw;">' + lang.download + '</a>'
    }

    

    function play() {
        audio.play();

        document.getElementById('bars').style.display = "block";


        msg_box.innerHTML = '<a href="#" onclick="pause(); return false;" class="txt_btn" style="font-size: 2vw;">' + lang.stop + '</a><br>' +
                            '<a href="#" onclick="save(); return false;" class="txt_btn" style="font-size: 2vw;">' + lang.download + '</a>';
    }

    function pause() {
        audio.pause();
        audio.currentTime = 0;

        document.getElementById('bars').style.display = "none";


        msg_box.innerHTML = '<a href="#" onclick="play(); return false;" class="txt_btn" style="font-size: 2vw;">' + lang.play + '</a><br>' +
                            '<a href="#" onclick="save(); return false;" class="txt_btn" style="font-size: 2vw;">' + lang.download + '</a>'
    }

    function roundedRect(ctx, x, y, width, height, radius, fill) {
        ctx.beginPath();
        ctx.moveTo(x, y + radius);
        ctx.lineTo(x, y + height - radius);
        ctx.quadraticCurveTo(x, y + height, x + radius, y + height);
        ctx.lineTo(x + width - radius, y + height);
        ctx.quadraticCurveTo(x + width, y + height, x + width, y + height - radius);
        ctx.lineTo(x + width, y + radius);
        ctx.quadraticCurveTo(x + width, y, x + width - radius, y);
        ctx.lineTo(x + radius, y);
        ctx.quadraticCurveTo(x, y, x, y + radius);
        
        ctx.fillStyle = fill;
        ctx.fill();
    }

    function save() {
        var a = document.createElement( 'a' );
        a.download = 'record.wav';
        a.href = audioSrc;
        document.body.appendChild( a );
        a.click();
        document.body.removeChild( a );
    }

} else {
    if ( location.protocol != 'https:' ) {
      msg_box.innerHTML = '<a href="#" class="txt_btn" style="font-size: 2vw;">' + lang.mic_error + '<br>'  + lang.use_https + '</a>';
    } else {
      msg_box.innerHTML = '<a href="#" class="txt_btn" style="font-size: 2vw;">' + lang.mic_error + '</a>'; 
    }
    button.disabled = true;
}




// ####################################################################
// Audio waveform 


for (let i = 0; i < 30; i++) {
  const left = i * 2 + 1;
  const anim = Math.floor(Math.random() * 30 + 400);
  const height = Math.floor(Math.random() * 25 + 3);
  console.log(height);

  document.querySelector(
    "#bars"
  ).innerHTML += `<div class="bar" style="left:${left}px;animation-duration:${anim}ms;height:${height}px"></div>`;
}
