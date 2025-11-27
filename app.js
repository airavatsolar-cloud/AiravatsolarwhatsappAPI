const express = require("express");
const app = express();
app.use(express.json());

// VERIFY TOKEN (VERY IMPORTANT)
const VERIFY_TOKEN = "EAAhnXwsqesgBQEECflQzWfUHGZAJPgHXjuJjMDmQ0qcMZCAK13YYM6KT..."; 
// <-- Use the SAME TOKEN you entered in Meta dashboard

// WEBHOOK VERIFICATION
app.get("/webhook", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode && token && mode === "subscribe" && token === VERIFY_TOKEN) {
    console.log("WEBHOOK VERIFIED");
    return res.status(200).send(challenge);
  } else {
    return res.sendStatus(403);
  }
});

// WEBHOOK RECEIVER (POST)
app.post("/webhook", (req, res) => {
  console.log("Incoming message:", JSON.stringify(req.body, null, 2));
  res.sendStatus(200);
});

// START SERVER
app.listen(10000, () => {
  console.log("Listening on port 10000");
});
