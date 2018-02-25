from flask import Flask

app = Flask(__name__)


@app.route('/user')
def user_analysis():
    return 'Hello World!'

@app.route('/tweet')
def tweet_analysis():
    return 'Hello World!'

if __name__ == '__main__':
    app.run()
