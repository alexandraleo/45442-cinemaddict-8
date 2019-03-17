import createElement from './create-element.js';
export class Film {
  constructor(data) {
    this._filmTitle = data.filmTitle;
    this._poster = data.poster;
    this._rating = data.rating;
    this._year = data.year;
    this._duration = data.duration;
    this._genre = data.genre;
    this._description = data.description;
    this._comments = data.comments;

    this._element = null;
  }
  get template() {
    return `<article class="film-card">
          <h3 class="film-card__title">${this._filmTitle}</h3>
          <p class="film-card__rating">${this._rating}</p>
          <p class="film-card__info">
            <span class="film-card__year">${this._year}</span>
            <span class="film-card__duration">${this._duration}</span>
            <span class="film-card__genre">${this._genre}</span>
          </p>
          <img src="./images/posters/${this._poster}.jpg" alt="" class="film-card__poster">
          <p class="film-card__description">${this._description}</p>
          <button class="film-card__comments">${this._comments}${this._comments > 1 ? ` comments` : ` comment`}</button>

          <form class="film-card__controls">
            <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist"><!--Add to watchlist--> WL</button>
            <button class="film-card__controls-item button film-card__controls-item--mark-as-watched"><!--Mark as watched-->WTCHD</button>
            <button class="film-card__controls-item button film-card__controls-item--favorite"><!--Mark as favorite-->FAV</button>
          </form>
        </article>`.trim();
  }
  get element() {
    return this._element;
  }
  render() {
    this._element = createElement(this.template);
    this.bind();
    return this._element;
  }
  bind() {}
  unrender() {}
  unbind() {}
}
