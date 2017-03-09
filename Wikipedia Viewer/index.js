function findTitles() {
  var searchInput = document.getElementById("searchFor").value;
  var wikiUrl = "https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=info|pageimages|extracts&inprop=url&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=" + searchInput + "&exsentences=4&callback=?";

  $.getJSON(wikiUrl, function(data) {
    for (var key in data.query.pages) {
      console.log("key: " + key);
      var articleTitle = data.query.pages[key].title;
      console.log(articleTitle);
      var extract = data.query.pages[key].extract;
      console.log(extract);
      var articleUrl = data.query.pages[key].fullurl;
      console.log(articleUrl);
      $("#insertHere").append("<div class='article'><div class='articleTitle'><a href='" + articleUrl + "'>" + articleTitle + " <div class='smallTitle'>(Click to read more)</div></a></div>" + "<p class='articleExtract'>" + extract + "</p></div><p></p>");
    }
  })
}

$(document).ready(function() {
  $('form').on('submit', function(event) {
    $('#insertHere').empty();
    event.preventDefault();
    findTitles();
  })

  $('#randomArticle').click(function() {
    window.open("http://en.wikipedia.org/wiki/Special:Random");
  })
})
