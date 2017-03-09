//Show the Local Weather Project for FreeCodeCamp
//Created by Kevin Mulligan <kevinamulligan@gmail.com>

//global variables
var appID = "f046c726db2f18009cffe47f77163c73";

//we're ready
$(document).ready(function() {

  var numLatitude;
  var numLongitude;
  var latitude, longitude;
  var numZip, zip;

  $.getJSON('http://freegeoip.net/json/?callback=?', function(ipData) {
    console.log(JSON.stringify(ipData, null, 2));
    numLatitude = ipData.latitude;
    latitude = numLatitude.toString();
    console.log(latitude);
    console.log(typeof latitude);
    numLongitude = ipData.longitude;
    longitude = numLongitude.toString();
    console.log(longitude);
    numZip = ipData.zip_code;
    zip = numZip.toString();
    console.log(zip);

  //Let's grab our latitude and longitude and store it in variables

  /*
  *** No longer works ***
  *** geolocation requests must be
      via https:
      switched to freegeoip.net above
  ***                 ***

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
      console.log("latitude: " + latitude);
      console.log("longitude: " + longitude);*/

  console.log(latitude);
  console.log(longitude);
  console.log("http://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&APPID=f046c726db2f18009cffe47f77163c73");
  //now let's insert our lat/long variables into a weather API call with our global APPID, and insert some key/values into some containers
  $.getJSON("http://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&APPID=f046c726db2f18009cffe47f77163c73", function(weatherData) {
    $("#cityName").html("The weather in " + weatherData.name);
    $("#weatherIcon").html("<i class='wi wi-fw wi-owm-" + weatherData.weather[0].id + "'></i>");
    $("#weatherDescription").html(weatherData.weather[0].description);
    var kelvin = weatherData.main.temp;
    var fahrenheit = Math.floor(((kelvin - 273.15) * 1.8) + 32);
    var celsius = Math.floor(kelvin - 273.15);
    $("#temp").html(fahrenheit + " degrees Fahrenheit");
    $("#seeFahrenheit").on("click", function() {
      $("#temp").html(fahrenheit + " degrees Fahrenheit");
    });
    $("#seeCelsius").on("click", function() {
      $("#temp").html(celsius + " degrees Celsius");
    });

    function weatherDisplay() {
      if (fahrenheit <= 32) {
        return "Brrr, it's cold!";
      } else if ((fahrenheit > 32) && (fahrenheit <= 45)) {
        return "Probably going to need a jacket and a scarf.";
      } else if ((fahrenheit > 45) && (fahrenheit <= 60)) {
        return "Could be a bit brisk. I'd bring a jacket.";

      } else if ((fahrenheit > 60) && (fahrenheit <= 80)) {
        return "It's a nice temperature outside.";
      } else if (fahrenheit > 80) {
        return "Phew, it's hot out!";
      }
    }
    $("#weatherComment").html(weatherDisplay);
  })
})
});
