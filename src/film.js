import Component from './component.js';
import moment from 'moment';
export class Film extends Component {
  constructor(data) {
    super();
    this._filmTitle = data.filmTitle;
    this._releaseDate = data.releaseDate;
    this._country = data.country;
    this._poster = data.poster;
    this._rating = data.rating;
    this._duration = data.duration;
    this._genres = data.genres;
    this._description = data.description;
    this._comments = data.comments;
    this._age = data.age;

    this._onCommentsButtonClick = this._onCommentsButtonClick.bind(this);
    this._onMarkAsWatched = this._onMarkAsWatched.bind(this);
    this._onAddToWatchList = this._onAddToWatchList.bind(this);
    this._onMarkAsFavorite = this._onMarkAsFavorite.bind(this);

    this._isWatched = data.isWatched;
    this._isFavorite = data.isFavorite;
    this._isInWatchList = data.isInWatchList;
    this._userComments = data.userComments;
    this._userRating = data.userRating;
  }
  get template() {
    return `<article class="film-card">
          <h3 class="film-card__title">${this._filmTitle}</h3>
          <p class="film-card__rating">${this._rating} ${this._userRating > 0 ? `(${this._userRating})` : `(-)`}</p>
          <p class="film-card__info">
            <span class="film-card__year">${moment(this._releaseDate).format(`YYYY`)}</span>
            <span class="film-card__duration">${Math.round(this._duration / 60)}h ${this._duration % 60}m</span>
            ${Array.from(this._genres).map((genre) => (`<span class="film-card__genre">${genre}</span>`.trim())).join(``)}
          </p>
          <img src="${this._poster}" alt="${this._filmTitle} poster" class="film-card__poster">
          <p class="film-card__description">${this._description}</p>
          <button class="film-card__comments">${this._comments.length}${this._comments.length > 1 ? ` comments` : ` comment`}</button>
          <form class="film-card__controls">
            <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist"><!--Add to watchlist--> WL</button>
            <button class="film-card__controls-item button film-card__controls-item--mark-as-watched"><!--Mark as watched-->WTCHD</button>
            <button class="film-card__controls-item button film-card__controls-item--favorite"><!--Mark as favorite-->FAV</button>
          </form>
        </article>`.trim();
  }
  set onClick(fn) {
    this._onClick = fn;
  }

  set onAddToWatchList(fn) {
    this._onAddToWatchList = fn;
  }

  set onMarkAsWatched(fn) {
    this._onMarkAsWatched = fn;
  }

  set onMarkAsFavorite(fn) {
    this._onMarkAsFavorite = fn;
  }

  _onCommentsButtonClick() {
    return typeof this._onClick === `function` && this._onClick();
  }

  _onAddToWatchList() {
    return typeof this._onAddToWatchList === `function` && this._onAddToWatchList();
  }

  _onMarkAsWatched() {
    return typeof this._onMarkAsWatched === `function` && this._onMarkAsWatched();
  }

  _onMarkAsFavorite() {
    return typeof this._onMarkAsFavorite === `function` && this._onMarkAsFavorite();
  }

  bind() {
    this._element.querySelector(`.film-card__comments`).addEventListener(`click`, this._onCommentsButtonClick);
    this._element.querySelector(`.film-card__controls-item--add-to-watchlist`).addEventListener(`click`, this._onAddToWatchList);
    this._element.querySelector(`.film-card__controls-item--mark-as-watched`).addEventListener(`click`, this._onMarkAsWatched);
    this._element.querySelector(`.film-card__controls-item--favorite`).addEventListener(`click`, this._onMarkAsFavorite);
  }
  unbind() {
    this._element.querySelector(`.film-card__comments`).removeEventListener(`click`, this._onCommentsButtonClick);
    this._element.querySelector(`.film-card__controls-item--add-to-watchlist`).removeEventListener(`click`, this._onAddToWatchList);
    this._element.querySelector(`.film-card__controls-item--mark-as-watched`).removeEventListener(`click`, this._onMarkAsWatched);
    this._element.querySelector(`.film-card__controls-item--favorite`).removeEventListener(`click`, this._onMarkAsFavorite);
  }

  update(film) {
    this._userRating = film.userRating;
    this._comments = film.comments;
    this._isFavorite = film.isFavorite;
    this._isWatched = film.isWatched;
    this._isInWatchList = film.isInWatchList;
  }
}
