const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());


function analyzeTweetWrapper(tweet) {
	const dummy_response =  { "sentimentValue": { "emotion": 4, "sentiment": 4 }};
	return dummy_response; // call real function; return analysis
}

function analyzeUserWrapper(userId) {

	const dummy_response = {'user': userId, 'value': {'emotion': 2, 'sentiment': userId}};
	return dummy_response; // replace with real user analysis
}

function analyzeLinkWrapper(url) {

	const dummy_response = {'factual': .6, 'emotional': .3, 'clickbait': .1};
	return dummy_response; // replace with link/article analysis
}

// Single url
app.post('/link', (request, response) => {
	console.log(request.body);
	const json = request.body;

	const linkData = analyzeLinkWrapper(request.body.url);
	json.sentimentValue = linkData;	
	response.setHeader('Content-Type', 'application/json');
	response.end(JSON.stringify(json));
});	

// Single tweet
// Requires: {text}
app.post('/tweet', (request, response) => {
	const tweet = request.body;
	// Call tweet function
	const tweetAnalysis = analyzeTweetWrapper(tweet);
	response.setHeader('Content-Type', 'application/json');
	response.end(JSON.stringify(tweetAnalysis));
});

// Multiple tweets
// Array of tweet objects
app.post('/tweets', (request, response) => {
	console.log(request.body);
	const json = request.body;

	let tweetDataList = json.tweetList.map((tweetObject) => {
		return analyzeTweetWrapper(tweetObject);
	});	
	
	response.setHeader('Content-Type', 'application/json');
	response.end(JSON.stringify(tweetDataList));
});	

// Single user
// Requires: userid
app.post('/user', (request, response) => {
	const userAnalysis = analyzeUserWrapper(request.body.userId);
	response.setHeader('Content-Type', 'application/json');
	response.end(JSON.stringify(userAnalysis));
});

// Multiple users 
// Requires: array of userids
app.post('/users', (request, response) => {
	const json = request.body;
	let userDataList = json.userList.map(userId => {
		return analyzeUserWrapper(userId);
	});

	const responseBody = {userSentiments: linkDataList, errorSentiments: []};
	response.setHeader('Content-Type', 'application/json');
	response.end(JSON.stringify(responseBody));
});

// Basic listener for http requests (port 8080)
app.listen(8080);
