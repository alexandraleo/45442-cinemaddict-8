import Component from './component.js';
import moment from 'moment';
export class Film extends Component {
  constructor(data) {
    super();
    this._filmTitle = data.filmTitle;
    this._originalTitle = data.originalTitle;
    this._director = data.director;
    this._writers = data.writers;
    this._actors = data.actors;
    this._releaseDate = data.releaseDate;
    this._country = data.country;
    this._poster = data.poster;
    this._rating = data.rating;
    this._userRating = data.userRating;
    this._duration = data.duration;
    this._genres = data.genres;
    this._description = data.description;
    this._comments = data.comments;
    this._age = data.age;

    this._status = {
      isControl: false
    };

    this._onCommentsButtonClick = this._onCommentsButtonClick.bind(this);
    // this._onCloseClick = this._onCloseClick.bind(this); // ?????
    this._isWatched = data.isWatched;
    this._isFavorites = data.isFavorites;
    this._isInWatchList = data.isInWatchList;
  }
  get template() {
    return `<article class="film-card ${this._status.isControl ? `film-card--no-controls` : ``}">
          <h3 class="film-card__title">${this._filmTitle}</h3>
          <p class="film-card__rating">${this._rating} (${this._userRating})</p>
          <p class="film-card__info">
            <span class="film-card__year">${moment(this._releaseDate).format(`YYYY`)}</span>
            <span class="film-card__duration">${this._duration}</span>
            ${Array.from(this._genres).map((genre) => (`<span class="film-card__genre">${genre}</span>`.trim())).join(``)}
          </p>
          <img src="./images/posters/${this._poster}.jpg" alt="" class="film-card__poster">
          <p class="film-card__description">${this._description}</p>
          <button class="film-card__comments">${this._comments.length}${this._comments.length > 1 ? ` comments` : ` comment`}</button>
          ${this._status.isControl ? `<form class="film-card__controls">
            <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist"><!--Add to watchlist--> WL</button>
            <button class="film-card__controls-item button film-card__controls-item--mark-as-watched"><!--Mark as watched-->WTCHD</button>
            <button class="film-card__controls-item button film-card__controls-item--favorite"><!--Mark as favorite-->FAV</button>
          </form>` : ``}
        </article>`.trim();
  }
  set onClick(fn) {
    this._onClick = fn;
  }
  set isShowDetail(isControl = true) {
    this._status.isControl = isControl;
  }
  _onCommentsButtonClick() {
    return typeof this._onClick === `function` && this._onClick();
  }

  bind() {
    this._element.querySelector(`.film-card__comments`).addEventListener(`click`, this._onCommentsButtonClick);
  }
  unbind() {
    this._element.querySelector(`.film-card__comments`).removeEventListener(`click`, this._onCommentsButtonClick);
  }
  update(film) {
    this._userRating = film.userRating;
    this._comments = film.comments;
    this._isFavorites = film.isFavorites;
    this._isWatched = film.isWatched;
    this._isInWatchList = film.isInWatchList;
  }
}
