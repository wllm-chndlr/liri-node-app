var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
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
   
  // console.log(data); 
  console.log(data.tracks.items[0].artists);
  console.log(data.tracks.items[0].name);
  console.log(data.tracks.items[0].album.name);  
  });

}

//   var refresh = require('spotify-refresh')
  
//   refresh(refreshToken, clientID, clientSecret, function (err, res, body) { 
//     if (err) return
//     body = json.parse(body)
//     console.log(JSON.stringify(body)  
//   })

//   var songName = process.argv[3];
  
//   spotify.search({ type: 'track', query: songName }, function(err, data) {
//     if ( err ) {
//         console.log('Error occurred: ' + err);
//         return;
//     }
    
//     else {console.log(data)}

//  });

// }

// else if (process.argv[2] === "movie-this") {
   
// }

// else if (process.argv[2] === "do-what-it-says") {
   
// }

// else {
//    console.log("Unrecognized command");
// }



// for (var key in bandList) {
//    if (key === genre || genre === undefined) {
//       console.log("A " + key + " band is " + bandList[key] + ".");
//    }
// }