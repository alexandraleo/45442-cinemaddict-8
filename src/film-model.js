export default class FilmModel {
  constructor(data) {
    this.id = data[`id`];
    this.filmTitle = data.film_info[`title`];
    this.originalTitle = data.film_info[`alternative_title`];
    this.director = data.film_info[`director`];
    this.writers = data.film_info[`actors`];
    this.actors = data.film_info[`actors`];
    this.releaseDate = data.film_info.release[`date`];
    this.country = data.film_info.release[`release_country`];
    this.poster = data.film_info[`poster`];
    this.rating = data.film_info[`total_rating`];
    // this._year = data.year;
    this.duration = data.film_info[`runtime`];
    this.genres = data.film_info[`genre`];
    this.description = data.film_info[`description`];
    this.comments = data[`comments`] || ``;
    this.age = data.film_info[`age_rating`];

    this.isWatched = data.user_details[`already_watched`];
    this.isFavorite = data.user_details[`favorite`];
    this.isInWatchList = data.user_details[`watchlist`];
    this.userComments = data.user_details[`usercomments`];
    this.userRating = data.user_details[`personal_rating`] || `(-)`;
    this.userInfo = data[`user_details`];
  }
  static parseFilm(data) {
    return new FilmModel(data);
  }

  static parseFilms(data) {
    return data.map(FilmModel.parseFilm);
  }

  toRAW() {
    return {
      'id': this._id,
      'user_details': {
        'watchlist': this.isInWatchList,
        'already_watched': this.sWatched,
        'favorite': this._isFavorite,
      },
      'comments': this.userComments,
    };
  }
}
