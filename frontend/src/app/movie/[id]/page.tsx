import Image from "next/image";

export default async function MoviePage({ params }) {
  const { id } = params;

  const res = await fetch(`http://localhost:5000/api/movies/${id}`);
  const movie = await res.json();

  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-bold mb-4">{movie.title}</h1>

      <div className="flex gap-6">
        <Image
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          width={300}
          height={450}
          className="rounded"
        />

        <div>
          <p className="opacity-80 mb-4">{movie.overview}</p>
          <p>Рейтинг: {movie.vote_average}</p>
          <p>Дата выхода: {movie.release_date}</p>
        </div>
      </div>
    </div>
  );
}
