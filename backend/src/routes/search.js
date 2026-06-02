import express from "express";
import fetch from "node-fetch";

const router = express.Router();

// 🔍 Поиск фильмов, сериалов и персон
router.get("/", async (req, res) => {
  try {
    const query = req.query.query;

    if (!query || query.trim() === "") {
      return res.status(400).json({ error: "Query is required" });
    }

    const response = await fetch(
      `https://api.themoviedb.org/3/search/multi?query=${encodeURIComponent(
        query
      )}&language=ru-RU`,
      {
        headers: {
          Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
        },
      }
    );

    const data = await response.json();
    res.json(data);

  } catch (error) {
    console.error("Search error:", error);
    res.status(500).json({ error: "Search error" });
  }
});

export default router;
