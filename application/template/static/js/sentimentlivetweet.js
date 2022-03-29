var form = document.getElementById("form");
var text = document.getElementById("sech_txt_inpt");
var happy = document.getElementById('happy');
var neutral = document.getElementById('neutral');
var sad = document.getElementById('sad');
var sentiment = document.getElementById('predictedSentiment');
var description = document.getElementById('description');
var emoji = document.getElementById('emoji');
var searchbar = document.getElementById('searchbar');
var table2 = document.getElementById('table2');
var headingElement = document.getElementById('heading');



var emojis = ['<span class="happy" id="emojis"><i class="fas fa-smile" aria-hidden="true"></i></span>',
              '<span class="neutral" id="emojis"><i class="fas fa-meh" aria-hidden="true"></i></span>', 
              '<span class="sad" id="emojis"><i class="fas fa-frown" aria-hidden="true"></i></span>'];

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




function getUserName(event) {

  overrideDefault(event)

  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function(data) {    
    console.log(xhr.response);
  };
  xhr.onload = function() {
    var response = JSON.parse(this.responseText);
    var dict = { 0 : "Happy", 1 : "Neutral", 2: "Sad"}
    if (response){
      description.style.display  = "none";
      emoji.style.display  = "none";
      searchbar.style.display  = "none";
      table2.style.display  = "block";

      

      var tweets = [];
      for(var k in response) tweets.push(k);
      
      var value =[];
      for(var k in response) value.push(response[k]);
      console.log(value);

      var items = ['Tweets', "Sentiment"]; 

      var tableDiv = document.getElementById("table2"); 
      var table = document.createElement('TABLE');
      var tbody= document.createElement('TBODY');  
      var tr = document.createElement('TR');

      table.appendChild(tbody);

      //create header
      tbody.appendChild(tr);

      var heading = ["Tweets", "Sentiment"];

        for (var col = 0; col<heading.length; col++)
        {
          var th = document.createElement('TH');
          th.style.color = "#ffffff";
          th.width = table2.clientWidth;
          th.style.paddingBottom = "15px";
          th.appendChild(document.createTextNode(heading[col]));
          tr.appendChild(th);
        }



      for (var f=0; f<tweets.length; f++)
      {
      var tr = document.createElement('TR'); 
            var td1 = document.createElement('TD');
            var td2 = document.createElement('TD');
            td2.style.textAlign = "center";
            td1.style.color = "#ffffff";
            td2.style.color = "#ffffff";
            td1.style.paddingBottom = "15px";
            td2.style.paddingBottom = "15px";
                td1.appendChild(document.createTextNode(tweets[f]));
                td2.innerHTML = emojis[value[f] - 1] ;
                tr.appendChild(td1);
                tr.appendChild(td2);
                tbody.appendChild(tr);
      }
        tableDiv.appendChild(table);
      }
    
  }
  xhr.open(form.method, form.action, true);
  xhr.send(text.value);
  headingElement.innerHTML = "Sentiment Analysis for " + text.value;
  text.value = ""
}