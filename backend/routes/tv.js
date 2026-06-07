const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");

const TMDB_API_KEY = process.env.TMDB_API_KEY;

// Универсальная функция запроса с выводом ошибки TMDB
async function tmdb(url) {
  const res = await fetch(url);
  const data = await res.json();

  if (!res.ok) {
    console.log("TMDB ERROR RESPONSE:", data);
    throw new Error(data.status_message || "TMDB error");
  }

  return data;
}

// 🔥 Фильтрация сериалов
router.get("/filter", async (req, res) => {
  try {
    const { page = 1, genre, year, country } = req.query;

    const params = new URLSearchParams({
      api_key: TMDB_API_KEY,
      language: "ru-RU",
      page,
      include_adult: "false",
    });

    if (genre) params.append("with_genres", genre);
    if (year) params.append("first_air_date_year", year);
    if (country) params.append("with_origin_country", country);

    const url = `https://api.themoviedb.org/3/discover/tv?${params.toString()}`;
    const data = await tmdb(url);

    res.json({
      page: data.page,
      total_pages: data.total_pages,
      results: data.results,
    });
  } catch (err) {
    console.log("TV FILTER ERROR:", err.message);
    res.status(500).json({ error: "TV filter failed" });
  }
});

// 🔥 Популярные сериалы
router.get("/popular", async (req, res) => {
  try {
    const { page = 1 } = req.query;

    const url = `https://api.themoviedb.org/3/tv/popular?api_key=${TMDB_API_KEY}&language=ru-RU&page=${page}`;
    const data = await tmdb(url);

    res.json({
      page: data.page,
      total_pages: data.total_pages,
      results: data.results,
    });
  } catch (err) {
    console.log("POPULAR TV ERROR:", err.message);
    res.status(500).json({ error: "Popular TV failed" });
  }
});

// 🔥 Детали сериала
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Проверка ID
    if (!id || isNaN(id)) {
      return res.status(400).json({ error: "Invalid TV ID" });
    }

    const url = `https://api.themoviedb.org/3/tv/${id}?api_key=${TMDB_API_KEY}&language=ru-RU`;
    const data = await tmdb(url);

    res.json(data);
  } catch (err) {
    console.log("TV DETAILS ERROR:", err.message);
    res.status(500).json({ error: "TV details failed" });
  }
});

// 🔥🔥🔥 ДОБАВЛЕННЫЙ РОУТ — АКТЁРЫ СЕРИАЛА 🔥🔥🔥
router.get("/:id/credits", async (req, res) => {
  try {
    const { id } = req.params;

    const url = `https://api.themoviedb.org/3/tv/${id}/credits?api_key=${TMDB_API_KEY}&language=ru-RU`;
    const data = await tmdb(url);

    res.json(data);
  } catch (err) {
    console.log("TV CREDITS ERROR:", err.message);
    res.status(500).json({ cast: [] });
  }
});

module.exports = router;
