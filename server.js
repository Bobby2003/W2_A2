const express = require("express");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "public")));

const eventsRoutes = require("./routes/events");
const categoriesRoutes = require("./routes/categories");
const searchRoutes = require("./routes/search");

app.use("/api/events", eventsRoutes);
app.use("/api/categories", categoriesRoutes);
app.use("/api/search", searchRoutes);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/html/index.html"));
});

app.listen(PORT, () => {
  console.log(`✅ Server is running at http://localhost:${PORT}`);
});
