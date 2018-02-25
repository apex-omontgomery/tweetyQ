import tweepy

# Twitter API credentials
consumer_key = 'lItoXUlw5ZyQupYN0xKXwYGrc'
consumer_secret = 'G0m6to7CxMWwTBI3K4DFeb9PMtaKLOTzFt8ASxuLTUK6ZA6xET'
access_key = '941729945411231744-zJK9hYIReUlyjr1LIuBMnv97UA0PKmp'
access_secret = 'UXE4Cv9T6qFbiUDRgmrZEvW0ojCJ92ck6aXzhWXeZUFxA'


def get_tweets(user_id: str) -> str:
    auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
    auth.set_access_token(access_key, access_secret)
    api = tweepy.API(auth)
    all_tweets = []

    for tweet in api.user_timeline(user_id=user_id, count=150):
        all_tweets.append(tweet.text)

    return ''.join(all_tweets)
