"use client";

import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import Pagination from "./Pagination";

export default function MovieGrid() {
  const [movies, setMovies] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const loadMovies = () => {
    setLoading(true);

    fetch(`http://localhost:5000/api/movies/popular?page=${page}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("TMDB DATA:", data);

        if (data && Array.isArray(data.results)) {
          setMovies(data.results);
        } else {
          setMovies([]);
        }

        setLoading(false);
      })
      .catch((err) => {
        console.error("FETCH ERROR:", err);
        setMovies([]);
        setLoading(false);
      });
  };

  useEffect(() => {
    loadMovies();
  }, [page]);

  return (
    <div className="flex flex-col gap-6 overflow-x-hidden">
      {loading && (
        <div className="text-center opacity-70">Фильмы загружаются...</div>
      )}

      {!loading && movies.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5 p-4">
          {movies.map((movie) => {
            const image = movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : "/no-poster.jpg";

            return (
              <MovieCard
                key={movie.id}
                title={movie.title}
                rating={movie.vote_average}
                genre={movie.release_date?.slice(0, 4) || "—"}
                image={image}
              />
            );
          })}
        </div>
      )}

      {/* Пагинация как на Киного */}
      <Pagination
        currentPage={page}
        onPageChange={(newPage) => setPage(newPage)}
      />
    </div>
  );
}
