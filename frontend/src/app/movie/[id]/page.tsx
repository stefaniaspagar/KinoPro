"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function MoviePage({ params }) {
  const { id } = params;
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useAuth();

  const [movie, setMovie] = useState(null);
  const [actors, setActors] = useState([]);
  const [similar, setSimilar] = useState([]);
  const [isFav, setIsFav] = useState(false);

  const [activePlayer, setActivePlayer] = useState("collaps");

  const pageFrom = searchParams.get("page");
  const fromFavorites = searchParams.get("from") === "favorites";

  const goBack = () => {
    if (fromFavorites) {
      router.push("/favorites");
      return;
    }

    if (pageFrom) {
      router.push(`/films?page=${pageFrom}`);
      return;
    }

    window.history.back();
  };

  useEffect(() => {
    const load = async () => {
      const resMovie = await fetch(`http://localhost:5000/api/movies/${id}`);
      const movieData = await resMovie.json();
      setMovie(movieData);

      const resCredits = await fetch(
        `http://localhost:5000/api/movies/${id}/credits`
      );
      const creditsData = await resCredits.json();
      setActors(creditsData.cast || []);

      const resSimilar = await fetch(
        `http://localhost:5000/api/movies/${id}/similar`
      );
      const similarData = await resSimilar.json();
      setSimilar(similarData.results || []);
    };

    load();
  }, [id]);

  useEffect(() => {
    const checkFav = async () => {
      if (!user) return;

      const res = await fetch("http://localhost:5000/api/user/favorites", {
        credentials: "include",
      });

      const data = await res.json();
      if (Array.isArray(data)) {
        setIsFav(data.includes(Number(id)));
      }
    };

    checkFav();
  }, [user, id]);

  const toggleFavorite = async () => {
    if (!user) return alert("Войдите в аккаунт");

    const method = isFav ? "DELETE" : "POST";

    await fetch("http://localhost:5000/api/user/favorites", {
      method,
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ movieId: Number(id) }),
    });

    setIsFav(!isFav);
  };

  if (!movie) return <div className="text-white p-6">Загрузка...</div>;

  const poster = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "/no-poster.jpg";

  // Плееры
  const players = {
    collaps: `https://api.collaps.cc/player?tmdb=${movie.id}`,
    hdvb: `https://hdvb.video/iframe/${movie.id}`,
  };

  return (
    <div className="p-4 text-white max-w-5xl mx-auto">

      {/* Кнопка назад */}
      <button
        onClick={goBack}
        className="mb-4 px-4 py-2 bg-white/10 hover:bg-white/20 transition rounded-lg text-sm"
      >
        ← Назад
      </button>

      {/* Заголовок + избранное */}
      <div className="flex items-center gap-3 mb-4">
        <h1 className="text-2xl font-bold">{movie.title}</h1>

        <button
          onClick={toggleFavorite}
          className={`px-3 py-1 rounded-lg text-xs transition 
            ${isFav ? "bg-pink-600 hover:bg-pink-700" : "bg-white/10 hover:bg-white/20"}`}
        >
          {isFav ? "💖 В избранном" : "⭐ В избранное"}
        </button>
      </div>

      {/* Постер + Информация */}
      <div className="flex flex-col md:flex-row gap-6">
        <Image
          src={poster}
          alt={movie.title}
          width={200}
          height={300}
          className="rounded-lg shadow-lg"
        />

        <div className="flex flex-col gap-2 text-sm max-w-md">
          <p><span className="opacity-70">Год:</span> {movie.release_date?.slice(0, 4)}</p>
          <p><span className="opacity-70">Страна:</span> {movie.production_countries?.[0]?.name || "—"}</p>
          <p><span className="opacity-70">Жанры:</span> {movie.genres?.map((g) => g.name).join(" / ")}</p>
          <p>
            <span className="opacity-70">Длительность:</span>
            {movie.runtime
              ? ` ${Math.floor(movie.runtime / 60)} ч ${movie.runtime % 60} мин`
              : " —"}
          </p>

          <div className="mt-3">
            <h2 className="text-lg font-semibold mb-1">Описание</h2>
            <p className="opacity-80 leading-relaxed text-sm">{movie.overview}</p>
          </div>
        </div>
      </div>

      {/* Актёры */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-3">Актёры</h2>

        <div className="flex gap-3 overflow-x-auto pb-3">
          {actors.slice(0, 20).map((actor) => (
            <div key={actor.id} className="flex-shrink-0 w-[70px] text-center">
              <Image
                src={
                  actor.profile_path
                    ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                    : "/no-poster.jpg"
                }
                alt={actor.name}
                width={70}
                height={100}
                className="rounded-lg object-cover w-[70px] h-[100px]"
              />
              <p className="mt-1 text-[10px] font-semibold truncate">{actor.name}</p>
              <p className="text-[9px] opacity-60 truncate">{actor.character}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Плееры */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-3">Смотреть онлайн</h2>

        {/* Кнопки переключения */}
        <div className="flex gap-3 mb-4">
          <button
            onClick={() => setActivePlayer("collaps")}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
              activePlayer === "collaps"
                ? "bg-pink-600 text-white"
                : "bg-white/10 text-gray-300 hover:bg-white/20"
            }`}
          >
            Смотреть онлайн
          </button>

          <button
            onClick={() => setActivePlayer("hdvb")}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
              activePlayer === "hdvb"
                ? "bg-pink-600 text-white"
                : "bg-white/10 text-gray-300 hover:bg-white/20"
            }`}
          >
            Плеер 1
          </button>
        </div>

        {/* Плеер */}
        <div className="w-full aspect-video bg-black rounded-xl overflow-hidden">
          <iframe
            src={players[activePlayer]}
            allowFullScreen
            className="w-full h-full border-0"
          ></iframe>
        </div>
      </div>

      {/* Похожие */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-3">Похожие фильмы</h2>

        <div className="flex gap-4 overflow-x-auto pb-3">
          {similar.slice(0, 12).map((film) => (
            <a
              key={film.id}
              href={`/movie/${film.id}`}
              className="flex-shrink-0 w-[110px]"
            >
              <Image
                src={
                  film.poster_path
                    ? `https://image.tmdb.org/t/p/w300${film.poster_path}`
                    : "/no-poster.jpg"
                }
                alt={film.title}
                width={110}
                height={160}
                className="rounded-lg object-cover w-[110px] h-[160px]"
              />
              <p className="mt-2 text-xs font-semibold truncate">{film.title}</p>
              <p className="text-[10px] opacity-60">{film.release_date?.slice(0, 4)}</p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
