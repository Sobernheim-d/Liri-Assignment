# Liri-Homework
This program is designed to pull requests for:
* upcoming concerts (of which there are none due to corona virus)
* spotify song info
* movie info

The app is organized with a file keys.js containing the spotify API key and the IMDB API key.
Concert-this uses the standard bootcamp API

the liri.js file itself links to the keys.js file to obtain proper API keys

First the program parses the input using the process.argv argument with parsing to obtain the command:
spotify-this-song
movie-this
concert-this
dowhatitsays

then it takes the following argument and puts it into the Title variable

based upon the comand, it will call the appropriate function of the 4 listed above

in the function, we call the API and obtain the relevant data required per command

this function then outputs to the terminal as well as to the file log.txt

Running the function:

can use -
node liri.js spotify-this-song "songname"
node liri.js movie-this "movie name"
node liri.js concert-this "artist or band name"
node liri.js dowhatitsays
* do what it says will take the data from random.txt and apply the logic

EXAMPLES:

node liri.js spotify-this-song i want it my way

Spotify This Song
------------------------------------------------------------

Artists      : Lesley Gore
Album        : It's My Party: The Mercury Anthology
Track        : If That's The Way You Want It
Preview link : null

------------------------------------------------------------

node liri.js movie-this Star Wars

Movie This
------------------------------------------------------------

Title          : Star Wars: Episode IV - A New Hope
Release year   : 1977
Plot           : Luke Skywalker joins forces with a Jedi Knight, a cocky pilot, a Wookiee and two droids to save the galaxy from the Empire's world-destroying battle station, while also attempting to rescue Princess Leia from the mysterious Darth Vader.
Actors         : Mark Hamill, Harrison Ford, Carrie Fisher, Peter Cushing
IMDB           : 8.6
RottenTomatoes : 92%
Production     : USA
Language       : English

-------------------------------------------------------------

node liri.js dowhatitsays

Spotify This Song
------------------------------------------------------------

Artists      : Backstreet Boys
Album        : The Hits--Chapter One
Track        : I Want It That Way
Preview link : https://p.scdn.co/mp3-preview/e72a05dc3f69c891e3390c3ceaa77fad02f6b5f6?cid=47773db76c35449f93e1785948b86ccf

------------------------------------------------------------

NOTE:  Due to no upcoming concerts, the code for "node liri.js concert-this aerosmith" does not work

