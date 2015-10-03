// page modification api
var pageMod = require('sdk/page-mod');
var simpleStorage = require('sdk/simple-storage');

if (!simpleStorage.storage.tags) {
  simpleStorage.storage.tags = {};
}
// Format of stravaid => redditusername
if (!simpleStorage.storage.redditstrava) {
  simpleStorage.storage.redditstrava = {
    1091838: 'wardmuylaert'
  };
}

/**
 * Handles receiving of a new tag
 *
 * @param tag object Properties id (strava id) and tag (the text)
 */
function newTag(tag) {
  console.log('Tag received', tag);
  if (tag['tag'] === null || tag['tag'] === '' || tag['tag'] === undefined) {
    delete simpleStorage.storage.tags[tag['id']];
  } else {
    simpleStorage.storage.tags[tag['id']] = tag['tag'];
  }
}

/**
 * Handles receiving of a new reddit-strava connection
 *
 * @param connection object Properties: reddit (username) and strava (id)
 */
function connectRedditStrava(connection) {
  console.log('New connection', connection);
  // TODO: Validate input (or do it at input)
  simpleStorage.storage.redditstrava[connection.strava] = connection.reddit;
}

/**
 * Modifies Strava pages
 */
pageMod.PageMod({
  // Regex! The wildcard is useless
  include: /.*strava.*/,
  contentScriptFile: ['./jquery-2.1.4.min.js', './strava.js'],
  onAttach: function(worker) {
    // Message to content script
    worker.port.emit('currentTags', simpleStorage.storage.tags);
    // Message from content script
    worker.port.on('newTag', newTag);
  }
});


function showConnections() {
  connectionPopup.show();
}
// Show connections when the listPref button is clicked in preferences
require('sdk/simple-prefs').on('listPref', showConnections);

// The pop up showing the current connections
var connectionPopup = require('sdk/panel').Panel({
  contentURL: './connectionpopup.html',
  contentScriptFile: ['./connectionpopup.js']
});
// show event is on this end, send over the current connections when this happens
connectionPopup.on('show', function() {
  console.log('connectionPopup shown');
  connectionPopup.port.emit('currentconnections', simpleStorage.storage.redditstrava);
});

// When receiving a new connection, save it and send updated connection list back
connectionPopup.port.on('newConnection', function(obj) {
  connectRedditStrava(obj);
  connectionPopup.port.emit('currentconnections', simpleStorage.storage.redditstrava);
});
