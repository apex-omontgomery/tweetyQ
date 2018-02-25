from flask import Flask, request, jsonify
from twitter_interact import get_tweets
from watsonHandler import WatsonHandler

app = Flask(__name__)


@app.route('/tweet', methods=['GET', 'POST'])
def user_analysis():
    json_data = request.get_json()
    if not json_data and 'text' not in json_data.keys():
        return jsonify({'error': 'Bad User Params'}), 400

    print(json_data['text'])
    json_data['nlp_data'] = WatsonHandler().nlu(json_data['text'])

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
