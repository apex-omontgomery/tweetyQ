console.log(' ')
console.log('The bot is coming alive...');
console.log(' ')

//Import Twitter API Wrapper for NodeJS
var Twit = require('twit');

//Twitter Credentials
var T = new Twit({
  consumer_key:         'XAjruRZe6O6gen4zGLJL5VTbw',
  consumer_secret:      'vw3a8tb1AnMXEEUI3HXt7Xq5CpvjB0LNEtmAf5PmJCZYkQ3RPq',
  access_token:         '906982976344481794-7Nbvj6fCqkcTHNVoaepvq6iIMIJxc8G',
  access_token_secret:  'sDFWRJDAcscgFkGf0Sp1M4iPB0K5FLMwW6ck2y3ANMy9a',
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
});

var request = require("request");
var userDetails;

const userQuery = () => {
    // Setting Parameters for request
    var tweetParams = {
      screen_name: '@realDonaldTrump', //@realDonaldTrump
      count: 1,
      include_rts: false,
      exclude_replies: true
    }

    return T.get(tweetParams)
    .then(response=>{
      return createPlainText(response)
      // call watson api with response
    })
    .then(fixedText=> {
        return watsonCall(fixedText);
    })
    .then(plainResponse => {
        return plainResponse;
    })
    .catch(err => {
      return err
    })


}

const createPlainText = (twitterResponse) => {

  // return twitterResponse.reduce(first, accumulator=>{
  //   return(accumulator += first.text)
  //
  // }, '')
  var tweetHistory = '';
  for(var i=0; i < twitterResponse.length; i++){
    // console.log(data[i].text);
    tweetHistory += twitterResponse[i].text+'\n';
  }
  return tweetHistory
}


function main() {
    var initializePromise = userQuery();
    initializePromise.then(function(result) {
        userDetails = result;
        console.log("Initialized user details");
        // Use user details from here
        console.log(result);
    }, function(err) {
        console.log(err);
    })
}

main();
