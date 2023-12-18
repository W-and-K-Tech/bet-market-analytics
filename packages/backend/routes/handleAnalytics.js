const express = require("express");
const router = express.Router();
const mysql = require("mysql2/promise");
const path = require("path");
const NodeCache = require("node-cache");
require("dotenv").config();

const analyticsCache = new NodeCache();

// MySQL connection settings
const connectionSettings = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
};

const generateHandleGroupByQuery = (groupByFields, options = {}) => {
  const groupByString = [...groupByFields, ...["currency"]].join(", ");
  const { startDateTime, endDateTime } = options;

  let whereClause = "";
  if (startDateTime && endDateTime) {
    const decodedStartDateTime = decodeURIComponent(startDateTime);
    const decodedEndDateTime = decodeURIComponent(endDateTime);
    whereClause = `WHERE accepted_datetime_utc BETWEEN '${decodedStartDateTime}' AND '${decodedEndDateTime}' `;
  }

  return `
    SELECT ${groupByString}, SUM(book_risk) as total_handle
    FROM bet_transactions
    ${whereClause}
    GROUP BY ${groupByString}
    ORDER BY total_handle DESC
  `;
};

const runQuery = async (query) => {
  const connection = await mysql.createConnection(connectionSettings);
  const [rows] = await connection.execute(query);
  connection.end();
  return rows;
};

router.get("/handle_by_stat_type", async (req, res) => {
  const startDateTime = req.query.startDateTime;
  const endDateTime = req.query.endDateTime;
  const key = `handle_by_stat_type_${startDateTime}_${endDateTime}`;
  const cachedData = analyticsCache.get(key);
  if (cachedData) {
    res.json(cachedData);
  } else {
    try {
      const rows = await runQuery(generateHandleGroupByQuery(["stat_type"]), {
        startDateTime,
        endDateTime,
      });

      analyticsCache.set(key, rows);

      res.json(rows);
    } catch (error) {
      console.error("Error fetching data:", error);
      res.status(500).send("Server Error");
    }
  }
});

router.get("/handle_by_player_name", async (req, res) => {
  const startDateTime = req.query.startDateTime;
  const endDateTime = req.query.endDateTime;
  const key = `handle_by_player_name_${startDateTime}_${endDateTime}`;
  const cachedData = analyticsCache.get(key);
  if (cachedData) {
    res.json(cachedData);
  } else {
    try {
      const rows = await runQuery(
        generateHandleGroupByQuery(["player_name", "team_abbr"], {
          startDateTime,
          endDateTime,
        })
      );

      analyticsCache.set(key, rows);

      res.json(rows);
    } catch (error) {
      console.error("Error fetching data:", error);
      res.status(500).send("Server Error");
    }
  }
});

router.get("/handle_by_team_abbr", async (req, res) => {
  const startDateTime = req.query.startDateTime;
  const endDateTime = req.query.endDateTime;
  const key = `handle_by_team_abbr_${startDateTime}_${endDateTime}`;
  const cachedData = analyticsCache.get(key);
  if (cachedData) {
    res.json(cachedData);
  } else {
    try {
      const rows = await runQuery(generateHandleGroupByQuery(["team_abbr"]), {
        startDateTime,
        endDateTime,
      });

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
        query = `SELECT DATE_FORMAT(accepted_datetime_utc, '%Y-%m-%d %H:00:00') as bet_time, SUM(book_risk) as total_handle, currency
                 FROM bet_transactions
                 ${whereClause}
                 GROUP BY bet_time, currency
                 ORDER BY bet_time, currency`;
      } else if (groupBy === "minute") {
        query = `SELECT DATE_FORMAT(accepted_datetime_utc, '%Y-%m-%d %H:%i:00') as bet_time, SUM(book_risk) as total_handle, currency
                 FROM bet_transactions
                 ${whereClause}
                 GROUP BY bet_time, currency
                 ORDER BY bet_time, currency`;
      } else {
        // Default to group by day
        query = `SELECT DATE(accepted_datetime_utc) as bet_date, SUM(book_risk) as total_handle, currency
                 FROM bet_transactions
                 ${whereClause}
                 GROUP BY bet_date, currency
                 ORDER BY bet_date, currency`;
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
