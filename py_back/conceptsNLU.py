#This file takes a number of tweets from a single user, makes them into a single string variable and then uses WATSON AI
#to analyze the language and determine what a user talks about the most

import json
import tweepy
from watson_developer_cloud import NaturalLanguageUnderstandingV1
from watson_developer_cloud.natural_language_understanding_v1 \
  import Features, EntitiesOptions, KeywordsOptions, ConceptsOptions

#Twitter Login Credentials
auth = tweepy.OAuthHandler('XAjruRZe6O6gen4zGLJL5VTbw', 'vw3a8tb1AnMXEEUI3HXt7Xq5CpvjB0LNEtmAf5PmJCZYkQ3RPq')
auth.set_access_token('906982976344481794-7Nbvj6fCqkcTHNVoaepvq6iIMIJxc8G', 'sDFWRJDAcscgFkGf0Sp1M4iPB0K5FLMwW6ck2y3ANMy9a')

  # Construct the API instance
api = tweepy.API(auth)

#Watson Login Credentials
natural_language_understanding = NaturalLanguageUnderstandingV1(
  username= "3ca320cb-0473-4ae1-9d63-a72d139c27c2",
  password= "tLrq6dXUA1D5",
  version='2017-02-27')

#Find tweets from your intended user and put them in a string 'n'
def getInfo(user_id):
    tweets = []
    tweets = api.user_timeline(user_id=user_id, count =150)
    n = ' '
    for tweet in tweets:
        # nluRun(tweet.text)
        n += tweet.text + ' '
    nluRun(n)

#Run the NLU once it has been called from the getInfo function
def nluRun(txt):
    response = natural_language_understanding.analyze(
      text= txt,
      features=Features(
        entities=EntitiesOptions(
          emotion=True,
          sentiment=True,
          limit=3),
        keywords=KeywordsOptions(
          emotion=True,
          sentiment=True,
          limit=3),
        concepts=ConceptsOptions(
          limit=3))
    )

#Prints the relevant texts and scores, len() is used because earlier it looped each tweet individually then we
#compressed them all to one string
    for x in range(0,len(response["concepts"])):
        # print(x)
        con = response["concepts"][x]["text"]
        rel = response["concepts"][x]["relevance"]
        # print(response["concepts"][x]["text"])
        # print(response["concepts"][x]["relevance"])
        sendArray = {'Concept': con, 'Relevance': rel}
        print(sendArray)

#Call function with user id
getInfo(user_id)
