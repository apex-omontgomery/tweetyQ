from flask import Flask, request, jsonify
from twitter_interact import get_tweets
from watsonHandler import WatsonHandler
import requests
import random 
from profanity import profanity

app = Flask(__name__)


def compute_emotions(nlp_data):
    emotionCount = 0 

    emotions = {'anger': 0, 'disgust': 0, 'fear': 0, 'joy': 0, 'sadness': 0 }

    for entity in nlp_data['keywords']:
        if 'emotion' in entity:
            emotions['anger'] += entity['emotion']['anger']
            emotions['disgust'] += entity['emotion']['disgust']
            emotions['fear'] += entity['emotion']['fear']
            emotions['joy'] += entity['emotion']['joy']
            emotions['sadness'] += entity['emotion']['sadness']
            emotionCount += 1


    emotions['anger'] /= emotionCount
    emotions['disgust'] /= emotionCount
    emotions['fear'] /= emotionCount
    emotions['joy'] /= emotionCount
    emotions['sadness'] /= emotionCount
    return emotions


@app.route('/tweet', methods=['GET', 'POST'])
def user_analysis():
    json_data = request.get_json()
    if not json_data and 'text' not in json_data.keys():
        return jsonify({'error': 'Bad User Params'}), 400

    nlp_data = WatsonHandler().nlu(json_data['text'])

    # Compute 5 emotion values 
    emotions = compute_emotions(nlp_data)

    # Improve this heuristic if time
    inappropriate_emotion_heuristic = (emotions['anger'] + emotions['disgust']) / 2
    contains_profanity = profanity.contains_profanity(json_data['text'])
    profanity_value = random.uniform(0.0, 0.1)
    if contains_profanity:
        profanity_value += .9

    inappropriate_spectrum = max(inappropriate_emotion_heuristic, profanity_value)

    clickbaitiness = 0
    try:
        originality = requests.get('http://127.0.0.1:5001/detect', params={'headline': json_data['text']}).json()
        clickbaitiness = float(originality['clickbaitiness'])
    except:
        clickbaitiness = .1

    json_data['nlp_data'] = {  
        'emotions': emotions,
        'inappropriateness': inappropriate_spectrum,
        'clickbaitiness': clickbaitiness
    } 

    return jsonify(json_data), 200


@app.route('/user', methods=['GET', 'POST'])
def tweet_analysis():
    json_data = request.get_json()

    if not json_data and 'user_id' not in json_data.keys():
        return jsonify({'error': 'Bad User Params'}), 400

    tweet_value = get_tweets(json_data['user_id'])

    json_data['personality_data'] = WatsonHandler().profile_data(tweet_value)

    return jsonify(json_data), 200


if __name__ == '__main__':
    app.run()
