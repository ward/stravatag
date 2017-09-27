*IN PROGRESS MOVE TO WEBEXTENSIONS*

First tinkering has everything in the same folder. However, it seems you can
embed a webextension in a legacy version.  This would be useful in terms of
migrating the data on my end. However, I am lazy so I think I would prefer just
having an export/import similar to the old version. Then I do not require
writing glue code just for the migration. (since this would imply first making
an embedded version, then making a webextension only version, and anyone
updating would have to install in order)

* https://developer.mozilla.org/en-US/Add-ons/WebExtensions
* https://developer.mozilla.org/en-US/Add-ons/WebExtensions/Porting_a_legacy_Firefox_add-on
* https://developer.mozilla.org/en-US/Add-ons/WebExtensions/Embedded_WebExtensions


-------------------------------------------------------------------------------

Connect people's reddit account with their Strava account. Once a connection
has been established, it will be shown on both strava.com as reddit.com. This
addon started out as a Firefox copy of
[stravaTag]((https://www.reddit.com/r/running/comments/3lnyen/tagging_users_on_strava_chrome_extension/))
by /u/unicycling_dinosaur on /r/running and (d)evolved into this to fit my own
needs.

# Install

Get the xpi file from the
[releases](https://github.com/ward/stravatag/releases) page on github. Drag on
top of Firefox if all else fails. You may need to change your configuration to
allow unsigned addons.

# Usage

Connections are managed through the preferences page of this addon. You can
find this in `about:addons`. This is done deliberately, I do not see a point in
yet another constant icon for a feature that is mostly passive.

Adding and viewing of connections is done in that same preferences page.  Fill
in the reddit account name and the strava athlete id. Follow it up by pressing
enter to store the connection.

*In progress.*
You may export and import connections. This is done via the JSON format.
Importing will leave your existing connections untouched except for those which
are also specified in the imported file. In this case the original is
overwritten by the imported one. Note that this is done in terms of the strava
id.
