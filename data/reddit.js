var toTag = '.author';

function loadConnections(connections) {
  var linksToRedditor = function(url, reddituser) {
    if (url.hasAttribute('href')) {
      var idx = url.getAttribute('href').toLowerCase().indexOf(reddituser.toLowerCase());
      return idx !== -1;
    }
  }
  var isTagged = function(url, stravaid) {
    return url.classList.contains('stravatagged');
  }
  var addTag = function(url, stravaid) {
    var nextsib = url.nextSibling;
    var dad = url.parentNode;
    var stravalink = document.createElement('a');
    stravalink.href = 'https://www.strava.com/athletes/' + stravaid;
    stravalink.textContent = 'Strava';
    stravalink.classList.add('redditstravatag');
    dad.insertBefore(stravalink, nextsib);
    url.classList.add('stravatagged');
  }
  var mapTags = function() {
    var urls = document.querySelectorAll(toTag);
    for (var i = 0; i < urls.length; i++) {
      for (var connection in connections) {
        if (linksToRedditor(urls[i], connections[connection])) {
          if (!isTagged(urls[i], connection)) {
            addTag(urls[i], connection);
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

self.port.on('currentconnections', loadConnections);
