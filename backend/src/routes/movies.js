import express from "express";
import fetch from "node-fetch";

const router = express.Router();

// 🔥 Популярные фильмы
router.get("/popular", async (req, res) => {
  try {
    const page = req.query.page || 1;

    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?language=ru-RU&page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
        },
      }
    );

    const data = await response.json();
    res.json(data);

  } catch (error) {
    res.status(500).json({ error: "Movies Popular Error" });
  }
});

// 🔥 Детали фильма
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?language=ru-RU`,
      {
        headers: {
          Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
        },
      }
    );

    const data = await response.json();
    res.json(data);

  } catch (error) {
    res.status(500).json({ error: "Movie Details Error" });
  }
});

export default router;
