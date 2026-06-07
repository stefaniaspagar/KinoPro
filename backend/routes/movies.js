const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");

const TMDB_API_KEY = process.env.TMDB_API_KEY;

// Универсальная функция запроса к TMDB
async function tmdb(url) {
  const res = await fetch(url);

  if (!res.ok) {
    const text = await res.text();
    console.log("TMDB ERROR STATUS:", res.status);
    console.log("TMDB ERROR BODY:", text);
    throw new Error("TMDB error");
  }

  return res.json();
}

// 🔥 Фильтрация фильмов
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
    if (year) params.append("primary_release_year", year);
    if (country) params.append("with_origin_country", country);

    const url = `https://api.themoviedb.org/3/discover/movie?${params.toString()}`;

    const data = await tmdb(url);

    res.json({
      page: data.page,
      total_pages: data.total_pages,
      results: data.results,
    });
  } catch (err) {
    console.log("MOVIES FILTER ERROR:", err);
    res.status(500).json({ error: "Movies filter failed" });
  }
});

// 🔥 Популярные фильмы
router.get("/popular", async (req, res) => {
  try {
    const { page = 1 } = req.query;

    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API_KEY}&language=ru-RU&page=${page}`;

    const data = await tmdb(url);

    res.json({
      page: data.page,
      total_pages: data.total_pages,
      results: data.results,
    });
  } catch (err) {
    console.log("POPULAR MOVIES ERROR:", err);
    res.status(500).json({ error: "Popular movies failed" });
  }
});

// 🔥 Детальная страница фильма
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${TMDB_API_KEY}&language=ru-RU`;

    const data = await tmdb(url);

    res.json(data);
  } catch (err) {
    console.log("MOVIE DETAILS ERROR:", err);
    res.status(500).json({ error: "Movie details failed" });
  }
});

// 🔥 Актёры фильма
router.get("/:id/credits", async (req, res) => {
  try {
    const { id } = req.params;

    const url = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${TMDB_API_KEY}&language=ru-RU`;

    const data = await tmdb(url);

    res.json(data);
  } catch (err) {
    console.log("MOVIE CREDITS ERROR:", err);
    res.status(500).json({ cast: [] });
  }
});

// 🔥 Похожие фильмы
router.get("/:id/similar", async (req, res) => {
  try {
    const { id } = req.params;

    const url = `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${TMDB_API_KEY}&language=ru-RU`;

    const data = await tmdb(url);

    res.json({
      results: data.results || [],
    });
  } catch (err) {
    console.log("MOVIE SIMILAR ERROR:", err);
    res.status(500).json({ results: [] });
  }
});

module.exports = router;
