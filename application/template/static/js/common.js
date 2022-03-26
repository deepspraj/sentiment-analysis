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