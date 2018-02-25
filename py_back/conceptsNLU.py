import json
import tweepy
from watson_developer_cloud import NaturalLanguageUnderstandingV1
from watson_developer_cloud.natural_language_understanding_v1 \
  import Features, EntitiesOptions, KeywordsOptions, ConceptsOptions

#Watson Login Credentials
natural_language_understanding = NaturalLanguageUnderstandingV1(
  username= "3ca320cb-0473-4ae1-9d63-a72d139c27c2",
  password= "tLrq6dXUA1D5",
  version='2017-02-27')

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

    for x in range(0,len(response["concepts"])):
        print(json.dumps(response["concepts"][x]["text"], indent=2))
        print(json.dumps(response["concepts"][x]["relevance"], indent=2))


tweet = 'IBM is an American multinational technology company headquartered in Armonk, New York, United States, with operations in over 170 countries.'
nluRun(tweet)
