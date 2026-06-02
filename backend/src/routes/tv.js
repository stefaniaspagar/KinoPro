import express from "express";
import fetch from "node-fetch";

const router = express.Router();

router.get("/popular", async (req, res) => {
  const page = req.query.page || 1;

  const response = await fetch(
    `https://api.themoviedb.org/3/tv/popular?language=ru-RU&page=${page}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
      },
    }
  );

  const data = await response.json();
  res.json(data);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;

  const response = await fetch(
    `https://api.themoviedb.org/3/tv/${id}?language=ru-RU`,
    {
      headers: {
        Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
      },
    }
  );

  const data = await response.json();
  res.json(data);
});

export default router;
