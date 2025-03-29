#pip install flask-socketio

import threading
from flask import Flask, jsonify
from random import randint
import time
from flask_cors import CORS
from flask_socketio import SocketIO
from flask_socketio import send, emit

app = Flask(__name__)
CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*")  # Allow CORS for all origins

donne = {
    "temp": 30,
    "hum": 20,
    "co2": 40
}

def regenerate_values():
    """Updates dictionary values every 2 seconds."""
    while True:
        time.sleep(2)
        for key in donne.keys():
            donne[key] = randint(10, 50)
        print(f"Updated values: {donne}")

        # Emit new values to all connected clients
        socketio.emit("mesured_data", {"sender": "microcontroller", "mesure": donne})

@socketio.on("connect")
def test_connect(auth):
    emit("mesured_data", donne)


if __name__ == "__main__":
    try:
        # Start the background data generation
        thread = threading.Thread(target=regenerate_values, daemon=True)
        thread.start()

        # Run the Flask app
        socketio.run(app=app, host='0.0.0.0', port=5000, debug=False)
    except KeyboardInterrupt:
        thread.join()



