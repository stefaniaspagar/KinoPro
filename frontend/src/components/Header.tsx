"use client";

import { useState } from "react";
import Link from "next/link";
import SearchBar from "@/components/SearchBar";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full bg-black/50 backdrop-blur-lg border-b border-slate-800 z-[1000]">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        {/* 🔥 ЛОГОТИП — твой градиент */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-r from-red-600 to-pink-600 rounded-lg flex items-center justify-center font-bold text-lg text-white">
            K
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
            KinoPro
          </span>
        </Link>

        {/* 🧭 ДЕСКТОП МЕНЮ */}
        <nav className="hidden lg:flex items-center gap-8 text-white text-lg ml-20">
          <Link href="/" className="hover:text-[#ff6f8f] transition">Главная</Link>
          <Link href="/films" className="hover:text-[#ff6f8f] transition">Фильмы</Link>
          <Link href="/series" className="hover:text-[#ff6f8f] transition">Сериалы</Link>
          <Link href="/favorites" className="hover:text-[#ff6f8f] transition">Избранное</Link>
        </nav>

        {/* 🔍 ПОИСК */}
        <div className="hidden lg:block w-72 relative z-[9999]">
          <SearchBar />
        </div>

        {/* 📱 МОБИЛЬНОЕ МЕНЮ КНОПКА */}
        <button
          className="lg:hidden text-white text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      {/* 📱 МОБИЛЬНОЕ МЕНЮ */}
      {menuOpen && (
        <div className="lg:hidden bg-black/80 backdrop-blur-md border-t border-slate-800 px-6 py-4 flex flex-col gap-4">
          <SearchBar />

          <Link href="/" className="text-white text-lg hover:text-[#ff6f8f] transition">
            Главная
          </Link>
          <Link href="/films" className="text-white text-lg hover:text-[#ff6f8f] transition">
            Фильмы</Link>
          <Link href="/series" className="text-white text-lg hover:text-[#ff6f8f] transition">
            Сериалы</Link>
          <Link href="/favorites" className="text-white text-lg hover:text-[#ff6f8f] transition">
            Избранное</Link>
        </div>
      )}
    </header>
  );
}
