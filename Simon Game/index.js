/*
I gathered some guidance on a blogpost that showed how to use an object to run the game instead of a bunch of functions like I had
tried in previous versions. The biggest portion was the animate section. 

However, I did modify a lot of what I saw. I don't have the link handy or I would attribute.

*/

var simonGame = {
  start: function() {
    this.sequence = [];
    this.duplicate = [];
    this.roundCount = 1;
    this.humanPlays = [];
    this.humanClicks = 0;
    this.match = true;
    this.newRound();
    this.strictMode = "off";
  },
  startStrict: function() {
    this.sequence = [];
    this.duplicate = [];
    this.roundCount = 1;
    this.humanPlays = [];
    this.humanClicks = 0;
    this.match = true;
    this.newRound();
    this.strictMode = "on";
    $('#strict').addClass('ignore-clicks');
  },
  resetGame: function() {
    this.sequence = [];
    this.duplicate = [];
    this.roundCount = 1;
    this.humanPlays = [];
    this.humanClicks = 0;
    this.match = true;
    //this.newRound();
    this.strictMode = "off";
    $('#strictActive').removeClass('clicked');
    $('#strict').removeClass('ignore-clicks');
    //$('#strictActive').css({'background-color':'#660000'});
  }
  ,
  newRound: function() {
    console.log("it's time for Round " + this.roundCount);
    $('.gameButtons').off('click');
    this.humanClicks = 0;
    this.humanPlays = [];
    //$('.round').text(this.roundCount);
    $('#roundText').text(this.roundCount);
    this.sequence.push(this.randomButton());
    this.duplicate = this.sequence.slice(0);
    console.log("newRound duplicate: " + this.duplicate);
    console.log(this.sequence);
    $('#whoPlaying').text('Computer is playing...');
    this.animate(this.sequence);
    this.clickable();
  },
  tryAgain: function() {
    console.log("it's time for Round " + this.roundCount);
    $('.gameButtons').off('click');
    this.humanClicks = 0;
    this.humanPlays = [];
    //$('.round').text(this.roundCount);
    $('#roundText').text(this.roundCount);
    //this.sequence.push(this.randomButton());
    //this.sequence = this.sequence.slice(0,(this.sequence.length - 1));
    this.duplicate = this.sequence.slice(0);
    console.log("tryAgain round duplicate: " + this.duplicate);
    console.log(this.sequence);
    $('#whoPlaying').text('Computer is playing...');
    this.animate(this.sequence);
    this.clickable();
  },
  noClick: function() {
    $('#simonCircle').addClass('ignore-clicks');
  },
  allowClick: function() {
    $('#simonCircle').removeClass('ignore-clicks');
  },
  roundCounter: function() {
    this.roundCount++;
  },
  animate: function(sequence) {
    var i = 0;
    var that = this;
    that.noClick();
    var interval = setInterval(function() {
      that.showButton(sequence[i]);
      i++;
      if (i >= sequence.length) {
        clearInterval(interval);
        that.clickable;
        $('#whoPlaying').text("Your turn!");
            that.allowClick();
      }
    }, 1500);
  },
  showButton: function(target) {
    var that = this;
    //play audio
    switch (target) {
      case "#red":
        that.soundRed();
        break;
      case "#blue":
        that.soundBlue();
        break;
      case "#green":
        that.soundGreen();
        break;
      case "#yellow":
        that.soundYellow();
        break;
      default:
        console.log("No sound to play");
    };
    $(target).delay(100).fadeIn(100).fadeOut(100).fadeIn('slow');
  },
  randomButton: function() {
    var num = {
      num: "",
      color: ""
    }

    num.num = Math.floor((Math.random() * 4) + 1);
    console.log("num: " + num.num);
    switch (num.num) {
      case 1:
        num.color = "#red";
        break;
      case 2:
        num.color = "#blue";
        break;
      case 3:
        num.color = "#green";
        break;
      case 4:
        num.color = "#yellow";
        break;
    }
    return num.color;
  },
  soundRed: function() {
    var audio1 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
    audio1.play();
  },
  soundBlue: function() {
    var audio2 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
    audio2.play();
  },
  soundGreen: function() {
    var audio3 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
    audio3.play();
  },
  soundYellow: function() {
    var audio4 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');
    audio4.play();
  },
  wasClicked: function(e) {
    var that = this;
    var target = "#" + e.target.id + "";
    console.log("target wasClicked: " + target);
    that.showButton(target);
    that.humanPlays.push(target);
    console.log("humanPlays: " + this.humanPlays);
    var lookFor = this.duplicate.shift();
    this.match = (lookFor === target);
    console.log("match: " + this.match);
    this.winOrLose();
  },
  clickable: function() {
    var that = this;
    $('.gameButtons').on('click', function(e) {
      that.humanClicks++;
      that.wasClicked(e);
    });
  },
  winOrLose: function() {
    console.log("sequence: " + this.sequence);
    console.log("humanPlays: " + this.humanPlays);
    console.log("humanClicks: " + this.humanClicks);

    if ((this.duplicate.length === 0) && (this.match) && (this.roundCount !== 20)) {
      console.log("correct");
      this.roundCounter();
      this.newRound();
    } else if ((this.duplicate.length === 0) && (this.match) && (this.roundCount == 20)) {
      console.log("Winner!");
      $('#roundText').text("Win!");
    } else if (!this.match) {
      if (this.strictMode !== "off") {
        console.log("You lost, mate!");
        $('#roundText').text("- -");
        $('#roundText').fadeOut(100);
        $('#roundText').fadeIn(100);
        $('#roundText').fadeOut(100);
        $('#roundText').fadeIn(100);
        $('#roundText').fadeOut(100);
        $('#roundText').fadeIn(100);
        $(this).roundCount = 1;
        //$('#roundText').text(this.roundCount);
        $('#strict').removeClass('ignore-clicks');
        //make beep
      } else if (this.strictMode == "off") {
        this.soundRed();
        this.soundRed();
        $('#roundText').fadeOut(100);
        $('#roundText').fadeIn(100);
        $('#roundText').fadeOut(100);
        $('#roundText').fadeIn(100);
        $('#roundText').fadeOut(100);
        $('#roundText').fadeIn(100);
        this.tryAgain();
      }
    }
  },

}

$(document).ready(function() {
  $('#strict').click(function() {
    $('#strictActive').toggleClass('clicked');
  });
  $('#resetBoard').click(function(){
    $('#roundText').text("- -");
    simonGame.resetGame();
  })
  $('#start').click(function() {
    if ($('#strictActive').hasClass('clicked')) {
      console.log("starting in strict mode");
      simonGame.startStrict();
    } else {
      console.log("starting in not strict mode");
      simonGame.start();
    }
  })
})
