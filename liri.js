var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var Request = require('request');
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

  var song = process.argv[3];

  var spotify = new Spotify({
    id: llaves.spotifyKeys.client_id,
    secret: llaves.spotifyKeys.client_secret
  });
   
  spotify.search({ type: 'track', query: song }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
   
    else if (song) {
      console.log("Artist: " + data.tracks.items[0].artists[0].name);
      console.log("Track: " + data.tracks.items[0].name);
      console.log("Album: " + data.tracks.items[0].album.name);  
      console.log("Preview: " + data.tracks.items[0].preview_url);
    }

    // else {
    //   console.log("Artist: Ace of Base");
    //   // console.log("Track: " + data.tracks.items[0].name);
    //   // console.log("Album: " + data.tracks.items[0].album.name);  
    //   // console.log("Preview: " + data.tracks.items[0].preview_url);
    // }

  });

}


else if (process.argv[2] === "movie-this") {
  var movieName = process.argv[3];
  var queryURL = "http://www.ombdapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece";
  console.log(queryURL);

  Request(queryURL, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      console.log("Release Year: " + JSON.parse(body));
    }
  })

}




// else if (process.argv[2] === "do-what-it-says") {
   
// }

// else {
//    console.log("Unrecognized command");
// }