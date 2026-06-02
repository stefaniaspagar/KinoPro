const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const moviesRoutes = require("./routes/movies");
const moviesFilterRoutes = require("./routes/moviesFilter");
const tvRoutes = require("./routes/tv");
const searchRoutes = require("./routes/search");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

console.log("🔥 Backend запущен");
console.log("TMDB_API_KEY =", process.env.TMDB_API_KEY);

app.use(cors());
app.use(express.json());

app.use("/api/movies", moviesRoutes);
app.use("/api/movies", moviesFilterRoutes);
app.use("/api/tv", tvRoutes);
app.use("/api/search", searchRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Сервер работает: http://localhost:${PORT}`);
});
