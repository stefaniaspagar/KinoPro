import Image from "next/image";

export default async function SeriesPage({ params }) {
  const { id } = params;

  const res = await fetch(`http://localhost:5000/api/tv/${id}`);
  const tv = await res.json();

  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-bold mb-4">{tv.name}</h1>

      <div className="flex gap-6">
        <Image
          src={`https://image.tmdb.org/t/p/w500${tv.poster_path}`}
          alt={tv.name}
          width={300}
          height={450}
          className="rounded"
        />

        <div>
          <p className="opacity-80 mb-4">{tv.overview}</p>
          <p>Рейтинг: {tv.vote_average}</p>
          <p>Дата выхода: {tv.first_air_date}</p>
        </div>
      </div>
    </div>
  );
}
