// var Twitter = require('twitter');

var client = new Twitter({
   consumer_key: 'aKvHvBFQ3q1bRT4ar1BKMKvxU',
   consumer_secret: 'NJqAoNiuhjb3oPB1IPD7FuqNbWtTD0vq7KkB26rXoI7FF4ovkX',
   access_token_key: '914252017736015872-sQnkuaqkDfBE2cmzy6W8WbnWA7WUQ2E',
   access_token_secret: 'I6p0qBCNaJbMS5XYmNfYJKNGfLVjKEpa8vKyQKi5ZakG9',
});

var params = {screen_name: 'primoBandito'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    console.log(tweets);
  }
});