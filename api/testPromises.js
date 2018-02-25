console.log(' ')
console.log('The bot is coming alive...');
console.log(' ')

//Import Twitter API Wrapper for NodeJS
var Twit = require('twit');
var Bluebird = require('bluebird')
var PersonalityInsightsV3 = require('watson-developer-cloud/personality-insights/v3');

//Twitter Credentials
var T = new Twit({
  consumer_key:         'XAjruRZe6O6gen4zGLJL5VTbw',
  consumer_secret:      'vw3a8tb1AnMXEEUI3HXt7Xq5CpvjB0LNEtmAf5PmJCZYkQ3RPq',
  access_token:         '906982976344481794-7Nbvj6fCqkcTHNVoaepvq6iIMIJxc8G',
  access_token_secret:  'sDFWRJDAcscgFkGf0Sp1M4iPB0K5FLMwW6ck2y3ANMy9a',
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
});

var pi = new PersonalityInsightsV3({
  username: 'bbd18d95-927e-46b1-9245-a0ca4e573fd9',
  password: 'krBzGSyFWygP',
  version_date: '2017-10-13'
});

var request = require("request");
var userDetails;

const userQuery = () => {
    // Setting Parameters for request
    var tweetParams = {
      screen_name: '@realDonaldTrump', //@realDonaldTrump
      count: 10,
      include_rts: false,
      exclude_replies: true
    }

    return T.get('statuses/user_timeline', tweetParams)
    .then((response) =>{
      let fixedText = createPlainText(response.data)
      console.log(fixedText);
      var piParams = {
        // Get the content from the JSON file.
        content: fixedText,
        content_type: 'text/plain',
        // consumption_preferences: true,
        // raw_scores: true
      };
      console.log('we are in watsonCall')
      let response_after_callback = '';
      pi.profile(piParams, function(err, response) {
        console.log(JSON.stringify(response));
      });
      return null;
    })
    .then((response) => {
      console.log('GOT RESPONSE?')
      console.log(response);
      return JSON.stringify(response, null, 2); 
    })

      // if (error)
      //   console.log('Error:', error);
      // else
      //   console.log('>>>>>>>>>>>>>>>>>PI COMPLETE>>>>>>>>>>>>>>>');
      //   console.log(JSON.stringify(response, null, 2));
      //   response_after_callback = JSON.stringify(response, null, 2);
    .then(plainResponse => {
        console.log('plainResponse is: ' + plainResponse)
        return plainResponse;
    })
    .catch(err => {
      return err
    })
}

const createPlainText = (data) => {

  // return twitterResponse.reduce(first, accumulator=>{
  //   return(accumulator += first.text)
  //
  // }, '')
  var tweetHistory = '';
  for(var i=0; i < data.length; i++){
    // console.log(data[i].text);
    tweetHistory += data[i].text+'\n';
  }
  return tweetHistory
}

const watsonCall = (text) => {
  var piParams = {
    // Get the content from the JSON file.
    content: text,
    content_type: 'text/plain',
    // consumption_preferences: true,
    // raw_scores: true
  };
  console.log('we are in watsonCall')
  let response_after_callback = '';
  const prof = pi.profile(piParams, function(error, response) {
    if (error)
      console.log('Error:', error);
    else
      console.log('>>>>>>>>>>>>>>>>>PI COMPLETE>>>>>>>>>>>>>>>');
      // console.log(JSON.stringify(response, null, 2));
      response_after_callback = JSON.stringify(response, null, 2);
    }
  )
  return response_after_callback;
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
