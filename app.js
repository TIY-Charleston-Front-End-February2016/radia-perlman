
var insult = {
  init: function () {
    insult.presentation();
    insult.events();
  },
  config: {
    insultString: "",
    wordsArray: [],
    randomArray: testList.list,
    name: "",
    apiKey: ""
  },
  presentation: function () {
    // insult.getRandomWords();
  },
  events: function () {
    // thanks Brandon!
    $(".giantButton").on("click", function(event){
      event.preventDefault();
      insult.config.name =  $("input[name='name']").val();
      insult.generateWordList(3,2);
      insult.generateInsultString();
      $(".insultText").html(insult.config.insultString);
      responsiveVoice.speak(insult.config.insultString)
    });

    // small button appears
    $('.giantButton').on('click', function(event) {
      event.preventDefault();
          var button = '<button class="smallButton">Play Again</button>';
          $('.smallButtonArea').append(button);
    });

    $(".smallButton").on("click", function(event){
      responsiveVoice.speak(insult.config.insultString)
    });


  },
  getRandomWords: function() {
    var requestStr = "";
    $.ajax({
        type: "GET",
        url: requestStr,
    }).success(insult.returnWords)
  },
  returnWords: function(data) {
    insult.config.randomArray = data;
  },
  generateWordList: function(numRandom, numBad) {
    insult.config.wordsArray = [];
    for(var i = 0; i < numRandom; i++){
      insult.config.wordsArray.push(insult.config.randomArray[_.random(0, insult.config.randomArray.length)]);
    }
    for(var i = 0; i < numBad; i++){
      insult.config.wordsArray.push(badWordsList.list[_.random(0, badWordsList.list.length)]);
    }
  },
  generateInsultString: function() {
    insult.config.insultString = "";
    insult.config.insultString = insult.config.name + " is a ";
    insult.config.wordsArray.forEach(function(el){
      return insult.config.insultString += el + " ";
    })
    insult.config.insultString += "!";
  }

}



$(document).ready(function(){
  insult.init();
});
