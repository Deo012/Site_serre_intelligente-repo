import threading
from flask import Flask, jsonify
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
        time.sleep(30)
        for key in donne.keys():
            donne[key] = randint(10, 50)
        print(f"Updated values: {donne}")

@app.route("/")
def hello_world():
    return "<p>Hello world</p>"

@app.route("/retreiveData", methods=["GET"])
def send_data():
    return jsonify(donne)  # Proper JSON response


if __name__ == "__main__":
    # Start the background data generation
    threading.Thread(target=regenerate_values, daemon=True).start()

    # Run the Flask app
    app.run(host='0.0.0.0', port=5000, debug=True)

