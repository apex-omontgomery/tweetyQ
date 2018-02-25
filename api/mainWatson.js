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

//Import natural language understanding tools from Watson
var NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js');
var PersonalityInsightsV3 = require('watson-developer-cloud/personality-insights/v3');
var ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');

//Login Credentials for IBM WATSON SERVICES >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
var tone_analyzer = new ToneAnalyzerV3({
  username: 'a6f558d8-06d2-45a7-93a7-5c358290b6a4',
  password: 'AaRIysTakCa6',
  version_date: '2017-09-21'
});

var pi = new PersonalityInsightsV3({
  username: 'bbd18d95-927e-46b1-9245-a0ca4e573fd9',
  password: 'krBzGSyFWygP',
  version_date: '2017-10-13'
});

// Natural Language Login Info
var nlu = new NaturalLanguageUnderstandingV1({
  "username": "3ca320cb-0473-4ae1-9d63-a72d139c27c2",
  "password": "tLrq6dXUA1D5",
  'version_date': '2017-02-27'
});
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

//Startup with this function
function start(){
  //Parameters for Twitter to look for in the users timeline
  var tweetParams = {
    screen_name: '@dril',
    count: 100,
    include_rts: false,
    exclude_replies: true
  }

  //Get the users tweet histry based on the parameters above
  T.get('statuses/user_timeline', tweetParams, getText)

  //This function takes all the tweet content and makes it into a string and then runs Watson
  function getText(error, data, response) {
    if (!error) {
      var tweetHistory = '';
      for(var i=0; i < data.length; i++){
        // console.log(data[i].text);
        tweetHistory += data[i].text+'\n';
      }
      console.log(tweetHistory);
      //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>TONE ANALYZER>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
      var taParams = {
        'tone_input': tweetHistory,
        'content_type': 'text/plain'
      };

      tone_analyzer.tone(taParams, function(error, response) {
        if (error)
          console.log('error:', error);
        else
        for(var i=0; i < data.length; i++){
          if(response[1].sentence_tone[i].score >= 0.6){
            console.log();
          }
        }
          console.log(JSON.stringify(response, null, 2));
          console.log('>>>>>>>>>>>>>>>>>TA COMPLETE>>>>>>>>>>>>>>>');
        }
      );
      //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> PERSONALITY INSIGHT >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
      var piParams = {
        // Get the content from the JSON file.
        content: tweetHistory,
        content_type: 'text/plain',
        // consumption_preferences: true,
        // raw_scores: true
      };

      pi.profile(piParams, function(error, response) {
        if (error)
          console.log('Error:', error);
        else
          // console.log(JSON.stringify(response, null, 2));
          // console.log('>>>>>>>>>>>>>>>>>PI COMPLETE>>>>>>>>>>>>>>>');
          console.log('>>>>>>>>>>>>>>>>>PI NOT PRINTED>>>>>>>>>>>>>>>');
        }
      );
    }
    else{
      console.log(error);
    }
  };
}

start()

// console.log(a);

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>TONE ANALYZER>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// var tone_analyzer = new ToneAnalyzerV3({
//   username: 'a6f558d8-06d2-45a7-93a7-5c358290b6a4',
//   password: 'AaRIysTakCa6',
//   version_date: '2017-09-21'
// });
//
// var taParams = {
//   'tone_input': require('../toneExample.json'),
//   'content_type': 'application/json'
// };
//
//
// tone_analyzer.tone(taParams, function(error, response) {
//   if (error)
//     console.log('error:', error);
//   else
//     console.log(JSON.stringify(response, null, 2));
//   }
// );

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>PERSONALITY INSIGHT>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//What it does
// You can input:
// JSON, or Text or HTML (such as social media, emails, blogs, or other communication) written by one individual
//
// And the service will output:
// A tree of cognitive and social characteristics in JSON or CSV format

//Personality Insight Login
// var pi = new PersonalityInsightsV3({
//   username: 'bbd18d95-927e-46b1-9245-a0ca4e573fd9',
//   password: 'krBzGSyFWygP',
//   version_date: '2017-10-13'
// });
//
// var piParams = {
//   // Get the content from the JSON file.
//   content: require('../exampleProfile.json'),
//   content_type: 'application/json',
//   // consumption_preferences: true,
//   // raw_scores: true
// };
//
// pi.profile(piParams, function(error, response) {
//   if (error)
//     console.log('Error:', error);
//   else
//     console.log(JSON.stringify(response, null, 2));
//   }
// );

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>NATURAL LANGUAGE UNDERSTANDING>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// What it does
// You can input:
// Any publicly accessible URL
// Plain text or HTML content
//
// And the service will output:
// Extracted metadata in JSON format

// Parameters
// var nluParameters = {
//   'text': 'Love all Asians',
//   'features': {
//     'entities': {
//       'emotion': true,
//       'sentiment': true,
//       'limit': 2
//     },
//     'keywords': {
//       'emotion': true,
//       'sentiment': true,
//       'limit': 2
//     },
//     'concepts':{
//       'limit': 3
//     },
//     'relations':{}
//   }
// }
//
// //error control and resoonse
// nlu.analyze(nluParameters, function(err, response) {
//   if (err)
//     console.log('error:', err);
//   else
//     // console.log(JSON.stringify(response, null, 2));
//     console.log('>>>>>>>>>>>>>>>>>>NLU COMPLETE>>>>>>>>>>>>>>>>>>>>>');
// });
