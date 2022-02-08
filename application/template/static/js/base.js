var dropFileForm = document.getElementById("dropFileForm");
var fileLabelText = document.getElementById("fileLabelText");
var uploadStatus = document.getElementById("uploadStatus");
var fileInput = document.getElementById("fileInput");
var predictions = document.getElementById("predictions");
var validFile = false;
var droppedFiles;

function overrideDefault(event) {
  event.preventDefault();
  event.stopPropagation();
}

function fileHover() {
  dropFileForm.classList.add("fileHover");
}

function fileHoverEnd() {
  dropFileForm.classList.remove("fileHover");
}

function addFiles(event) {
  droppedFiles = event.target.files || event.dataTransfer.files;
  showFiles(droppedFiles);
}

function showFiles(files) {
    var exte = files[0].name.split('.')[1];
    if (exte == 'png' || exte == 'jpg') {
      fileLabelText.innerText = files[0].name;
      validFile = true;
    }
    else{
      fileLabelText.innerText = 'File type not allowed. Use either .jpg or .png file.';
    }
  }

function uploadFiles(event) {
  event.preventDefault();
  if (validFile) {
  var formData = new FormData();

  for (var i = 0, file; (file = droppedFiles[i]); i++) {
    formData.append(fileInput.name, file, file.name);
  }

  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function(data) {
    console.log(xhr.response);
  };


  xhr.onload = function() {
    var response = JSON.parse(this.responseText);
    var predictedClass = response.class_name;
    console.log(predictedClass);
    if( predictedClass != ''){
        predictions.textContent = 'Prediction for uploaded image : ' + predictedClass +'.';
        predictions.style.display = "inline";
        predictions.style.fontSize = "30px";
        predictions.style.paddingLeft = "50px";
    }
    else{
        predictions.style.display = "none";
    }
}

  xhr.open(dropFileForm.method, dropFileForm.action, true);
  xhr.send(formData);
  fileLabelText.innerText = "Choose a file or drag it here";
  dropFileForm.reset();
  validFile = false;
}
}

// function changeStatus(text) {
//   uploadStatus.innerText = text;
// }





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






// ###############################

