
var insult = {
  init: function () {
    insult.presentation();
    insult.events();
  },
  config: {
    insultString: "",
    wordsArray: [],
    name: ""
  },
  presentation: function () {
    console.log("Presentation");
  },
  events: function () {
    console.log("Events");
  },
  getRandomWord: function() {
    // example from http://randomword.setgetgo.com/
    var requestStr = "http://randomword.setgetgo.com/get.php";
    $.ajax({
        type: "GET",
        url: requestStr,
        dataType: "jsonp",
        jsonpCallback: 'insult.returnWord'
    });
  },

  returnWord: function(data) {
    insult.config.wordsArray.push(data.Word);
  },
  generateWordList: function(numRandom, numBad) {
    insult.config.wordsArray = [];
    for(var i = 0; i < numRandom; i++){
      insult.getRandomWord();
    }
    for(var i = 0; i < numBad; i++){
      insult.config.wordsArray.push(badWordsList.list[_.random(0, badWordsList.list.length)]);
    }
  },
  generateInsultString: function() {

  }


}

$(document).ready(function(){
  insult.init();
});
