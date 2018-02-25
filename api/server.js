const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const url = require('url');
const request = require('request');
app.use(bodyParser.json());

function rateAppropriate(content) {
	
}

function rateSpam(content) {
	
}

function analyzeTweetWrapper(tweet) {
	const dummy_response = { "sentimentValue": { "emotion": 4, "sentiment": 4 }};
	return dummy_response; // call real function; return analysis
}

function analyzeUserWrapper(userId) {
	const dummy_response = {'user': userId, 'value': {'emotion': 2, 'sentiment': userId}};
	return dummy_response; // replace with real user analysis
}

function serialize(obj) {
  var str = [];
  for (var p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
  return str.join("&");
}

// Put this on hold
function analyzeLinkWrapper(url) {
	// Replace with url variable
	const keys = {
		'SM_API_KEY': 'C016AF449A', 
		'SM_URL': 'https://thinkprogress.org/corporations-nra-f0d8074f2ca7/'
	} 

	const summary_url = "https://api.smmry.com/?" + serialize(keys);
	console.log(summary_url);
 	request.get(summary_url, (error, response, body) => {
 		json = JSON.parse(body);
 		console.log(json.sm_api_content)
 		// console.log(response);
 		const summary = json.sm_api_content;	
 		//Send summary to other services
		const dummy_response = {'summary': summary, 'factual': 6, 'emotional': .3, 'clickbait': .1};
 	});
}

// Single url
app.post('/link', (request, response) => {
	console.log(request.body);
	const json = request.body;

	analyzeLinkWrapper(json.url).then((linkData) => {
		json.sentimentvalue = linkdata;
		response.setheader('content-type', 'application/json');
		response.end(json.stringify(json));
	});
});	

// Single tweet
// Requires: {text}
app.post('/tweet', (request, response) => {
	const tweet = request.body;
	// Call tweet function
	analyzeTweetWrapper(tweet)
	.then((tweetAnalysis) => {
		response.setHeader('Content-Type', 'application/json');
		response.end(JSON.stringify(tweetAnalysis));
	});
});

// Multiple tweets
// Array of tweet objects
app.post('/tweets', (request, response) => {
	console.log(request.body);
	const json = request.body;

	Promise.all(json.tweetList.map((tweetObject) => {
		return analyzeTweetWrapper(tweetObject);
	}))
	.then((tweetDataList) => {
		response.setHeader('Content-Type', 'application/json');
		response.end(JSON.stringify(tweetDataList));
	});
});	

// Single user
// Requires: userid
app.post('/user', (request, response) => {
	analyzeUserWrapper(request.body.userId)
	.then((userAnalysis) => {
		response.setHeader('Content-Type', 'application/json');
		response.end(JSON.stringify(userAnalysis));
	});
});

// Multiple users 
// Requires: array of userids
app.post('/users', (request, response) => {
	const json = request.body;

	Promise.all(json.userList.map(userId => {
		return analyzeUserWrapper(userId);
	}))
	.then((linkDataList) => {
		const responseBody = {userSentiments: linkDataList, errorSentiments: []};
		response.setHeader('Content-Type', 'application/json');
		response.end(JSON.stringify(responseBody));
	});
});

// Basic listener for http requests (port 8080)
app.listen(8080);
