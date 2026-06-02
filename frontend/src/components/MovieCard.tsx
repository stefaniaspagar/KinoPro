"use client";

import Link from "next/link";
import Image from "next/image";

type MovieCardProps = {
  id: number;
  title: string;
  rating: number;
  genre: string;
  image: string;
};

export default function MovieCard({ id, title, rating, genre, image }: MovieCardProps) {
  return (
    <Link href={`/movie/${id}`}>
      <div className="bg-zinc-900 rounded-lg overflow-hidden shadow-md hover:scale-105 transition-transform cursor-pointer">
        <Image
          src={image}
          alt={title}
          width={500}
          height={750}
          className="w-full h-auto object-cover"
          priority={false}
        />

        <div className="p-3">
          <h3 className="text-white text-sm font-semibold truncate">
            {title}
          </h3>

          <div className="flex justify-between items-center mt-1">
            <p className="text-gray-400 text-xs">{genre}</p>

            <span className="text-yellow-400 text-xs font-semibold">
              ⭐ {rating.toFixed(1)}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
