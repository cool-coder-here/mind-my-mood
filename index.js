require("dotenv").config();
const express = require("express");
const app = express();
const port = 3001;
const bodyParser = require("body-parser");
const Mindsdb = require("mindsdb-js-sdk").default;
const native = require("./handler.js");
// Serve static files from the public directory
app.use(express.static("public"));

// Parse incoming request bodies in a middleware before your handlers, available under req.body property
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Establish a connection to the MindsDB server
let mindsdbConnection;
async function establishMindsDBConnection() {
  try {
    await Mindsdb.connect({
      user: process.env.MINDSDB_USER,
      password: process.env.MINDSDB_PASS,
    });
    console.log("Connection Successful");
  } catch (error) {
    console.error("Error connecting to MindsDB:", error);
    throw error;
  }
}

// Serve the landing page
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// Endpoints for getting suggestions based on mood
app.post("/getMood", async (req, res) => {
  try {
    const mood = req.body.mood;
    // Logic for getting suggestions based on mood using MindsDB
    const result = await native.getMood(mood);
    res.send(result);
  } catch (error) {
    console.error(`Error getting Mood: ${error}`);
    res.status(500).send(`Error getting Mood: ${error}`);
  }
});

app.post("/getMoodSong", async (req, res) => {
  try {
    const mood = req.body.mood;
    // Logic for getting song suggestions based on mood using MindsDB
    const result = await native.getMoodMusic(mood);
    res.send(result);
  } catch (error) {
    console.error(`Error getting song suggestions: ${error}`);
    res.status(500).send(`Error getting song suggestions: ${error}`);
  }
});

app.post("/getMoodFood", async (req, res) => {
  try {
    const mood = req.body.mood;
    // Logic for getting food suggestions based on mood using MindsDB
    const result = await native.getMoodFood(mood);
    res.send(result);
  } catch (error) {
    console.error(`Error getting food suggestions: ${error}`);
    res.status(500).send(`Error getting food suggestions: ${error}`);
  }
});

app.post("/getMoodActivity", async (req, res) => {
  try {
    const mood = req.body.mood;
    // Logic for getting activity suggestions based on mood using MindsDB
    const result = await native.getMoodActivity(mood);
    res.send(result);
  } catch (error) {
    console.error(`Error getting activity suggestions: ${error}`);
    res.status(500).send(`Error getting activity suggestions: ${error}`);
  }
});

// Start the server and establish the MindsDB connection
app.listen(port, async () => {
  await establishMindsDBConnection();
  console.log(`App listening at http://localhost:${port}`);
});
