const express = require("express");
const fetch = require("node-fetch");

const router = express.Router();
const TMDB_KEY = process.env.TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

router.get("/", async (req, res) => {
  try {
    const query = req.query.query || "";
    const page = req.query.page || 1;

    if (!query) {
      return res.json({ results: [], page: 1, total_pages: 1 });
    }

    const url = `${BASE_URL}/search/multi?api_key=${TMDB_KEY}&language=ru-RU&query=${encodeURIComponent(
      query
    )}&page=${page}&include_adult=false`;

    const response = await fetch(url);
    const data = await response.json();

    res.json(data);
  } catch (err) {
    console.error("Ошибка /search:", err);
    res.status(500).json({ error: "Ошибка поиска" });
  }
});

module.exports = router;
