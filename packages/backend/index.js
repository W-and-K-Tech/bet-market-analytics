const express = require("express");
const router = express.Router();
const cors = require("cors");
const analyticsRoutes = require("./routes/handleAnalytics");
const app = express();

require("dotenv").config();

// Enable CORS for all domains
router.use(cors());

app.use("/api/analytics", analyticsRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
