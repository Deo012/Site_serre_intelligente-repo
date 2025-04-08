import threading
from flask import Flask, jsonify, request
from random import randint
import time
from flask_cors import CORS
import os
import tensorflow as tf
from keras.preprocessing import image
import numpy as np
from pymongo import MongoClient

app = Flask(__name__)
CORS(app)


mongo_uri = 'mongodb://localhost:27017/'
client = MongoClient(mongo_uri)

db_name = 'serreIntelligente'

connection = client[db_name]

model = tf.keras.models.load_model("plant_recognition_model.keras")

class_names = ["Aloe_Vera", "Orchids", "Pothos"]  

def predict_plant(img_path):
    img = image.load_img(img_path, target_size=(128, 128))
    img_array = image.img_to_array(img) / 255.0
    img_array = np.expand_dims(img_array, axis=0)

    prediction = model.predict(img_array)
    class_index = np.argmax(prediction)  
    return class_names[class_index]

def dataPlant(nomPlant):
    collection_nom = "InformationSurPlante"
    collection = connection[collection_nom]

    data = collection.find_one({"common_name": nomPlant}, {"_id": 0})

    return data


donne = {
    "temp": 30,
    "hum": 20,
    "co2": 40
}

def regenerate_values():
    """Updates dictionary values every 30 seconds."""
    while True:
        time.sleep(2)
        for key in donne.keys():
            donne[key] = randint(10, 50)
        # print(f"Updated values: {donne}")

# @app.route("/retrievePltData", methods=["GET"])
# def send_data():
#     return jsonify({"plantData": plant_data})
    

@app.route("/")
def hello_world():
    return "<p>Hello world</p>"

@app.route("/retreiveData", methods=["GET"])
def send_data():
    return jsonify(donne)  # Proper JSON response

@app.route("/predict", methods=["POST"])
def predict():
    if "imageFile" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["imageFile"]
    file_path = "uploads/" + file.filename


    os.makedirs("uploads", exist_ok=True)

    file.save(file_path)
    plant_name = predict_plant(file_path)

    global plant_data
    plant_data = dataPlant(plant_name)

    return jsonify({"plant_name": plant_name, "plant_info": plant_data})


if __name__ == "__main__":
    try:
        # Start the background data generation
        thread = threading.Thread(target=regenerate_values, daemon=True)
        thread.start()

        # Run the Flask app
        app.run(host='0.0.0.0', port=5000, debug=False)
    except KeyboardInterrupt:
        thread.join()