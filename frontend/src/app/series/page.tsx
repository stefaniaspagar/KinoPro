"use client";

import { useState } from "react";
import TVGrid from "@/components/TVGrid";

export default function SeriesPage({ searchParams }) {
  const page = Number(searchParams.page) || 1;

  const [showGenres, setShowGenres] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [showYears, setShowYears] = useState(false);
  const [showCountries, setShowCountries] = useState(false);

  // стиль прямоугольников (кнопки секций)
  const box =
    "w-full px-3 py-2 bg-[#0f0f0f] border border-white/20 rounded-md hover:border-[#ff6f8f] transition text-white";

  // стиль пунктов списка
  const item =
    "block w-full px-3 py-2 bg-[#151515] border border-white/10 rounded-md text-white hover:border-[#ff6f8f] transition";

  return (
    <main className="flex overflow-x-hidden">
      {/* 🔹 ЛЕВАЯ ПАНЕЛЬ — шире на 2 см (как в фильмах) */}
      <aside className="w-44 bg-[#0d0d0d]/90 backdrop-blur-sm border-r border-white/10 h-screen sticky top-0 overflow-y-auto">
        <div className="p-4">
          <h2 className="text-lg font-semibold text-white mb-4">Фильтры</h2>

          {/* 🔸 ЖАНРЫ */}
          <div className="mb-4">
            <button
              onClick={() => setShowGenres(!showGenres)}
              className={`${box} text-left text-sm font-semibold`}
            >
              Жанры {showGenres ? "▲" : "▼"}
            </button>

            {showGenres && (
              <ul className="space-y-2 mt-2 text-sm">
                <li><a href="#" className={item}>Драма</a></li>
                <li><a href="#" className={item}>Комедия</a></li>
                <li><a href="#" className={item}>Триллер</a></li>
                <li><a href="#" className={item}>Фэнтези</a></li>
                <li><a href="#" className={item}>Фантастика</a></li>
                <li><a href="#" className={item}>Криминал</a></li>
                <li><a href="#" className={item}>Приключения</a></li>
                <li><a href="#" className={item}>Аниме</a></li>
              </ul>
            )}
          </div>

          {/* 🔸 КАТЕГОРИИ */}
          <div className="mb-4">
            <button
              onClick={() => setShowCategories(!showCategories)}
              className={`${box} text-left text-sm font-semibold`}
            >
              Категории {showCategories ? "▲" : "▼"}
            </button>

            {showCategories && (
              <ul className="space-y-2 mt-2 text-sm">
                <li><a href="/series?page=1" className={item}>Все сериалы</a></li>
                <li><a href="/films" className={item}>Фильмы</a></li>
                <li><a href="#" className={item}>Аниме</a></li>
                <li><a href="#" className={item}>Мультсериалы</a></li>
              </ul>
            )}
          </div>

          {/* 🔸 ГОДЫ */}
          <div className="mb-4">
            <button
              onClick={() => setShowYears(!showYears)}
              className={`${box} text-left text-sm font-semibold`}
            >
              По году {showYears ? "▲" : "▼"}
            </button>

            {showYears && (
              <ul className="space-y-2 mt-2 text-sm">
                <li><a href="#" className={item}>2026</a></li>
                <li><a href="#" className={item}>2025</a></li>
                <li><a href="#" className={item}>2024</a></li>
                <li><a href="#" className={item}>2023</a></li>
              </ul>
            )}
          </div>

          {/* 🔸 СТРАНЫ */}
          <div className="mb-4">
            <button
              onClick={() => setShowCountries(!showCountries)}
              className={`${box} text-left text-sm font-semibold`}
            >
              По странам {showCountries ? "▲" : "▼"}
            </button>

            {showCountries && (
              <ul className="space-y-2 mt-2 text-sm">
                <li><a href="#" className={item}>Американские</a></li>
                <li><a href="#" className={item}>Корейские</a></li>
                <li><a href="#" className={item}>Турецкие</a></li>
                <li><a href="#" className={item}>Европейские</a></li>
              </ul>
            )}
          </div>

        </div>
      </aside>

      {/* 🔹 ПРАВАЯ ЧАСТЬ */}
      <div className="flex-1 px-6 py-8 overflow-x-hidden">
        <h1 className="text-3xl font-bold text-white mb-6">
          Сериалы — страница {page}
        </h1>

        <TVGrid page={page} />
      </div>
    </main>
  );
}
