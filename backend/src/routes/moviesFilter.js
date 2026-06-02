const express = require("express");
const fetch = require("node-fetch");

const router = express.Router();
const TMDB_KEY = process.env.TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

const GENRES = {
  "Боевик": 28,
  "Комедия": 35,
  "Драма": 18,
  "Ужасы": 27,
  "Фантастика": 878,
  "Фэнтези": 14,
  "Триллер": 53,
  "Криминал": 80,
  "Мелодрама": 10749,
  "Приключения": 12,
  "Анимация": 16,
  "Аниме": 16,
  "Семейный": 10751,
  "Исторический": 36,
  "Документальный": 99,
  "Военный": 10752
};

const CATEGORY_MAP = {
  "Фильмы": "movie",
  "Сериалы": "tv"
};

router.get("/filter", async (req, res) => {
  try {
    const page = req.query.page || 1;
    const genre = req.query.genre || "";
    const category = req.query.category || "";
    const year = req.query.year || "";

    const type = CATEGORY_MAP[category] || "movie";

    const params = new URLSearchParams({
      api_key: TMDB_KEY,
      language: "ru-RU",
      page: String(page),
      sort_by: "popularity.desc"
    });

    if (genre && GENRES[genre]) {
      params.append("with_genres", String(GENRES[genre]));
    }

    if (year) {
      if (type === "movie") {
        params.append("primary_release_year", String(year));
      } else {
        params.append("first_air_date_year", String(year));
      }
    }

    const url = `${BASE_URL}/discover/${type}?${params.toString()}`;
    console.log("TMDB URL:", url);

    const response = await fetch(url);
    const data = await response.json();

    res.json({
      results: data.results || [],
      page: data.page || 1,
      total_pages: data.total_pages || 1
    });
  } catch (err) {
    console.error("Ошибка /movies/filter:", err);
    res.status(500).json({ error: "Ошибка фильтрации" });
  }
});

module.exports = router;
