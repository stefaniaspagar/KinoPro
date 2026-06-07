"use client";

import Link from "next/link";

export default function MovieCard({
  id,
  title,
  rating,
  genre,
  image,
  type,
  page, // ← добавили
}: {
  id: number;
  title: string;
  rating: number;
  genre: string;
  image: string;
  type: "movie" | "tv";
  page?: number; // ← добавили
}) {
  // Добавляем page в ссылку
  const href =
    type === "tv"
      ? `/tv/${id}?page=${page ?? 1}`
      : `/movie/${id}?page=${page ?? 1}`;

  return (
    <Link href={href}>
      <div className="bg-zinc-900 rounded-lg overflow-hidden shadow-md hover:scale-105 transition-transform cursor-pointer max-w-[150px]">
        <img
          src={image}
          alt={title}
          className="w-full h-[225px] object-cover"
          loading="lazy"
        />

        <div className="p-2">
          <h3 className="text-white text-xs font-semibold truncate">{title}</h3>

          <div className="flex justify-between items-center mt-1">
            <p className="text-gray-400 text-[10px]">{genre}</p>
            <span className="text-yellow-400 text-[10px] font-semibold">
              ⭐ {rating?.toFixed(1)}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
