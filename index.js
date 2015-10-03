// page modification api
var pageMod = require('sdk/page-mod');
var simpleStorage = require('sdk/simple-storage');

if (!simpleStorage.storage.tags) {
  simpleStorage.storage.tags = {};
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
