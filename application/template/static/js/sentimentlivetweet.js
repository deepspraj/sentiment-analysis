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