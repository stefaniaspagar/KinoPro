const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

// 🔥 Загружаем переменные окружения
dotenv.config();

const moviesRoutes = require("./routes/movies");
const moviesFilterRoutes = require("./routes/moviesFilter");
const tvRoutes = require("./routes/tv");
const searchRoutes = require("./routes/search");

const app = express();
const PORT = process.env.PORT || 5000;

// 🔍 Проверка ключа TMDB
console.log("🔥 Backend запущен");
console.log("TMDB_API_KEY =", process.env.TMDB_API_KEY || "❌ Ключ не найден");

// 🧩 Middleware
app.use(cors());
app.use(express.json());

// 📦 Маршруты
app.use("/api/movies", moviesRoutes);
app.use("/api/movies", moviesFilterRoutes);
app.use("/api/tv", tvRoutes);
app.use("/api/search", searchRoutes);

// 🧠 Проверка работы сервера
app.get("/", (req, res) => {
  res.json({ message: "Backend is running" });
});

// 🚀 Запуск сервера
app.listen(PORT, () => {
  console.log(`🚀 Сервер работает: http://localhost:${PORT}`);
});
