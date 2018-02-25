from flask import Flask, request, jsonify
from twitter_interact import get_tweets


app = Flask(__name__)


@app.route('/tweet')
def user_analysis():
    json_data = request.get_json()
    return 'Hello World!'

@app.route('/user', methods=['GET', 'POST'])
def tweet_analysis():
    json_data = request.get_json()

    if not json_data:
        json_data['personality_data'] = get_tweets('27260086')
        return jsonify(json_data)
        return jsonify({'ok': False, 'error': 'Missing Required Body Params'}), 400
    # json_data['personality_data'] = get_tweets(json_data['user_list'])
    vals = json_data['personality_data'] = get_tweets('27260086')

    return jsonify(vals), 200


if __name__ == '__main__':
    app.run()
