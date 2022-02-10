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
def predict():
    data_dict = request.files.to_dict()
    if data_dict:
        image = data_dict['imageFile']
        image.save('./image.jpg')
        return jsonify({"class_name": randint(0, 500)})
    return jsonify({"class_name": ''})

if __name__ == "__main__":
    app.run(debug=True)