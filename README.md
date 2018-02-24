# twitter_sentiment_scrubbing

## API Endpoints

POST `localhost:8080/tweet`
Request: ![json_examples/tweet_request.json](json_examples/tweet_request.json)
Response: ![json_examples/tweet_.json](json_examples/tweet_.json)

POST `localhost:8080/tweets`
Request: ![json_examples/multiple_tweets_request.json](json_examples/multiple_tweets_request.json)
Response: not yet

POST `localhost:8080/user`
Request: ```json
{ "userId" : "<user_id_num>"}
```
Response: ```json
{ 
	"user": "410409666", 
	"value": 
	{ 
		"emotion": 4, 
		"sentiment": 4 
	} 
}
```

POST `localhost:8080/users`
Request: ![json_examples/user_request.json](json_examples/user_request.json)
Response: ![json_examples/user_response.json](json_examples/user_response.json)

POST `localhost:8080/link`
Request: ![json_examples/article_request.json](json_examples/article_request.json)
Response: ![json_examples/article_response.json](json_examples/article_response.json)


