async function findMood(event) {
  event.preventDefault();
  const moodInput = document.getElementById("moodInput");
  const mood = moodInput.value;
  const actMood = document.getElementById("acth3Mood");
  const foodMood = document.getElementById("musich3Mood");
  const musicMood = document.getElementById("foodh3Mood");
  const actH3 = document.getElementById("actH3");
  const foodH3 = document.getElementById("foodH3");
  const musicH3 = document.getElementById("musicH3");
  const loadingBar = document.getElementById("loading-screen-overlay");
  loadingBar.style.display = "block";

  try {
    const response = await fetch("/getMood", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ mood }),
    });

    if (!response.ok) {
      loadingBar.style.display = "none";
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.text();
    const moodResult = document.getElementById("moodResult");
    const resultDiv = moodResult.querySelector("#result");
    resultDiv.textContent = "You're feeling " + result + " now.";
    loadingBar.style.display = "none";
    moodResult.style.display = "flex";
    actMood.innerHTML = result;
    foodMood.innerHTML = result;
    musicMood.innerHTML = result;
    actH3.style.display = "flex";
    foodH3.style.display = "flex";
    musicH3.style.display = "flex";
  } catch (error) {
    console.error(`Error getting Mood: ${error}`);
    loadingBar.style.display = "none";
    alert(`Error getting Mood: ${error}`);
  }
}

async function findMoodMusic(event) {
  event.preventDefault();
  const mood = document.getElementById("musich3Mood").textContent;
  const loadingBar = document.getElementById("loading-screen-overlay");

  loadingBar.style.display = "block";

  try {
    const response = await fetch("/getMoodSong", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ mood }),
    });

    if (!response.ok) {
      loadingBar.style.display = "none";
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    let song1;
    let song2;
    let youtube1;
    let youtube2;
    let newSong1;
    let newSong2;

    if (result.rows && result.rows[0] && result.rows[0].song) {
      const songs = result.rows[0].song.split("\n\n");
      song1 = songs[0]
        ? songs[0]
            .replace("1. ", "")
            .replace(/"/g, "")
            .replace(" by ", "")
            .replace("Youtube link: ", "")
            .replace(/ https:.*/, "")
        : "";

      let urlIndex = song1.indexOf("https://");
      newSong1 = song1.substring(0, urlIndex);


      song2 = songs[1]
        ? songs[1]
            .replace("2. ", "")
            .replace(/"/g, "")
            .replace(" by ", "")
            .replace("Youtube link: ", "")
            .replace(/ https:.*/, "")
        : "";
      let urlIndex2 = song2.indexOf("https://");
      newSong2 = song2.substring(0, urlIndex2);

      youtube1 = songs[0].match(/https:\/\/www\.youtube\.com\/watch\?v=.*/g)[0];
      youtube2 = songs[1].match(/https:\/\/www\.youtube\.com\/watch\?v=.*/g)[0];
    } else {
      console.log("Error getting Mood: response data is invalid");
    }

    const musicResult = document.getElementById("musicBlock");
    const resultDiv = musicResult.querySelector("#musicResult");
    resultDiv.innerHTML =
      "Music Recommendation as per your mood are:<br/><br/>Music: " +
      newSong1 +
      "<br/>Youtube: " +
      youtube1 +
      "<br/><br/>Music: " +
      newSong2 +
      "<br/>Youtube: " +
      youtube2;

    loadingBar.style.display = "none";
    musicResult.style.display = "flex";
  } catch (error) {
    loadingBar.style.display = "none";
    console.error(`Error getting Mood: ${error}`);
    alert(`Error getting Mood: ${error}`);
  }
}

async function findMoodFood(event) {
  event.preventDefault();
  const mood = document.getElementById("foodh3Mood").textContent;
  const loadingBar = document.getElementById("loading-screen-overlay");

  loadingBar.style.display = "block";

  try {
    const response = await fetch("/getMoodFood", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ mood }),
    });

    if (!response.ok) {
      loadingBar.style.display = "none";
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    const food = result.rows[0].food;
    const foodArray = food.split("\n");
    const foodDataRegex = /[:|-]\s+/; // matches ":" or "-" followed by one or more spaces
    const food1Data = foodArray[0].split(foodDataRegex);
    const food1Name = food1Data[0].substring(2);
    const food1Benefit = food1Data[1].trim();
    const food2Data = foodArray[1].split(foodDataRegex);
    const food2Name = food2Data[0].substring(2);
    const food2Benefit = food2Data[1].trim();

    const moodFoodResult = document.getElementById("foodBlock");
    const resultDiv = moodFoodResult.querySelector("#foodResult");
    resultDiv.innerHTML =
      "Food Recommendation as per your mood are:<br/><br/>Food: " +
      food1Name +
      "<br/>Benefit: " +
      food1Benefit +
      "<br/><br/>Food: " +
      food2Name +
      "<br/>Benefit: " +
      food2Benefit;
    loadingBar.style.display = "none";
    moodFoodResult.style.display = "flex";
  } catch (error) {
    loadingBar.style.display = "none";
    console.error(`Error getting Food for Mood: ${error}`);
    alert(`Error getting Food for Mood: ${error}`);
  }
}

async function findMoodActivity(event) {
  event.preventDefault();
  const mood = document.getElementById("acth3Mood").textContent;
  const loadingBar = document.getElementById("loading-screen-overlay");

  loadingBar.style.display = "block";

  try {
    const response = await fetch("/getMoodActivity", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ mood }),
    });

    if (!response.ok) {
      loadingBar.style.display = "none";
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json(); // Parse response as JSON

    const activity = result.rows[0].activity;
    const activitiesArray = activity.split("\n\n");

    const activity1Data = activitiesArray[0].split("|")[0].trim().split(": ");
    const activity1Name = activity1Data[1].trim();
    const activity1Benefit = activitiesArray[0]
      .split("|")[1]
      .trim()
      .split(": ")[1]
      .trim();

    const activity2Data = activitiesArray[1].split("|")[0].trim().split(": ");
    const activity2Name = activity2Data[1].trim();
    const activity2Benefit = activitiesArray[1]
      .split("|")[1]
      .trim()
      .split(": ")[1]
      .trim();

    const activityResult = document.getElementById("activityDiv");
    const resultDiv = activityResult.querySelector("#activityResult");
    resultDiv.innerHTML =
      "Activity Recommendation as per your mood are:<br/><br/>Activity: " +
      activity1Name +
      "<br/>Benefit: " +
      activity1Benefit +
      "<br/><br/>Activity: " +
      activity2Name +
      "<br/>Benefit: " +
      activity2Benefit;

    loadingBar.style.display = "none";
    activityResult.style.display = "flex";
  } catch (error) {
    loadingBar.style.display = "none";
    console.error(`Error getting Mood: ${error}`);
    alert(`Error getting Mood: ${error}`);
  }
}

// Close the response blocks

const activityDiv = document.getElementById("activityDiv");
const activityCloseButton = activityDiv.querySelector(".home-button2");
activityCloseButton.addEventListener("click", function () {
  activityDiv.style.display = "none";
});

const moodCloseButton = document.querySelector(".home-button1");
moodCloseButton.addEventListener("click", () => {
  moodResult.style.display = "none";
});

const musicBlock = document.getElementById("musicBlock");
const musicCloseButton = musicBlock.querySelector(".home-button4");
musicCloseButton.addEventListener("click", () => {
  musicBlock.style.display = "none";
});

const foodBlock = document.getElementById("foodBlock");
const foodCloseButton = document.querySelector(".home-button6");
foodCloseButton.addEventListener("click", () => {
  foodBlock.style.display = "none";
});
