'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import MovieSection from '@/components/MovieSection';
import Features from '@/components/Features';
import Footer from '@/components/Footer';
import { fetchPopularMovies } from '@/lib/tmdbApi';

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  genre_ids: number[];
}

export default function Home() {
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [newReleases, setNewReleases] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        setLoading(true);
        const popular = await fetchPopularMovies(1);
        setPopularMovies(popular.results?.slice(0, 4) || []);
        
        const releases = await fetchPopularMovies(2);
        setNewReleases(releases.results?.slice(0, 4) || []);
        
        setError(null);
      } catch (err) {
        console.error('Error loading movies:', err);
        setError('Не удалось загрузить фильмы. Проверьте TMDB_API_KEY в backend/.env');

        setPopularMovies([
          {
            id: 1,
            title: 'Интерстеллар',
            vote_average: 8.6,
            genre_ids: [878],
            poster_path: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400&h=600&fit=crop',
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, []);

  const formatMovies = (movies: Movie[]) => {
    return movies.map((movie) => ({
      id: movie.id.toString(),
      title: movie.title,
      rating: movie.vote_average,
      genre: 'Фильм',
      image: `https://image.tmdb.org/t/p/w400${movie.poster_path}`,
    }));
  };

  if (error) {
    console.error('Movie loading error:', error);
  }

  return (
    <main>
      <Header />

      {/* 🔥 Подтягиваем баннер вверх ТОЛЬКО на главной */}
      <div className="-mt-10">
        <Hero />
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <p>Загрузка фильмов...</p>
        </div>
      ) : (
        <>
          <MovieSection title="Популярные фильмы" movies={formatMovies(popularMovies)} />
          <MovieSection title="Новые релизы" movies={formatMovies(newReleases)} />
        </>
      )}

      {error && (
        <div style={{ textAlign: 'center', padding: '20px', color: 'red' }}>
          <p>{error}</p>
        </div>
      )}

      <Features />
      <Footer />
    </main>
  );
}
