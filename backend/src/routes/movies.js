const express = require("express");
const fetch = require("node-fetch");

const router = express.Router();
const TMDB_KEY = process.env.TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

router.get("/popular", async (req, res) => {
  try {
    const page = req.query.page || 1;

    const url = `${BASE_URL}/movie/popular?api_key=${TMDB_KEY}&language=ru-RU&page=${page}`;
    const response = await fetch(url);
    const data = await response.json();

    res.json(data);
  } catch (err) {
    console.error("Ошибка /movies/popular:", err);
    res.status(500).json({ error: "Ошибка загрузки популярных фильмов" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const url = `${BASE_URL}/movie/${id}?api_key=${TMDB_KEY}&language=ru-RU`;
    const response = await fetch(url);
    const data = await response.json();

    res.json(data);
  } catch (err) {
    console.error("Ошибка /movies/:id:", err);
    res.status(500).json({ error: "Ошибка загрузки фильма" });
  }
});

module.exports = router;
