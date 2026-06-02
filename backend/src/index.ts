import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import dns from "dns";

// 🔥 Гарантированная загрузка .env из backend/.env
dotenv.config({
  path: path.resolve(__dirname, "../.env"),
});

// 🔍 Проверка, загрузился ли TMDB_TOKEN
console.log("TMDB_TOKEN loaded:", !!process.env.TMDB_TOKEN);

// 🔥 DNS тест — проверяем, видит ли Node.js домен TMDB
dns.lookup("api.themoviedb.org", (err, address, family) => {
  console.log("DNS TEST:", { err, address, family });
});

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Маршруты
import moviesRouter from "./routes/movies.js";
import tvRouter from "./routes/tv.js";
import searchRouter from "./routes/search.js";

app.use("/api/movies", moviesRouter);
app.use("/api/tv", tvRouter);
app.use("/api/search", searchRouter);

// Проверка сервера
app.get("/", (req, res) => {
  res.json({ message: "Backend is running" });
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
