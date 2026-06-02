// Модель фильма (если понадобится в будущем)

class Movie {
  constructor(data) {
    this.id = data.id;
    this.title = data.title;
    this.overview = data.overview;
    this.poster_path = data.poster_path;
    this.release_date = data.release_date;
    this.vote_average = data.vote_average;
  }
}

module.exports = Movie;

