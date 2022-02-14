from flask import Flask, render_template, request, redirect, url_for, jsonify
from random import randint

app = Flask(__name__, template_folder='template', static_folder='template/static')

@app.route("/")
def home():
    return render_template("home.html")


@app.route("/emotionalanalysis")
def emotional():
    return render_template("emotion.html")


@app.route("/audio")
def audio():
    return render_template("audio.html")

@app.route("/audioupload")
def audioupload():
    return render_template("audioupload.html")

@app.route("/twitterhandle")
def twitterhandle():
    return render_template("twitterhandle.html")

@app.route("/twitterhashtags")
def twitterhashtags():
    return render_template("twitterhashtags.html")

@app.route("/", methods = ['POST'])
def sentimentpredict():
    user_query = request.data.decode("utf-8")
    
    if user_query:
        if user_query[0] == '@' and len(user_query) <=16:
            return jsonify({"query": "It seems that you entered twitter handle here."})
        elif user_query:
            return jsonify({"prediction": randint(0,2), "query": user_query})
    else:
        return jsonify({"query": ""})

if __name__ == "__main__":
    app.run(debug=True)