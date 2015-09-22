Firefox copy of stravaTag by /u/unicycling_dinosaur on /r/running.
[The thread](https://www.reddit.com/r/running/comments/3lnyen/tagging_users_on_strava_chrome_extension/).
Copy of the idea anyway, mostly felt like trying out the Firefox addon sdk.

# Build

You need `jpm`. Install with

    npm install jpm --global

Run as a test with

    jpm run

though on my system I had to specify the firefox path

    jpm run -b /usr/bin/firefox

Create an xpi for distribution with

    jpm xpi

# Usage

Tag someone by going to the athlete page and double clicking the `[tag]` text
or the tag already present.
