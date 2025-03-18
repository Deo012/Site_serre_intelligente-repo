'use server'

// npm install prisma @prisma/client
// npm install --save-dev @prisma/adapter-mongodb     n'as pas fonctionné
// npm install --save-dev @types/node

const express = require("express");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const app = next({dev});
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  // Exemple API route
  server.get("/api/hello", (req, res) =>{
    res.json({messsage: "Hello from Express API"})
  });

  // Handle everything else with nextjs
  server.all("*", (req, res) => {
    return handle(req, res);
  })

  server.listen(3000, ()=>{
    console.log("Serveur running on http://localhost:3000")
  })
});