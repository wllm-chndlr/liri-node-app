var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
var fs = require('fs');
var llaves = require("./keys.js");

var client = new Twitter({
   consumer_key: llaves.twitterKeys.consumer_key,
   consumer_secret: llaves.twitterKeys.consumer_secret,
   access_token_key: llaves.twitterKeys.access_token_key,
   access_token_secret: llaves.twitterKeys.access_token_secret
});

if (process.argv[2] === "my-tweets") {
  var params = {screen_name: 'primoBandito'};
  client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
      for (var i = 0; i < tweets.length; i++){
        console.log(tweets[i].text);
        console.log(tweets[i].created_at);
      }
        // console.log(tweets);
    }
  });
}

else if (process.argv[2] === "spotify-this-song") {

  if (process.argv[3]){

    var song = "";

    for (var n = 3; n < process.argv.length; n++){
      song += " " + process.argv[n];
    };

    var spotify = new Spotify({
      id: llaves.spotifyKeys.client_id,
      secret: llaves.spotifyKeys.client_secret
    });
    
    spotify.search({ type: 'track', query: song }, function(error, data) {
      if (error) {
        return console.log('Error occurred: ' + error);
      }
    
      else if (song) {
        console.log("Artist: " + data.tracks.items[0].artists[0].name);
        console.log("Track: " + data.tracks.items[0].name);
        console.log("Album: " + data.tracks.items[0].album.name);  
        console.log("Preview: " + data.tracks.items[0].preview_url);
      }

    });
  }

  else {
  
    var song = "'The Sign'";
    
    var spotify = new Spotify({
      id: llaves.spotifyKeys.client_id,
      secret: llaves.spotifyKeys.client_secret
    });
      
    spotify.search({ type: 'track', query: song }, function(error, data) {
      
      if (error) {
        return console.log('Error occurred: ' + error);
      }
      
      else if (song) {
        console.log("Artist: " + data.tracks.items[0].artists[0].name);
        console.log("Track: " + data.tracks.items[0].name);
        console.log("Album: " + data.tracks.items[0].album.name);  
        console.log("Preview: " + data.tracks.items[0].preview_url);
      }
  
    });
  }

}

else if (process.argv[2] === "movie-this") {

  var movieName = "";
  
  for (var p = 3; p < process.argv.length; p++){
    movieName += " " + process.argv[p];
  };
  
  var queryURL = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece";
  // console.log(queryURL);

  request(queryURL, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      // console.log(JSON.parse(body, null, 2));
      console.log("Title: " + JSON.parse(body).Title);      
      console.log("Release Year: " + JSON.parse(body).Year);
      console.log("IMDB Rating: " + JSON.parse(body).Ratings[0].Value);
      console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[0].Value);
      console.log("Country: " + JSON.parse(body).Country);
      console.log("Language: " + JSON.parse(body).Language);
      console.log("Plot: " + JSON.parse(body).Plot);
      console.log("Actors: " + JSON.parse(body).Actors);
    }
  })

}


else if (process.argv[2] === "do-what-it-says") {

  fs.readFile("random.txt", "utf8", function(error, data) {
    
    if (error) {
      return console.log(error);
    }
    
    console.log("node liri.js " + data);
    
  });
}

else {
   console.log("Unrecognized command");
}