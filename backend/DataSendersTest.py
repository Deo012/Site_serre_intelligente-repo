import threading
from flask import Flask, jsonify, request
from random import randint
import time
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

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
        print(f"Updated values: {donne}")

@app.route("/")
def hello_world():
    return "<p>Hello world</p>"

@app.route("/retreiveData", methods=["GET"])
def send_data():
    return jsonify(donne)  # Proper JSON response

@app.route("/sendImage", methods=["POST"])
def get_data():
    file = request.files["image"]
    filename = file.filename
    name = "Tomato"
    return jsonify(name)


if __name__ == "__main__":
    try:
        # Start the background data generation
        thread = threading.Thread(target=regenerate_values, daemon=True)
        thread.start()

        # Run the Flask app
        app.run(host='0.0.0.0', port=5000, debug=False)
    except KeyboardInterrupt:
        thread.join()



