var toTag = ".athlete-name.minimal, .athlete-name, .minimal, td.name>a"; //classes to tag

function loadTags(items) {
  function addTag(ele, tag) {
    ele.innerHTML += " \(" + tag + "\)";
  }
  function isUntagged(ele, tag) {
    return ele.innerHTML.indexOf(" \(" + tag + "\)") == -1;
  }

  var allTags = items;
  //console.log(allTags);

  //add tag to the user's page
  if (window.location.href.indexOf(".com/athletes/") > -1) {
    var desc = document.getElementsByClassName("description")[0];
    var name = desc.getElementsByTagName("h3")[0];
    var tagcontent = '[tag]';
    for (var tag in allTags) {
      if (window.location.href.indexOf(tag) > -1 ){
        tagcontent = allTags[tag];
      }
    }
    // Create the element
    var tagele = document.createElement('h6');
    tagele.textContent = tagcontent;
    tagele.ondblclick = function() {
      var newtag = prompt("Set tag");
      var userid = window.location.href.match(/athletes\/(\d+)/);
      if (userid !== null) {
        self.port.emit('newTag', {id: userid[1], tag: newtag});
      }
    };
    // Inserts after name
    desc.insertBefore(tagele, name.nextSibling);
  }

  function mapTags() {
    //load all athlete urls
    var urls = $(toTag);

    //iterate over athletes
    for (var i=0; i<urls.length; i++){

      //iterate over tags
      for (var tag in allTags) {
        //if our guy, tag
        if (urls[i].hasAttribute("href"))
          if (urls[i].getAttribute("href").indexOf(tag) > -1){
            //unless already tagged
            if (isUntagged(urls[i], allTags[tag]))
              addTag(urls[i], allTags[tag]);
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
  },1000);

}

// Receive tags from index.js
self.port.on("currentTags", function(tags) {
  loadTags(tags);
});

self.port.on('currentconnections', function(connections) {
  loadConnections(connections)
});

function loadConnections(connections) {
  var linksToAthlete = function(url, stravaid) {
    return url.hasAttribute('href') && url.getAttribute('href').indexOf(stravaid) > -1;
  };
  var isTagged = function(url, reddituser) {
    return false; // TODO
  };
  var addTag = function(url, reddituser) {
    var nextsib = url.nextSibling;
    var dad = url.parentNode;
    var redditlink = document.createElement('a');
    redditlink.href = 'https://www.reddit.com/u/' + reddituser;
    redditlink.textContent = '/u/' + reddituser;
    dad.insertBefore(redditlink, nextsib);
  };
  var urls = document.querySelectorAll(toTag);
  for (var i = 0; i < urls.length; i++) {
    for (var connection in connections) {
      if (linksToAthlete(urls[i], connection)) {
        if (! isTagged(urls[i], connections[connection])) {
          addTag(urls[i], connections[connection]);
        }
      }
    }
  }
}
