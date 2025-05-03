const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");

const app = express();
const PORT = 5001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Add a GET route for the root path
app.get("/", (req, res) => {
  res.send("Proxy server is running!");
});

// Proxy route
app.post("/proxy", async (req, res) => {
  const scriptUrl = "https://script.google.com/macros/s/AKfycbzHwY4D3Uyn0oJjRzy0yo5Ue26cemWajQdkuXsG5O891UKLqM-jBLHdEauscKxJJP87/exec";

  try {
    console.log("Forwarding request to Google Apps Script...");
    console.log("Request body:", req.body);

    const response = await fetch(scriptUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req.body),
    });

    console.log("Response status:", response.status);

    const data = await response.json();
    console.log("Response data:", data);

    res.status(response.status).json(data);
  } catch (error) {
    console.error("Error in proxy:", error);
    res.status(500).json({ error: "Failed to fetch from Google Apps Script" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
});