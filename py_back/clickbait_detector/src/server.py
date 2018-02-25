from flask import Flask, jsonify, request
from detect import predictor



app = Flask(__name__)

@app.route("/detect", methods=["GET"])
def detect ():
    headline = request.args.get("headline", "")
    print(headline)
    clickbaitiness = predictor.predict(headline)
    print(clickbaitiness)
    return jsonify({ "clickbaitiness": str(clickbaitiness) })


if __name__ == "__main__":
    app.run(host='127.0.0.1', port=5001)
