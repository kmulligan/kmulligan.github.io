/*

I found the interval timer on ... I believe stackoverflow, but I can't find the link. Modified it, but the actual setInterval part came from there.

*/

var pomoTimer = {
  entry: 0,
  countdownFrom: 0,

  start: function() {
    var self = this;
      this.interval = setInterval(function() { 
        console.log("pomoTimer is ticking");
        self.countdownFrom -= 1;
        var minutes = parseInt(self.countdownFrom / 60, 10);
        var seconds = parseInt(self.countdownFrom % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        var display = minutes + ":" + seconds;

        if (self.countdownFrom > 0) {
          $('#newClock').text(display);
        } 
        else {
          $('#newClock').text("Break!");
          $('.clockContainer').hide();
          $('.breakClockContainer').css({'margin-left':'0px'});
          $('.breakClockContainer').show();
        }
      }, 1000);
    }
  };

var breakTimer = {
  entry: 0,
  countdownFrom: 0,

  start: function() {
    var self = this;
    this.interval = setInterval(function() {
      self.countdownFrom -= 1;
      var minutes = parseInt(self.countdownFrom / 60, 10);
      var seconds = parseInt(self.countdownFrom % 60, 10);

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;
      var display = minutes + ":" + seconds;

      if (self.countdownFrom >= 0) {
        $('#breakClock').text(display);
      } 
      else if (self.countdownFrom < 0) {
        window.location.reload(true);
      }
    }, 1000);
  },
};

$(document).ready(function() {
  $('#breakContainer').hide();
  $('.clockContainer').hide();
  $('.breakClockContainer').hide();
  $('#customPomoForm').hide();
  $('#customBreakForm').hide();
  $('#startOver').hide();
  $('#stopButton').hide();
  $('#stopButtonBreak').hide();
  $('#pomo25').click(function() {
    pomoTimer.entry = 25;
    pomoTimer.countdownFrom = 25 * 60;
    $('#newClock').text("25:00");
    $('#breakContainer').css({'margin-left':'0px'});
    $('#breakContainer').show();
    $('#pomoContainer').hide();
  })
  $('#pomoCustom').click(function() {
        $('#customPomoForm').css({'margin-left':'0px'});
    $('#customPomoForm').toggle();
  })

  $('#customPomoForm').on('submit', function(event) {
    pomoTimer.entry = document.getElementById('customPomoEntry').value;
    $('#newClock').text(pomoTimer.entry + ":00");
    pomoTimer.countdownFrom = pomoTimer.entry * 60;
    event.preventDefault();
    $(this).hide();
    $('#pomoContainer').hide();
    $('#breakContainer').css({'margin-left':'0px'});
    $('#breakContainer').show();
  })
  $('#pomo5').click(function() {
    breakTimer.entry = 5;
    breakTimer.countdownFrom = 5 * 60;
    $('#breakClock').text("5:00");
    $('#breakContainer').hide();
    $('.clockContainer').css({'margin-left':'0px'});
    $('.clockContainer').show();
  })
  $('#pomoBreakCustom').click(function() {
    $('#customBreakForm').css({'margin-left':'0px'});
    $('#customBreakForm').toggle();
    $('#customBreakForm').on('submit', function(event) {
      breakTimer.entry = document.getElementById('customBreakEntry').value;
      $('#breakClock').text(breakTimer.entry + ":00");
      breakTimer.countdownFrom = breakTimer.entry * 60;
      event.preventDefault();
      $(this).hide();
      $('#breakContainer').hide();
      $('.clockContainer').css({'margin-left':'0px'});
      $('.clockContainer').show();
    })
  })
  $('#startButton').click(function() {
    $(this).hide();
    $('#stopButton').show();
    pomoTimer.start();
    var time = pomoTimer.entry * 60 * 1000;
    setTimeout(function(){breakTimer.start();},time);
    var totalTime = time + (breakTimer.entry * 60 * 1000);
    setTimeout(function(){window.location.reload(true);},totalTime);
  })

  $('#startButtonBreak').click(function() {
    $(this).hide();
    $('#stopButtonBreak').show();
    breakTimer.start();
  })

  $('#stopButton').click(function() {
    $('#newClock').text("");
    pomoTimer.countdownFrom = 0;
  })

  $('#stopButtonBreak').click(function() {
    $('#breakClock').text("");
    breakTimer.countdownFrom = 0;
  })
})
