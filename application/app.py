from flask import Flask, render_template, request, redirect, url_for, jsonify
from random import randint
import os
from twitterapi import Twitter

app = Flask(__name__, template_folder='template', static_folder='template/static')

twitter = Twitter()

# Function for landing / home page
@app.route("/")
def home():
    return render_template("home.html")


# Function for Custom Tweet or Text (Sentiment)
@app.route("/sentimentcustomtweet")
def sentimentCustomTweet():
    return render_template("sentimentcustomtweet.html")


# Function for Predictions of Custom Tweet or Text (Sentiment)
@app.route("/sentimentcustomtweet", methods = ['POST'])
def sentimentCustomTweetPredictor():
    user_query = request.data.decode("utf-8")
    if user_query:
        if user_query[0] == '@' and len(user_query) <=16:
            return "True"
        elif user_query:
            return jsonify({"prediction": randint(0,2), "query": user_query})
    else:
        return jsonify({"query": ""})
    return render_template("sentimentcustomtweet.html")


# Function for Custom Tweet or Text Page (Emotions)
@app.route("/emotionalcustomtweet")
def emotionalCustomTweet():
    return render_template("emotionalcustomtweet.html")


# Function for Predictions of Custom Tweet or Text (Emotions)
@app.route("/emotionalcustomtweet")
def emotionalCustomTweetPredictor():
    return jsonify({"emotionalcustomtweet": ""})


# Function for Audio (Sentiment)
@app.route("/sentimentaudioanalysis")
def sentimentAudioAnalysis():
    return render_template("sentimentaudioanalysis.html")


# Function for Predictions of Audio (Sentiment)
@app.route("/sentimentaudioanalysis")
def sentimentAudioAnalysisPredictor():
    return jsonify({"sentimentaudioanalysis": ""})


# Function for Audio (Emotions)
@app.route("/emotionalaudioanalysis")
def emotionalAudioAnalysis():
    return render_template("emotionalaudioanalysis.html")


# Function for Predictions of Audio (Emotions)
@app.route("/emotionalaudioanalysis")
def emotionalAudioAnalysisPredictor():
    return jsonify({"emotionalaudioanalysis": ""})


# Function for Uploaded Audio (Sentiment)
@app.route("/sentimentuploadaudioanalysis")
def sentimentUploadAudioAnalysis():
    return render_template("sentimentuploadaudioanalysis.html")


# Function for Predictions of Uploaded Audio (Sentiment)
@app.route("/sentimentuploadaudioanalysis")
def sentimentUploadAudioAnalysisPredictor():
    return jsonify({"sentimentuploadaudioanalysis": ""})


# Function for Uploaded Audio (Emotions)
@app.route("/emotionaluploadaudioanalysis")
def emotionalUploadAudioAnalysis():
    return render_template("emotionaluploadaudioanalysis.html")


# Function for Predictions of Uploaded Audio (Emotions)
@app.route("/emotionalaudioanalysis")
def emotionalUploadAudioAnalysisPredictor():
    return jsonify({"emotionaluploadaudioanalysis": ""})


# Function for Live Tweet (Sentiment)
@app.route("/sentimentlivetweet")
def sentimentLiveTweet():
    return render_template("sentimentlivetweet.html")


# Function for Live Tweet Predictions (Sentiment)
@app.route("/sentimentlivetweet", methods = ['POST'])
def sentimentLiveTweetPredictor():
    sentiment = {}
    user_name = request.data.decode("utf-8")
    if user_name:
        if user_name[0] == '@' and len(user_name) <=16:
            all_tweets = twitter.tweets_api(user_name[1:], 10)
            for tweet in all_tweets:
                sentiment[tweet] = randint(1,3)
            return jsonify(sentiment)
        elif user_name:
            return jsonify(sentiment)
    else:
        return jsonify(sentiment)
    return jsonify({"sentimentlivetweet": ""})


# Function for Live Tweet (Sentiment)
@app.route("/sentimentlivehashtags")
def sentimentLiveHashtags():
    return render_template("sentimentlivehashtags.html")


# Function for Live Tweet Predictions (Sentiment)
@app.route("/sentimentlivehashtags")
def sentimentLiveHashtagsPredictor():
    return jsonify({"sentimentlivehashtags": ""})



if __name__ == "__main__":
    app.run(debug=True)