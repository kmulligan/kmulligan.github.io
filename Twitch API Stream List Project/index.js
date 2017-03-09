  function findStreamer(username) {

    var listOfStreams = username;
    var streamStatus;
    var channelStatus;
    var aboutChannel;
    var streamUrl;
    var streamLogo;

    var name = username;
    var clientId = "78jc7hbkkn9968pmkouvin46ci8ov3q";
    
    $.ajax({
      type: 'GET',
      url: 'https://api.twitch.tv/kraken/streams/' + name,
      headers: {
        'Client-ID': '78jc7hbkkn9968pmkouvin46ci8ov3q'
      },
      success: function(stream) {
        console.log(stream);
        console.log("Stream Status: " + stream.status);

        if (stream.stream == null) {
          streamStatus = "Offline";
          aboutChannel = "Offline";
          $("#insertHere").append("<tr id='offline'><td>" + name + "</td><td>Offline</td><td>Offline</td></tr>");
        } else {
          streamStatus = "Live!";
          aboutChannel = stream.stream.channel.status;
          streamUrl = stream.stream.channel.url;
          $("#insertHere").append("<tr class='online'><td>" + name + "</td><td><a href='" + streamUrl + "'>" + streamStatus + "</a></td><td><a href='" + streamUrl + "'>" + aboutChannel + "</td></tr>");
          //}
        }
      },
      error: (function() {
        $("#insertHere").append("<tr><td>" + name + "</td><td>Account Closed</td><td>Account Closed</td></tr>");
      })
    });
  }

  /* OLD -- TWITCH API REQUIRES CLIENT_ID HEADER NOW, SWITCHED TO AJAX CALL ABOVE
    $.getJSON(streamApiUrl, function(stream) {
      //$("#channelList").append("<li>" + name + "</li>");
      console.log("Stream Status: " + stream.status);
      //if (stream.status === 422) {
        //$("#insertHere").append("<tr><td>" + name + "</td><td>Account Closed</td><td>Account Closed</td></tr>");
      //} else {

        if (stream.stream == null) {
          streamStatus = "Offline";
          aboutChannel = "Offline";
          //console.log("stream is null: " + streamStatus);
          //$("#channelStatus").append("<li>Offline</li>");
          //$("#streamStatus").append("<li>Nothing to see here</li>");
          $("#insertHere").append("<tr id='offline'><td>" + name + "</td><td>Offline</td><td>Offline</td></tr>");
        } else {
          streamStatus = "Live!";
          aboutChannel = stream.stream.channel.status;
          streamUrl = stream.stream.channel.url;
          //streamLogo = stream.stream.channel.logo;
          //console.log("stream is not null: " + streamStatus);
          //console.log("stream is not null about channel :" + aboutChannel);
          //$("#channelStatus").append("<li>" + streamStatus + "</li>");
          //$("#streamStatus").append("<li>" + aboutChannel + "</li>");
          $("#insertHere").append("<tr class='online'><td>" + name + "</td><td><a href='" + streamUrl + "'>" + streamStatus + "</a></td><td><a href='" + streamUrl + "'>" + aboutChannel + "</td></tr>");
        //}
      }
    })
    .error(function() { 
      $("#insertHere").append("<tr><td>" + name + "</td><td>Account Closed</td><td>Account Closed</td></tr>");
    });
  }
*/
  $(document).ready(function() {
    //we want to write the function separate from cycling through the list... we call the function to cycle through the list later.
    var listOfStreamsOriginal = ["dota2ti", "ixmike88", "freecodecamp", "ESL_Dota2", "BeyondTheSummit", "comster404", "grayhairgaming", "WagamamaTV"];
    for (var x = 0; x < listOfStreamsOriginal.length; x++) {
      var username = listOfStreamsOriginal[x];
      findStreamer(username);
    }
  });
