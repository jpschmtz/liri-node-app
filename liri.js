require("dotenv").config();
var axios = require("axios");
var keys = require("./keys.js");
// console.log(keys);
// var spotify = new Spotify(keys.spotify);
var fs = require('fs');
var arg = process.argv[2];
var term = process.argv.slice(3).join(" ");

// var spotID = 0 cc6cbfaf52e44fdbdce37e898655d0f;
// var spotSecret = 2 a7127c8dd46440a902fca31e231807a;

var conURL = "https://rest.bandsintown.com/artists/" + term + "/events?app_id=codingbootcamp"
var spoURL = "";
var movURL = "http://www.omdbapi.com/?t=" + term + "&y=&plot=short&apikey=trilogy";

switch (arg) {
    case "concert-this":
        console.log("Concert Function Selected");
        concert();
        break;

    case "spotify-this-song":
        console.log("Song Function Selected");
        if (term) {
            spotifyFun(term);
        } else {
            spotifyFun("");
        }
        break;

    case "movie-this":
        // console.log("Movie Function Selected");
        if (term) {
            movie(term);
        } else {
            movie("");
        }
        break;

    case "do-what-it-says":
        console.log("Do What It Says Function Selected");

        dwis();
        break;

    default:
        console.log("Try again...");
        break;
}

function concert(term) {
    axios.get(conURL).then(
        function (response) {
            console.log(response);
        }
    );
}

function spotifyFun(term) {
    var Spotify = require('node-spotify-api');

    var spotify = new Spotify({
        id: spotID,
        secret: spotSecret
    });

    spotify.search({
        type: 'track',
        query: term
    }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        console.log(data);
    });
}

function movie(term) {
    // console.log("Movie title: " + term);
    if (term) {
        // console.log("Movie URL: " + movURL);
        axios.get(movURL).then(
                function (response) {
                    console.log("---------------------------------");
                    // * Title of the movie.
                    console.log("Movie Title: " + response.data.Title);
                    // * Year the movie came out.
                    console.log("Year Released: " + response.data.Year);
                    // * IMDB Rating of the movie.
                    console.log("IMDB Rating: " + response.data.Ratings[1].Value);
                    // * Rotten Tomatoes Rating of the movie.
                    console.log("Rotten Tomatoes Rating: " + response.data.Ratings[2].Value);
                    // * Country where the movie was produced.
                    console.log("Country Produced: " + response.data.Country);
                    // * Language of the movie.
                    console.log("Language: " + response.data.Language);
                    // * Plot of the movie.
                    console.log("Plot: " + response.data.Plot);
                    // * Actors in the movie.
                    console.log("Actors: " + response.data.Actors);
                    console.log("---------------------------------");

                })
            .catch(function (error) {
                console.log("Try agian");
            });
    } else {
        axios.get("http://www.omdbapi.com/?t=mr+nobody&y=&plot=short&apikey=trilogy").then(
            function (response) {
                console.log("---------------------------------");
                // * Title of the movie.
                console.log("Movie Title: " + response.data.Title);
                // * Year the movie came out.
                console.log("Year Released: " + response.data.Year);
                // * IMDB Rating of the movie.
                console.log("IMDB Rating: " + response.data.Ratings[1].Value);
                // * Rotten Tomatoes Rating of the movie.
                console.log("Rotten Tomatoes Rating: " + response.data.Ratings[2].Value);
                // * Country where the movie was produced.
                console.log("Country Produced: " + response.data.Country);
                // * Language of the movie.
                console.log("Language: " + response.data.Language);
                // * Plot of the movie.
                console.log("Plot: " + response.data.Plot);
                // * Actors in the movie.
                console.log("Actors: " + response.data.Actors);
                console.log("---------------------------------");
            });
    }
}

function dwis() {
    fs.readFile('random.txt', "utf8", function (error, data) {
        var rdm = data.split(',');
        spotifySong(rdm[1]);
    });
}