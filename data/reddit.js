var toTag = '.author';

function loadConnections(connections) {
  var linksToRedditor = function(url, reddituser) {
    return url.hasAttribute('href') && url.getAttribute('href').indexOf(reddituser) > 1;
  }
  var isTagged = function(url, stravaid) {
    return false; // TODO
  }
  var addTag = function(url, stravaid) {
    var nextsib = url.nextSibling;
    var dad = url.parentNode;
    var stravalink = document.createElement('a');
    stravalink.href = 'https://www.strava.com/athletes/' + stravaid;
    stravalink.textContent = 'Strava';
    stravalink.classList.add('redditstravatag');
    dad.insertBefore(stravalink, nextsib);
  }
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

self.port.on('currentconnections', loadConnections);
