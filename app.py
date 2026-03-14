from flask import Flask, render_template, request, jsonify
import numpy as np
import joblib
import os

app = Flask(__name__)

# Load models
model = joblib.load("kmeans_model.pkl")
scaler = joblib.load("scaler.pkl")

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/dashboard")
def dashboard():
    return render_template("dashboard.html")

@app.route("/predict", methods=["POST"])
def predict():

    data = request.get_json()

    age = float(data["age"])
    income = float(data["income"])
    spending = float(data["spending"])
    web = float(data["web"])
    store = float(data["store"])
    visits = float(data["visits"])
    recency = float(data["recency"])

    #order must match training features
    features = np.array([[age, income, spending, web, store, visits, recency]])

    print("Raw Input:", features)

    # It may show warnings about feature scaling. So Input Scaled here
    
    features_scaled = scaler.transform(features)

    cluster = int(model.predict(features_scaled)[0])

    print("Predicted Cluster:", cluster)

    return jsonify({"cluster": cluster})


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)