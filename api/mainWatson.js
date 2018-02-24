console.log(' ')
console.log('The bot is coming alive...');
console.log(' ')

//Import natural language understanding tools from Watson
var NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js');
var PersonalityInsightsV3 = require('watson-developer-cloud/personality-insights/v3');
var ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>TONE ANALYZER>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
var tone_analyzer = new ToneAnalyzerV3({
  username: 'a6f558d8-06d2-45a7-93a7-5c358290b6a4',
  password: 'AaRIysTakCa6',
  version_date: '2017-09-21'
});

var params = {
  'tone_input': require('../toneExample.json'),
  'content_type': 'application/json'
};


tone_analyzer.tone(params, function(error, response) {
  if (error)
    console.log('error:', error);
  else
    console.log(JSON.stringify(response, null, 2));
  }
);

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>PERSONALITY INSIGHT>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//What it does
// You can input:
// JSON, or Text or HTML (such as social media, emails, blogs, or other communication) written by one individual
//
// And the service will output:
// A tree of cognitive and social characteristics in JSON or CSV format

//Personality Insight Login
var pi = new PersonalityInsightsV3({
  username: 'bbd18d95-927e-46b1-9245-a0ca4e573fd9',
  password: 'krBzGSyFWygP',
  version_date: '2017-10-13'
});
//
// var piParams = {
//   // Get the content from the JSON file.
//   content: require('../exampleProfile.json'),
//   content_type: 'application/json',
//   consumption_preferences: true,
//   raw_scores: true
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
//Natural Language Login Info
var nlu = new NaturalLanguageUnderstandingV1({
  "username": "3ca320cb-0473-4ae1-9d63-a72d139c27c2",
  "password": "tLrq6dXUA1D5",
  'version_date': '2017-02-27'
});

//Parameters
// var nluParameters = {
//   'text': '74 degrees here in New York today, in the middle of February. Im loving this global warming, temporarily of course, until it turns back into global cooling next week',
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
//     console.log(JSON.stringify(response, null, 2));
// });
