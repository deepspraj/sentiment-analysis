# -*- coding: utf-8 -*-
"""
Created on Mon Jan 24 23:20:22 2022
"""
"""
@author: deepspraj
"""

from flask import Flask, render_template, request, redirect, url_for, jsonify
from random import randint

app = Flask(__name__, template_folder='template', static_folder='template/static')

@app.route("/")
def home():
    return render_template("base.html", image = '')

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