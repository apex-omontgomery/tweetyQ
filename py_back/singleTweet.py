print " "
print "The bot is coming to life..."
print " "

import json
import tweepy
from watson_developer_cloud import ToneAnalyzerV3

#Twitter Login Credentials
auth = tweepy.OAuthHandler('XAjruRZe6O6gen4zGLJL5VTbw', 'vw3a8tb1AnMXEEUI3HXt7Xq5CpvjB0LNEtmAf5PmJCZYkQ3RPq')
auth.set_access_token('906982976344481794-7Nbvj6fCqkcTHNVoaepvq6iIMIJxc8G', 'sDFWRJDAcscgFkGf0Sp1M4iPB0K5FLMwW6ck2y3ANMy9a')

#Watson Login Credentials
tone_analyzer = ToneAnalyzerV3(
  version='2017-09-21',
  username='a6f558d8-06d2-45a7-93a7-5c358290b6a4',
  password='AaRIysTakCa6'
)

def toneAnalyze(tweet):
    print(json.dumps(tone_analyzer.tone(tone_input= tweet,
                                    content_type="text/plain"), indent=2))

tweetPhrase = 'I am very happy. It is a good day.'
toneAnalyze(tweetPhrase)
