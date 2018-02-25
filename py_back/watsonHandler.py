from watson_developer_cloud import ToneAnalyzerV3, PersonalityInsightsV3

v_dict = {'version': '2017-09-21',
          'username': 'a6f558d8-06d2-45a7-93a7-5c358290b6a4',
          'password': 'AaRIysTakCa6'}

d_dict = {'username': 'bbd18d95-927e-46b1-9245-a0ca4e573fd9',
          'password': 'krBzGSyFWygP',
          'version': '2017-10-13'}


from json import dumps

class WatsonHandler:

    def profile_data(self, full_tweet_string):

        # Get recent tweets from user
        personality_insights = PersonalityInsightsV3(**d_dict)
        return personality_insights.profile(content=full_tweet_string, content_type='text/plain',
                                            accept='application/json', raw_scores=False)




    def tone(self, tweet):
        tone_analyzer = ToneAnalyzerV3(**v_dict)
        return tone_analyzer.tone(tone_input=tweet,
                                  content_type="text/plain")
