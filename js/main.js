console.log(' ')
console.log('The bot is coming alive...');
console.log(' ')

var NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js');

var natural_language_understanding = new NaturalLanguageUnderstandingV1({
  "username": "3ca320cb-0473-4ae1-9d63-a72d139c27c2",
  "password": "tLrq6dXUA1D5",
  'version_date': '2017-02-27'
});


var parameters = {
  'text': 'Dont kill all Asians',
  'features': {
    'entities': {
      'emotion': true,
      'sentiment': true,
      'limit': 2
    },
    'keywords': {
      'emotion': true,
      'sentiment': true,
      'limit': 2
    }
  }
}

natural_language_understanding.analyze(parameters, function(err, response) {
  if (err)
    console.log('error:', err);
  else
    console.log(JSON.stringify(response, null, 2));
});
