"use client";

import Link from "next/link";
import Image from "next/image";

type TVCardProps = {
  id: number;
  name: string;
  poster_path: string | null;
  first_air_date?: string;
};

export default function TVCard({ id, name, poster_path, first_air_date }: TVCardProps) {
  const posterUrl = poster_path
    ? `https://image.tmdb.org/t/p/w500${poster_path}`
    : "/no-poster.png";

  return (
    <Link href={`/series/${id}`}>
      <div className="bg-zinc-900 rounded-lg overflow-hidden shadow-md hover:scale-105 transition-transform cursor-pointer">
        <Image
          src={posterUrl}
          alt={name}
          width={500}
          height={750}
          className="w-full h-auto object-cover"
          priority={false}
        />

        <div className="p-3">
          <h3 className="text-white text-sm font-semibold truncate">
            {name}
          </h3>

          {first_air_date && (
            <p className="text-gray-400 text-xs mt-1">
              {first_air_date.slice(0, 4)}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
