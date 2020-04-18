require("dotenv").config();

/****************************************************************************
 ****************************************************************************
    
    Configure APIs
    
*****************************************************************************
*****************************************************************************/


const keys    = require("./keys.js");

// Bandsintown
// const bandsintown = require("bandsintown")("codingbootcamp");
//const Bandsintown = require("bandsintown")("571f1c74be057b25560d6bd9efc9cef3");
//const bandsintown = new Bandsintown(keys.bandsintown);


// Spotify
const Spotify = require("node-spotify-api");
const spotify = new Spotify(keys.spotify);

// OMDB
const request = require("request");

// File System
const fs      = require("fs");

// Operating System (for end-of-line)
const os      = require("os");



/****************************************************************************
 ****************************************************************************
    
    Initialize
    
*****************************************************************************
*****************************************************************************/
process.stdout.write("\033c");

// Create a log file if it does not exist
const file_log = "log.txt";

if (!fs.existsSync(file_log)) {
    fs.writeFile(file_log, "", error => {
        if (error) {
            console.log(`Error in creating "${file_log}"\n${error}\n\n\n`);
            return;
        }
    });
}

const option = process.argv[2];
const title  = process.argv.slice(3).join(" ");

mainMenu(option, title);

/****************************************************************************
 ****************************************************************************
    
    Menu options
    
*****************************************************************************
*****************************************************************************/
function mainMenu(option = "", title) {
    switch (option.toLowerCase()) {
        case "concert-this":
            concertThis((title) ? title : "The Fix");
            break;

        case "spotify-this-song":
            getSong((title) ? title : "The Sign");
            break;

        case "movie-this":
            getMovie((title) ? title : "Mr. Nobody");
            break;

        case "do-what-it-says":
            doWhatItSays();
            break;

        default:
            saveOutput(`Error:\n"${option}" is a not valid command.\nPlease select "concert-this", "spotify-this-song", "movie-this", or "do-what-it-says".\n\n\n`);

    }
}

function concertThis(title) {
        
    request("https://rest.bandsintown.com/artists/" + title + "/events?app_id=codingbootcamp", function (error, response, body) {
            if (!error && response.statusCode === 200) {
            output = JSON.parse(body);
                    output += addSeperator();
                    output +=  `Band      :   ${output.lineup}\n`;
                    output +=  `Venue     :   ${output.venue.name}\n`;
                    output +=  `Latlong   :   ${output.venue.latitude}\n`;
                    output +=  `City      :   ${output.venue.city}\n`;
                    output +=  `Country   :   ${output.venue.country}\n`;
                    output += addSeparator() + "\n";                    
            }
          }  
        );
            saveOutput(output);
        }

function getSong(title) {
    const parameters = {
        "type" : "track",
        "query": title,
        "limit": 1
    };

    spotify.search(parameters, (error, data) => {
        if (error) {
            saveOutput(`Error in calling "Spotify"\n${error}\n\n\n`);
            return;
        }

        // For simplicity, we assume that Spotify always finds the right song
        const song = data.tracks.items[0];

        // Display all artists
        const artists = song.artists.map(a => a.name);


        /********************************************************************
            
            Write to terminal and file
            
        *********************************************************************/
        let output = "Spotify This Song\n";
        
        output += addSeparator();
        
        output += `Artists      : ${artists.join(", ")}\n`;
        output += `Album        : ${song.album.name}\n`;
        output += `Track        : ${song.name}\n`;
        output += `Preview link : ${song.preview_url}\n\n`;
        
        output += addSeparator() + "\n";

        saveOutput(output);
    });
}


function getMovie(title) {
    const api_url = `http://www.omdbapi.com/?apikey=${keys.omdb.key}&t=${title}&plot=short`;
    
    request(api_url, (error, response, body) => {
        if (error) {
            saveOutput(`Error in calling "OMDB"\n${error}\n\n\n`);
            return;
        }

        if (response.statusCode !== 200) {
            saveOutput(`Error in calling "OMDB"\n${response}\n\n\n`);
            return;
        }

        const movie = JSON.parse(body);
        

        /********************************************************************
            
            Write to terminal and file
            
        *********************************************************************/
        let output = "Movie This\n";

        output += addSeparator();
        
        output += `Title          : ${movie.Title}\n`;
        output += `Release year   : ${movie.Year}\n`;
        output += `Plot           : ${movie.Plot}\n`;
        output += `Actors         : ${movie.Actors}\n`;
        output += `IMDB           : ${movie.imdbRating}\n`;
        output += `RottenTomatoes : ${(movie.Ratings[1]) ? movie.Ratings[1].Value : "N/A"}\n`;
        output += `Production     : ${movie.Country}\n`;
        output += `Language       : ${movie.Language}\n\n`;
        
        output += addSeparator() + "\n";

        saveOutput(output);
    });
}


function doWhatItSays() {
    fs.readFile("random.txt", "utf8", (error, data) => {
        if (error) {
            saveOutput(`Error in calling "Do What It Says":\n${error}\n\n\n`);
            return;
        }

        // Use require("os").EOL to split into lines, independent of the platform
        const commands = data.split(os.EOL);
        

        /********************************************************************
            
            Write to terminal and file
            
        *********************************************************************/
        if (commands.length === 1 && commands[0] === "") {
            saveOutput(`Error in calling "Do What It Says":\nPlease enter a command in "random.txt".\n\n\n`);
        }

        commands.forEach(c => {
            if (c === "") {
                return;
            }

            // Use indexOf instead of split, in case the title has a comma
            const index = c.indexOf(",");

            const option = (index >= 0) ? c.substring(0,  index).trim().toLowerCase() : c;
            const title  = (index >= 0) ? c.substring(index + 1).trim()               : undefined;

            mainMenu(option, title);
        });
    });
}


function addSeparator() {
    return "-".repeat(60) + "\n\n";
}


function saveOutput(output) {
    // Write to the terminal
    console.log(output);

    // Write to the log file
    fs.appendFile(file_log, output, error => {
        if (error) {
            return console.log(`Error in appending to "${file_log}"\n${error}\n\n\n`);
        }
    });
}