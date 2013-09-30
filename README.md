Heimdall
========

Heimdall var, i den norrøne mytologien, gudenes vaktmann, som ingen kommer seg forbi.

I vårt tilfellet blåser han i "hornet" når Jenkins går i rødt.

## Install ##

Install 'mplayer'

    brew update && brew install mplayer

or

    apt-get update && apt-get install mplayer

In code directory

    npm install

## Run ##

### Listener ###

Triggers pull script when port 8081 retrieves a GET.

Starts listening server

    npm start

or

    npm start bin/listen.js

### Timer ###

Triggers pull script every X seconds.

Start timer script

    npm start bin/timer.js