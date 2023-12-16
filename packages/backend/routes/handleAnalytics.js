const express = require("express");
const router = express.Router();
const mysql = require("mysql2/promise");
const path = require("path");
const NodeCache = require("node-cache");
require("dotenv").config({ path: path.resolve(__dirname, "../../../.env") });

const analyticsCache = new NodeCache();

// MySQL connection settings
const connectionSettings = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
};

const generateHandleGroupByQuery = (groupBy) => `
SELECT ${groupBy}, SUM(book_risk) as total_handle
FROM bet_transactions
GROUP BY ${groupBy}
ORDER BY total_handle DESC
`;

const runQuery = async (query) => {
  const connection = await mysql.createConnection(connectionSettings);
  const [rows] = await connection.execute(query);
  connection.end();
  return rows;
};

router.get("/handle_by_stat_type", async (req, res) => {
  const key = `handle_by_stat_type`;
  const cachedData = analyticsCache.get(key);
  if (cachedData) {
    res.json(cachedData);
  } else {
    try {
      const rows = await runQuery(generateHandleGroupByQuery("stat_type"));

      analyticsCache.set(key, rows);

      res.json(rows);
    } catch (error) {
      console.error("Error fetching data:", error);
      res.status(500).send("Server Error");
    }
  }
});

router.get("/handle_by_player_name", async (req, res) => {
  const key = `handle_by_player_name`;
  const cachedData = analyticsCache.get(key);
  if (cachedData) {
    res.json(cachedData);
  } else {
    try {
      const rows = await runQuery(generateHandleGroupByQuery("player_name"));

      analyticsCache.set(key, rows);

      res.json(rows);
    } catch (error) {
      console.error("Error fetching data:", error);
      res.status(500).send("Server Error");
    }
  }
});

router.get("/handle_by_team_abbr", async (req, res) => {
  const key = `handle_by_team_abbr`;
  const cachedData = analyticsCache.get(key);
  if (cachedData) {
    res.json(cachedData);
  } else {
    try {
      const rows = await runQuery(generateHandleGroupByQuery("team_abbr"));

      analyticsCache.set(key, rows);

      res.json(rows);
    } catch (error) {
      console.error("Error fetching data:", error);
      res.status(500).send("Server Error");
    }
  }
});

router.get("/total-handle", async (req, res) => {
  const groupBy = req.query.groupBy || "day"; // Default grouping by day
  const betType = req.query.betType; // Bet type ('single' or 'multi')
  const startDateTime = req.query.startDateTime;
  const endDateTime = req.query.endDateTime;

  const key = `total-handle_${groupBy}${
    betType ? `_${betType}` : ""
  }_${startDateTime}_${endDateTime}`;
  const cachedData = analyticsCache.get(key);

  if (cachedData) {
    res.json(cachedData);
  } else {
    try {
      let whereClause = betType ? `WHERE bet_type = '${betType}'` : "WHERE 1=1";
      if (startDateTime && endDateTime) {
        whereClause += ` AND accepted_datetime_utc BETWEEN '${decodeURIComponent(
          startDateTime
        )}' AND '${decodeURIComponent(endDateTime)}'`;
      }
      let query = "";

      if (groupBy === "hour") {
        query = `SELECT DATE_FORMAT(accepted_datetime_utc, '%Y-%m-%d %H:00:00') as bet_time, SUM(book_risk) as total_handle
                 FROM bet_transactions
                 ${whereClause}
                 GROUP BY bet_time
                 ORDER BY bet_time`;
      } else if (groupBy === "minute") {
        query = `SELECT DATE_FORMAT(accepted_datetime_utc, '%Y-%m-%d %H:%i:00') as bet_time, SUM(book_risk) as total_handle
                 FROM bet_transactions
                 ${whereClause}
                 GROUP BY bet_time
                 ORDER BY bet_time`;
      } else {
        // Default to group by day
        query = `SELECT DATE(accepted_datetime_utc) as bet_date, SUM(book_risk) as total_handle
                 FROM bet_transactions
                 ${whereClause}
                 GROUP BY bet_date
                 ORDER BY bet_date`;
      }

      const rows = await runQuery(query);
      analyticsCache.set(key, rows);

      res.json(rows);
    } catch (error) {
      console.error(error);
      res.status(500).send("Server Error");
    }
  }
});

module.exports = router;
