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
    apiKey: "",
    numInsults: 5,
    voice: "UK English Female",
    voiceArray: [],
    voiceStr: ""
  },
  presentation: function () {
    insult.getVoiceList();
    insult.buildVoiceList();
    $('.dropdown-content ul').html(insult.config.voiceStr);
    annyang.addCommands(insult.commands);
  },
  events: function() {
    // thanks Brandon!
    $(".giantButton").on("click", function(event){
      event.preventDefault();
      insult.config.name =  $("input[name='name']").val();
      insult.deployInsult();
    });

    $(".smallButtonArea").on("click", ".smallButton", function(event){
      responsiveVoice.speak(insult.config.insultString, insult.config.voice);
    });

    $("body").on("keydown", function(event){
      if(event.keyCode === 32){
        annyang.start();
      }
      setTimeout(annyang.abort, 10000);
    })

    $('.dropdown').on("click", "a", function(event){
      event.preventDefault();
      insult.config.voice = $(this).data('voice');
      $('.dropdown-content').css({display: 'none'});
      $(".dropdown h3").text($(this).data("voice"));
    });

    $('.dropdown').hover(function(event){
      $('.dropdown-content').removeAttr('style');
    })

  },
  deployInsult: function(){
    if($("input[name='numInsults']").val()) {
      insult.config.numInsults = $("input[name='numInsults']").val();
    }
    var rand = insult.getRandomInsultNumbers();
    var button = '<button class="smallButton">Play Again</button>';
    insult.generateWordList(rand[0], rand[1]);
    insult.generateInsultString();
    $(".insultText").html(insult.config.insultString);
    responsiveVoice.speak(insult.config.insultString, insult.config.voice);
    $('.smallButtonArea').html(button);
  },
  getRandomInsultNumbers: function(){
    var firstNumber = _.random(0, insult.config.numInsults);
    var secondNumber = (insult.config.numInsults - firstNumber);
    return [firstNumber, secondNumber];
  },
  getRandomWords: function() {
    var requestStr = "";
    $.ajax({
        type: "GET",
        url: requestStr,
    }).success(insult.returnWords);
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
    });
    insult.config.insultString += "!";
  },
  getVoiceList: function(){
    insult.config.voiceArray = responsiveVoice.getVoices();
  },
  displayVoice: function(data, str){
    var tmpl = _.template(str);
    return tmpl(data);
  },
  buildVoiceList: function(){
    insult.config.voiceArray.forEach(function(el){
      insult.config.voiceStr += insult.displayVoice(el, templates.voice);
    });
  },
  getSpokenName: function(name){
    console.log("Insulting!");
    insult.config.name = name;
    insult.deployInsult();
  },
  commands: {
    "insult *name": function(name){insult.getSpokenName(name)},
  }
};

$(document).ready(function(){
  insult.init();
});
