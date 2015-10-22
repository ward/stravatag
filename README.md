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

# Build

If you want to build things yourself from the repository, you will need `jpm`.
Install with

    npm install jpm --global

Run as a test with (note this creates a fresh temporary profile to not ruin
your main profile)

    jpm run

though on my system I had to specify the firefox path

    jpm run -b /usr/bin/firefox

Create an xpi for distribution with

    jpm xpi

# Usage

Connections are managed through the preferences page of this addon. You can
find this in `about:addons`. This is done deliberately, I do not see a point in
yet another constant icon for a feature that is mostly passive.

Adding and viewing of connections is done by clicking on the `List...` button.
Fill in the reddit account name and the strava athlete id. Follow it up by
pressing enter to store the connection.

You may export and import connections. This is done via the JSON format.
Importing will leave your existing connections untouched except for those which
are also specified in the imported file. In this case the original is
overwritten by the imported one. Note that this is done in terms of the strava
id.
