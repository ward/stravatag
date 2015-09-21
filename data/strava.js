var allTags = {};

toTag = ".athlete-name.minimal, .athlete-name, .minimal"; //classes to tag

function loadTags(items) {

    allTags = items;

    //add tag to the user's page
    if (window.location.href.indexOf(".com/athletes/") > -1) {
      var desc = document.getElementsByClassName("description")[0];
      for (var tag in allTags) {
        if (window.location.href.indexOf(tag) > -1 ){
          var name = desc.getElementsByTagName("h3")[0];
          name.innerHTML += " \(" + allTags[tag] + "\)";
        }
      }
    }

    function mapTags() {
      //load all athlete urls
      var urls = $(toTag);

      //iterate over athletes
      for (var i=0; i<urls.length; i++){

        //iterate over tags
        for (var tag in allTags) {
          //console.log(tag);
          //if our guy, tag
          if (urls[i].hasAttribute("href"))
          if (urls[i].getAttribute("href").indexOf(tag) > -1){
            //unless already tagged
              if (urls[i].innerHTML.indexOf(" \(" + allTags[tag] + "\)") == -1 )
                urls[i].innerHTML += " \(" + allTags[tag] + "\)";
          }
        }
      }
    }

    var curLength=0;
    setInterval(function(){
      if ($(toTag).length!=curLength){
        curLength=$(toTag).length;
        mapTags();
      }
    },100);

}

// Receive tags from index.js
self.port.on("currentTags", function(tags) {
  loadTags(tags);
});
