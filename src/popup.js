import Component from './component.js';
import {Emoji} from './utils.js';
import moment from 'moment';

export class Popup extends Component {
  constructor(film) {
    super();
    this._filmTitle = film.filmTitle;
    this._originalTitle = film.originalTitle;
    this._director = film.director;
    this._writers = film.writers;
    this._actors = film.actors;
    this._releaseDate = film.releaseDate;
    this._country = film.country;
    this._poster = film.poster;
    this._rating = film.rating;
    this._year = film.year;
    this._duration = film.duration;
    this._genres = film.genres;
    this._description = film.description;
    this._comments = film.comments;
    this._age = film.age;

    this._onSubmitClick = this._onSubmitClick.bind(this);

    this._onSubmit = null;
    this._isWatched = film.isWatched;
    this._isFavorites = film.isFavorites;
    this._isInWatchList = film.isInWatchList;
  }

  get template() {
    return `<section class="film-details">
  <form class="film-details__inner" action="" method="get">
    <div class="film-details__close">
      <button class="film-details__close-btn" type="button">close</button>
    </div>
    <div class="film-details__info-wrap">
      <div class="film-details__poster">
        <img class="film-details__poster-img" src="images/posters/${this._poster}.jpg" alt="${this._title}">
        <p class="film-details__age">${this._age}</p>
      </div>

      <div class="film-details__info">
        <div class="film-details__info-head">
          <div class="film-details__title-wrap">
            <h3 class="film-details__title">${this._filmTitle}</h3>
            <p class="film-details__title-original">Original: ${this._originalTitle}</p>
          </div>

          <div class="film-details__rating">
            <p class="film-details__total-rating">${this._rating}</p>
            <p class="film-details__user-rating">Your rate ${this._userRating}</p>
          </div>
        </div>

        <table class="film-details__table">
          <tr class="film-details__row">
            <td class="film-details__term">Director</td>
            <td class="film-details__cell">${this._director}</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Writers</td>
            <td class="film-details__cell">${this._writers}</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Actors</td>
            <td class="film-details__cell">${Array.from(this._actors).join(`, `)}</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Release Date</td>
            <td class="film-details__cell">${moment(this._releaseDate).format(`D MMM YYYY`)} (${this._country})</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Runtime</td>
            <td class="film-details__cell">${this._duration}</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Country</td>
            <td class="film-details__cell">${this._country}</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Genres</td>
            <td class="film-details__cell">
              ${Array.from(this._genres).map((genre) => (`<span class="film-details__genre">${genre}</span>`.trim())).join(``)}
            </td>
          </tr>
        </table>

        <p class="film-details__film-description">
          ${this._description}
        </p>
      </div>
    </div>

    <section class="film-details__controls">
      <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${this._isInWatchList ? `checked` : ``}>
      <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">${this._isInWatchList ? `In watchlist` : `Add to watchlist`}</label>

      <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${this._isWatched ? `checked` : ``}>
      <label for="watched" class="film-details__control-label film-details__control-label--watched">${this.isWatched ? `Already watched` : `Isn't watched`}</label>

      <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${this._isFavorites ? `checked` : ``}>
      <label for="favorite" class="film-details__control-label film-details__control-label--favorite">${this._isFavorites ? `In favorites` : `Add to favorites`}</label>
    </section>

    <section class="film-details__comments-wrap">
      <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${this._comments.length}</span></h3>

      <ul class="film-details__comments-list">
      ${Array.from(this._comments).map((comment) => (`<li class="film-details__comment">
          <span class="film-details__comment-emoji">${Emoji[comment.emoji]}</span>
          <div>
            <p class="film-details__comment-text">${comment.text}</p>
            <p class="film-details__comment-info">
              <span class="film-details__comment-author">${comment.author}</span>
              <span class="film-details__comment-day">${moment(new Date() - comment.publishDate).format(`D`)}${moment(new Date() - comment.publishDate).format(`D`) > 1 ? ` days ago` : ` day ago`}</span>
            </p>
          </div>
        </li>`.trim())).join(``)}
      </ul>

      <div class="film-details__new-comment">
        <div>
          <label for="add-emoji" class="film-details__add-emoji-label">😐</label>
          <input type="checkbox" class="film-details__add-emoji visually-hidden" id="add-emoji">

          <div class="film-details__emoji-list">
            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
            <label class="film-details__emoji-label" for="emoji-sleeping">😴</label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-neutral-face" value="neutral-face" checked>
            <label class="film-details__emoji-label" for="emoji-neutral-face">😐</label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-grinning" value="grinning">
            <label class="film-details__emoji-label" for="emoji-grinning">😀</label>
          </div>
        </div>
        <label class="film-details__comment-label">
          <textarea class="film-details__comment-input" placeholder="← Select reaction, add comment here" name="comment"></textarea>
        </label>
      </div>
    </section>

    <section class="film-details__user-rating-wrap">
      <div class="film-details__user-rating-controls">
        <span class="film-details__watched-status film-details__watched-status--active">Already watched</span>
        <button class="film-details__watched-reset" type="button">undo</button>
      </div>

      <div class="film-details__user-score">
        <div class="film-details__user-rating-poster">
          <img src="images/posters/${this._poster}.jpg" alt="film-poster" class="film-details__user-rating-img">
        </div>

        <section class="film-details__user-rating-inner">
          <h3 class="film-details__user-rating-title">${this._filmTitle}</h3>

          <p class="film-details__user-rating-feelings">How you feel it?</p>

          <div class="film-details__user-rating-score">
            <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="1" id="rating-1"
            ${this._userRating === 1 ? `checked` : ``}>
            <label class="film-details__user-rating-label" for="rating-1">1</label>

            <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="2" id="rating-2"
            ${this._userRating === 2 ? `checked` : ``}>
            <label class="film-details__user-rating-label" for="rating-2">2</label>

            <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="3" id="rating-3"
            ${this._userRating === 3 ? `checked` : ``}>
            <label class="film-details__user-rating-label" for="rating-3">3</label>

            <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="4" id="rating-4"
            ${this._userRating === 4 ? `checked` : ``}>
            <label class="film-details__user-rating-label" for="rating-4">4</label>

            <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="5" id="rating-5"
            ${this._userRating === 5 ? `checked` : ``}>
            <label class="film-details__user-rating-label" for="rating-5">5</label>

            <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="6" id="rating-6"
            ${this._userRating === 6 ? `checked` : ``}>
            <label class="film-details__user-rating-label" for="rating-6">6</label>

            <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="7" id="rating-7"
            ${this._userRating === 7 ? `checked` : ``}>
            <label class="film-details__user-rating-label" for="rating-7">7</label>

            <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="8" id="rating-8"
            ${this._userRating === 8 ? `checked` : ``}>
            <label class="film-details__user-rating-label" for="rating-8">8</label>

            <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="9" id="rating-9"
            ${this._userRating === 9 ? `checked` : ``}>
            <label class="film-details__user-rating-label" for="rating-9">9</label>

          </div>
        </section>
      </div>
    </section>
  </form>
</section>`.trim();
  }

  _onSubmitClick(evt) {
    evt.preventDefault();
    if (evt.keyCode === (13 && 17)) {
      const formData = new FormData(this._element.querySelector(`.film-details__inner`));
      const newData = this._processData(formData);
      if (typeof this._onSubmit === `function`) {
        this._onSubmit(newData);
      }
      this.update(newData);
    }
  }

  set onSubmit(fn) {
    this._onSubmit = fn;
  }

  set onCloseClick(fn) {
    this._onCloseClick = fn;
  }

  _processData(formData) {
    const entry = {
      score: ``,
      text: ``,
      favorite: ``,
      watchlist: ``,
    };
    const popupMapper = Popup.createMapper(entry);
    for (const pair of formData.entries()) {
      const [property, value] = pair;
      if (popupMapper[property]) {
        popupMapper[property](value);
      }
    }
    return entry;
  }

  static createMapper(target) {
    return {
      score: (value) => {
        target.userRating = value;
      },
      watched: (value) => {
        target.isWatched = (value === `on`);
      },
      favorite: (value) => {
        target.isFavorites = (value === `on`);
      },
      watchlist: (value) => {
        target.isInWatchList = (value === `on`);
      },
      comment: (value) => {
        target.commentText = value;
      },
      commentEmoji: (value) => {
        target.commentEmoji = value;
      },
    };
  }

  bind() {
    this._element.querySelector(`.film-details__close-btn`).addEventListener(`click`, this._onCloseClick);
    this._element.querySelector(`.film-details__inner`).addEventListener(`keydown`, this._onSubmitClick);

  }

  unbind() {
    this._element.querySelector(`.film-details__close-btn`).removeEventListener(`click`, this._onCloseClick);
    this._element.querySelector(`.film-details__inner`).removeEventListener(`keydown`, this._onSubmitClick);
  }
  update(film) {
    this._userRating = film.userRating;
    this._comments = film.comments;
    this._isFavorites = film.isFavorites;
    this._isWatched = film.isWatched;
    this._isInWatchList = film.isInWatchList;
  }
}
