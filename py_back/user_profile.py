from watson_developer_cloud import PersonalityInsightsV3

def get_user_profile(userTweetsStr):
	# Get recent tweets from user 
	personality_insights = PersonalityInsightsV3(
		username='bbd18d95-927e-46b1-9245-a0ca4e573fd9',
  		password='krBzGSyFWygP',
  		version='2017-10-13'
	)
	return personality_insights.profile(content=userTweetsStr, content_type='text/plain', content_language=None,
	  accept='application/json', accept_language=None, raw_scores=None, csv_headers=None, consumption_preferences=None)
