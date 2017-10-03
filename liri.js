var Twitter = require('twitter');
var spotify = require('spotify');
var llaves = require("./keys.js");

var client = new Twitter({
   consumer_key: llaves.consumer_key,
   consumer_secret: llaves.consumer_secret,
   access_token_key: llaves.access_token_key,
   access_token_secret: llaves.access_token_secret
});

if (process.argv[2] === "my-tweets") {
  var params = {screen_name: 'primoBandito'};
  client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
      for (var i = 0; i < 2; i++){
        console.log(tweets[i].text);
        console.log(tweets[i].created_at);
      }
        // console.log(tweets);
    }
  });
}

else if (process.argv[2] === "spotify-this-song") {

  var refresh = require('spotify-refresh')
  
  refresh(refreshToken, clientID, clientSecret, function (err, res, body) { 
    if (err) return
    body = json.parse(body)
    console.log(JSON.stringify(body)  
  })

  var songName = process.argv[3];
  
  spotify.search({ type: 'track', query: songName }, function(err, data) {
    if ( err ) {
        console.log('Error occurred: ' + err);
        return;
    }
    
    else {console.log(data)}

 });

}

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