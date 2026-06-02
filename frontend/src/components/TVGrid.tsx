"use client";

import { useEffect, useState } from "react";
import TVCard from "./TVCard";
import Pagination from "./Pagination";

export default function TVGrid() {
  const [tvShows, setTvShows] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const loadTV = () => {
    setLoading(true);

    fetch(`http://localhost:5000/api/tv/popular?page=${page}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("TMDB TV DATA:", data);

        if (data && Array.isArray(data.results)) {
          setTvShows(data.results);
        } else {
          setTvShows([]);
        }

        setLoading(false);
      })
      .catch((err) => {
        console.error("FETCH ERROR:", err);
        setTvShows([]);
        setLoading(false);
      });
  };

  useEffect(() => {
    loadTV();
  }, [page]);

  return (
    <div className="flex flex-col gap-6 overflow-x-hidden">
      {loading && (
        <div className="text-center opacity-70">Сериалы загружаются...</div>
      )}

      {!loading && tvShows.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5 p-4">
          {tvShows.map((tv) => (
            <TVCard
              key={tv.id}
              id={tv.id}
              name={tv.name}
              poster_path={tv.poster_path}
              first_air_date={tv.first_air_date}
            />
          ))}
        </div>
      )}

      <Pagination
        currentPage={page}
        onPageChange={(newPage) => setPage(newPage)}
      />
    </div>
  );
}
