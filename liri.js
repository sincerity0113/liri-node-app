//Set environment variables with the dotenv package
require("dotenv").config();

// Include the request npm package (Don't forget to run "npm install request" in this folder first!)
var request = require("request");

//Grab data from keys.js
var keys = require('./key.js');

//Required Spotify API & Keys
//var spotify = require('spotify');
//var spotKeys = keys.spotify;

var Spotify = require( 'node-spotify-api' );
var spotify = new Spotify( keys.spotify );

spotify
       .search({ type: 'track', query: UserInput })
       .then( function( response ) {});

var fs = require('fs');
       

// Input Argument  //song or movie input
var command = process.argv[2];
var input = process.argv[3]; 

//Switch Case
switch(command) {
   
    case "spotify-this-song":
        spotSong(input);
        break;
    case "movie-this":
        showMovie(input)
        break;
    case "do-what-it-says":
        read();
        break;
    default:
        console.log("Try again, wrong command has been enter.");
}



//1. spotify-this-song
function spotSong(song) {
    if (song == null) {
        song = 'computer love';
    }
    request(`https://api.spotify.com/v1/search?q=${song}&type=track`, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            body = JSON.parse(body);
            console.log(' ');
            console.log(`Artist: ${body.tracks.items[0].artists[0].name}`);
            console.log(`Song: ${body.tracks.items[0].name}`);
            console.log(`Preview Link: ${body.tracks.items[0].preview_url}`);
            console.log(`Album: ${body.tracks.items[0].album.name}`);
            console.log(' ');
            fs.appendFile('terminal.log', ('=============== LOG ENTRY BEGIN ===============\r\n' + Date() +'\r\n \r\nTERMINAL COMMANDS:\r\n$: ' + process.argv + '\r\n \r\nDATA OUTPUT:\r\n' + 'Artist: ' + jsonBody.tracks.items[0].artists[0].name + '\r\nSong: ' + jsonBody.tracks.items[0].name + '\r\nPreview Link: ' + jsonBody.tracks.items[0].preview_url + '\r\nAlbum: ' + jsonBody.tracks.items[0].album.name + '\r\n=============== LOG ENTRY END ===============\r\n \r\n'), function(err) {
                if (err) throw err;
            });
        }
    });
}

//2. movie-this
function showMovie(movie) {
    if (movie == null) {
        movie = 'rocky';
    }
    var omdbUrl = `http://www.omdbapi.com/?t=${movie}&plot=short&apikey=trilogy`;
    request(omdbUrl, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            jsonBody = JSON.parse(body);
            console.log(' ');
            console.log(`Title: ${body.Title}`);
            console.log(`Year Released: ${body.Year}`);
            console.log(`IMBD Rating: ${body.imdbRating}`);
            console.log(`Rotten Tomatoes Rating: ${body.Rating[1].Value}`);
            console.log(`Language: ${body.Language}`);
            console.log(`Movie Plot: ${body.Plot}`);
            console.log(`Actor(s): ${body.Actors}`);
            fs.appendFile('log.txt', ('=============== LOG ENTRY BEGIN ===============\r\n' + Date() + '\r\n \r\nTERMINAL COMMANDS: ' + process.argv + '\r\nDATA OUTPUT:\r\n' + 'Title: ' + jsonBody.Title + '\r\nYear: ' + jsonBody.Year + '\r\nIMDb Rating: ' + jsonBody.imdbRating + '\r\nCountry: ' + jsonBody.Country + '\r\nLanguage: ' + jsonBody.Language + '\r\nPlot: ' + jsonBody.Plot + '\r\nActors: ' + jsonBody.Actors + '\r\nRotten Tomatoes Rating: ' + jsonBody.tomatoRating + '\r\nRotten Tomatoes URL: ' + jsonBody.tomatoURL + '\r\n =============== LOG ENTRY END ===============\r\n \r\n'), function(err) {
                if (err) throw err;
            });
        }
    });
}
//3. do-what-it-says
function read() {
    fs.readFile('random.txt', 'utf8', function(error, data) {
        if (error) {
            console.log(error);
        } else {
            var dataArr = data.split(',');
            if (dataArr[0] === 'spotify') {
                spotifyThis(dataArr[1]);
            }
            if (dataArr[0] === 'omdb') {
                omdbThis(dataArr[1]);
            }
        }
    });
}