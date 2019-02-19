require("dotenv").config();
var axios = require("axios");
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
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
        // console.log("Concert Function Selected");
        concert(term);
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
    // console.log("Looking for : " + term);
    if (term) {
        // console.log("Concert URL: " + movURL);
        axios.get(conURL).then(
                function (response) {
                    // console.log(response.data[0]);
                    // * Name of the venue
                    console.log("Venue: "+ response.data[0].venue.name);
                    // * Venue location
                    console.log("Country: "+ response.data[0].venue.country);
                    // * Date of the Event (use moment to format this as "MM/DD/YYYY")
                    // console.log("Date: "+ response.data[0].datetime);
                    var time = response.data[0].datetime;
                    // stringify(time);
                    var dateYear = time.slice(0, 4);
                    var dateDay = time.slice(8, 10);
                    var dateMonth = time.slice(5, 7);
                    console.log("Date: "+dateMonth+"/"+dateDay+"/"+dateYear);
                    console.log("---------------------------------");

                })
            .catch(function (error) {
                console.log("Try agian");
            });
    } else {
        axios.get("http://www.omdbapi.com/?t=mr+nobody&y=&plot=short&apikey=trilogy").then(
            function (response) {
                console.log("---------------------------------");
                console.log("Band Not Found");
                console.log("---------------------------------");
            });
    }
}

function spotifyFun(term) {

    // console.log("Searching Spotify for " + term);
    // console.log(keys);
    // console.log(keys.spotify.id);
    // console.log(keys.spotify.secret);
    var spotify = new Spotify({
        id: keys.spotify.id,
        secret: keys.spotify.secret
    });

    spotify.search({
        type: 'track',
        query: term
    }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        // console.log(data.tracks.items[0]);
        // * Artist(s)
        for(var i = 0; i < data.tracks.items[0].artists.length; i++){
        console.log("Artist: "+data.tracks.items[0].artists[i].name);
        }
        // * The song's name
        console.log("Song Name: "+data.tracks.items[0].name);
   
        // * A preview link of the song from Spotify
        console.log("Preview Link: "+data.tracks.items[0].preview_url);

        // * The album that the song is from
        console.log("Album: "+data.tracks.items[0].album.name);

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
        spotifyFun(rdm[1]);
    });
}