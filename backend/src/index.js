import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import dns from "dns";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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

// ---------------------------------------------------------
// 🔥 ВРЕМЕННАЯ БАЗА ПОЛЬЗОВАТЕЛЕЙ (пока без БД)
// ---------------------------------------------------------
let users = [];

// ---------------------------------------------------------
// 🔥 РЕГИСТРАЦИЯ
// ---------------------------------------------------------
app.post("/api/auth/register", async (req, res) => {
  const { email, password } = req.body;

  const exists = users.find((u) => u.email === email);
  if (exists) {
    return res.status(400).json({ message: "Email уже используется" });
  }

  const hash = await bcrypt.hash(password, 10);

  const newUser = {
    id: Date.now(),
    email,
    password: hash,
  };

  users.push(newUser);

  res.json({ message: "Регистрация успешна" });
});

// ---------------------------------------------------------
// 🔥 ВХОД
// ---------------------------------------------------------
app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;

  const user = users.find((u) => u.email === email);
  if (!user) {
    return res.status(400).json({ message: "Неверный email или пароль" });
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    return res.status(400).json({ message: "Неверный email или пароль" });
  }

  const token = jwt.sign(
    { id: user.id, email: user.email },
    "SECRET_KEY",
    { expiresIn: "7d" }
  );

  res.json({ token });
});

// ---------------------------------------------------------
// 🔥 ПРОКСИ ДЛЯ COLLAPS (ОБХОД БЛОКИРОВОК)
// ---------------------------------------------------------
app.get("/api/proxy/collaps", async (req, res) => {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: "Missing TMDB ID" });
  }

  const url = `https://collaps.org/embed/movie/${id}`;

  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0",
        "Accept": "*/*",
      },
    });

    const html = await response.text();

    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.send(html);
  } catch (err) {
    res.status(500).json({
      error: "Proxy error",
      details: err.message,
    });
  }
});

// ---------------------------------------------------------
// 🔥 ТВОИ МАРШРУТЫ
// ---------------------------------------------------------
import moviesRouter from "./routes/movies.js";
import tvRouter from "./routes/tv.js";
import searchRouter from "./routes/search.js";
import similarRouter from "./routes/similar.js";
import similarTvRouter from "./routes/similarTv.js";

// 🔥 Подключение маршрутов
app.use("/api/movies", moviesRouter);
app.use("/api/tv", tvRouter);
app.use("/api/search", searchRouter);
app.use("/api/similar", similarRouter);
app.use("/api/similar-tv", similarTvRouter);

// ---------------------------------------------------------

// Проверка сервера
app.get("/", (req, res) => {
  res.json({ message: "Backend is running" });
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
