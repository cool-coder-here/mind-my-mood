const Mindsdb = require("mindsdb-js-sdk").default;

async function getMood(mood) {
  try {
    const parseMood = mood.replace(/"/g, "");
    const text = `SELECT Mood FROM openai_mood_model WHERE text="${parseMood}"`;
    const moodRes = await Mindsdb.SQL.runQuery(text);
    if (!moodRes.rows) {
      throw new Error("Invalid response from MindsDB");
    }
    return moodRes.rows[0].mood;
  } catch (error) {
    logger.error("Error getting Mood:", error);
  }
}

async function getMoodActivity(mood) {
  try {
    const parseMood = mood.replace(/"/g, "");
    const text = `SELECT Activity
      FROM openai_mood_activity_model
      WHERE mood="${parseMood}"`;
    const moodActivityRes = await Mindsdb.SQL.runQuery(text);
    console.log("handler.js--->", moodActivityRes);
    if (!moodActivityRes.rows) {
      throw new Error("Invalid response from MindsDB");
    }
    return moodActivityRes;
  } catch (error) {
    logger.error("Error getting Activity for the Mood:", error);
  }
}

async function getMoodFood(mood) {
  try {
    const parseMood = mood.replace(/"/g, "");
    const text = `SELECT Food
      FROM openai_mood_food_model WHERE mood="${parseMood}"`;
    const moodFoodRes = await Mindsdb.SQL.runQuery(text);
    console.log(moodFoodRes);
    if (!moodFoodRes.rows) {
      throw new Error("Invalid response from MindsDB");
    }
    return moodFoodRes;
  } catch (error) {
    logger.error("Error getting Food for the Mood:", error);
  }
}

async function getMoodMusic(mood) {
  try {
    const parseMood = mood.replace(/"/g, "");
    const text = `SELECT Song
      FROM openai_mood_song_model
      WHERE mood="${parseMood}"`;
    const moodMusicRes = await Mindsdb.SQL.runQuery(text);
    console.log(moodMusicRes);
    if (!moodMusicRes.rows) {
      throw new Error("Invalid response from MindsDB");
    }
    return moodMusicRes;
  } catch (error) {
    logger.error("Error getting Music for the Mood:", error);
  }
}

module.exports = { getMood, getMoodActivity, getMoodFood, getMoodMusic };
