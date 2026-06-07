export async function fetchPopularMovies(page: number = 1) {
  const res = await fetch(`http://localhost:5000/api/movies/popular?page=${page}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Ошибка загрузки фильмов");
  }

  return await res.json();
}
