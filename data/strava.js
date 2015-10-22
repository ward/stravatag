var toTag = ".athlete-name.minimal, .athlete-name, .minimal, td.name>a, li>div.h4.topless>a"; //classes to tag

self.port.on('currentconnections', function(connections) {
  loadConnections(connections);
  loadAthleteConnection(connections);
});

function loadConnections(connections) {
  var linksToAthlete = function(url, stravaid) {
    return url.hasAttribute('href') && url.getAttribute('href').indexOf(stravaid) > -1;
  };
  var isTagged = function(url, reddituser) {
    return url.classList.contains('reddittagged');
  };
  var addTag = function(url, reddituser) {
    var nextsib = url.nextSibling;
    var dad = url.parentNode;
    var redditlink = document.createElement('a');
    redditlink.href = 'https://www.reddit.com/u/' + reddituser;
    redditlink.textContent = ' (/u/' + reddituser + ')';
    dad.insertBefore(redditlink, nextsib);
    url.classList.add('reddittagged');
  };
  var mapTags = function() {
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

  // check every second whether there is a need to tag
  var elementCount = 0;
  setInterval(function() {
    var currCount = document.querySelectorAll(toTag).length;
    if (elementCount !== currCount) {
      elementCount = currCount;
      mapTags();
    }
  }, 1000);
}

/**
 * On an athlete's page, adds a line below their name with a link to their
 * reddit profile. Only if we have a connection saved.
 */
function loadAthleteConnection(connections) {
  //add tag to the user's page
  if (window.location.href.indexOf(".com/athletes/") > -1) {
    var reddituser = null;
    for (var stravaid in connections) {
      if (window.location.href.indexOf(stravaid) > -1 ){
        reddituser = connections[stravaid];
      }
    }
    if (reddituser !== null) {
      var desc = document.getElementsByClassName("description")[0];
      var name = desc.getElementsByTagName("h3")[0];
      // Create the element
      var taghead = document.createElement('h6');
      var taglink = document.createElement('a');
      taglink.href = 'https://www.reddit.com/u/' + reddituser;
      taglink.textContent = '/u/' + reddituser;
      taghead.appendChild(taglink);
      // Inserts after name
      desc.insertBefore(taghead, name.nextSibling);
    }
  }
}
