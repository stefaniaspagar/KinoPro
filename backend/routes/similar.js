const express = require("express");
const fetch = require("node-fetch");

const router = express.Router();

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${process.env.TMDB_TOKEN}&language=ru-RU`
    );

    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Ошибка получения похожих фильмов" });
  }
});

module.exports = router;
