import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "KinoPro - Смотрите фильмы онлайн",
  description: "Лучший сервис для просмотра фильмов и сериалов",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className="bg-slate-950 text-white">
        {/* Прозрачная шапка поверх контента */}
        <Header />

        {/* Контент начинается чуть ниже шапки */}
        <main className="pt-[70px]">
          {children}
        </main>
      </body>
    </html>
  );
}
