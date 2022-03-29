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

  overrideDefault(event)

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
      $('.nav').addClass('affix');
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
      $('.nav').removeClass('affix');
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

$('.button').click(function(event){
  var buttonId = $(this).attr('id');
  $('#modal-container').removeAttr('class').addClass(buttonId);
  $('body').addClass('modal-active');
  event.preventDefault();
})

$('#modal-container').click(function(event){
  $(this).addClass('out');
  $('body').removeClass('modal-active');
});