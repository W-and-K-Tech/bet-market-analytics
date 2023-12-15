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

router.get("/handle-by-stat-type", async (req, res) => {
  const key = `handle-by-stat-type`;
  const cachedData = analyticsCache.get(key);
  if (cachedData) {
    res.json(cachedData);
  } else {
    try {
      const connection = await mysql.createConnection(connectionSettings);
      const query = `
      SELECT stat_type, SUM(book_risk) as total_handle
      FROM bet_transactions
      GROUP BY stat_type
      ORDER BY total_handle DESC
    `;

      const [rows] = await connection.execute(query);
      await connection.end();

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

  const key = `total-handle_${groupBy}${betType ? `_${betType}` : ""}`;
  const cachedData = analyticsCache.get(key);

  if (cachedData) {
    res.json(cachedData);
  } else {
    try {
      const conn = await mysql.createConnection(connectionSettings);
      let query = "";

      if (groupBy === "hour") {
        query = `SELECT DATE_FORMAT(accepted_datetime_utc, '%Y-%m-%d %H:00:00') as bet_time, SUM(book_risk) as total_handle
                 FROM bet_transactions
                 ${betType ? `WHERE bet_type = '${betType}'` : ""}
                 GROUP BY bet_time
                 ORDER BY bet_time`;
      } else {
        // Default to group by day
        query = `SELECT DATE(accepted_datetime_utc) as bet_date, SUM(book_risk) as total_handle
                 FROM bet_transactions
                 ${betType ? `WHERE bet_type = '${betType}'` : ""}
                 GROUP BY bet_date
                 ORDER BY bet_date`;
      }

      const [rows] = await conn.execute(query);
      await conn.end();

      analyticsCache.set(key, rows);

      res.json(rows);
    } catch (error) {
      console.error(error);
      res.status(500).send("Server Error");
    }
  }
});

module.exports = router;
