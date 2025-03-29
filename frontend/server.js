'use server'

// npm install prisma @prisma/client
// npm install --save-dev @prisma/adapter-mongodb     n'as pas fonctionné
// npm install --save-dev @types/node
// npm i socket.io

import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";
import { io as ClientIO } from "socket.io-client"; // Rename to avoid conflict

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

//Ensemble de données à controler
let health_param = {
  "nom_scientifique": "Solanum lycopersicum",
  "humidite_min": 65,
  "humidite_max": 75,
  "temp_min": 18,
  "temp_max": 27,
};

let current_mesure = {
  "temp": 0,
  "hum": 0,
  "co2": 0
};


app.prepare().then(() => {
  const httpServer = createServer(handler);

  const io = new Server(httpServer, {
    cors: {
      origin: true,
      credentials: true
    },
  });

  // Connect to the microcontroller server
  const micro_socket = ClientIO("http://127.0.0.1:5000");

  const current_mesure = {
    temp: 0,
    hum: 0,
    co2: 0,
  };

  // Listen for incoming measurement data ONCE and broadcast to all clients
  micro_socket.on("mesured_data", (data) => {
    current_mesure.temp = data.temp;
    current_mesure.hum = data.hum;
    current_mesure.co2 = data.co2;

    // Send updated measurements to all connected frontend clients
    io.emit("update_mesurement", current_mesure);
  });

  // Handle new client connections
  io.on("connection", (socket) => {
    console.log("New client connected:", socket.id);

    // Send the current measurement immediately when a client connects
    socket.emit("update_mesurement", current_mesure);

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });

  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});
