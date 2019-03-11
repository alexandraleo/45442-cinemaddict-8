import {default as getRandomNumber} from '../../ToDo/src/utils.js';

const cardNode = document.querySelector(`.films-list__container`);

const getCardElement = (el) => {
  const {filmTitle, rating, year, duration, genre, description, comments} = el;
  return `<article class="film-card">
          <h3 class="film-card__title">${filmTitle}</h3>
          <p class="film-card__rating">${rating}</p>
          <p class="film-card__info">
            <span class="film-card__year">${year}</span>
            <span class="film-card__duration">${duration}</span>
            <span class="film-card__genre">${genre}</span>
          </p>
          <img src="./images/posters/three-friends.jpg" alt="" class="film-card__poster">
          <p class="film-card__description">${description}</p>
          <button class="film-card__comments">${comments}${comments > 1 ? ` comments` : ` comment`}</button>

          <form class="film-card__controls">
            <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist"><!--Add to watchlist--> WL</button>
            <button class="film-card__controls-item button film-card__controls-item--mark-as-watched"><!--Mark as watched-->WTCHD</button>
            <button class="film-card__controls-item button film-card__controls-item--favorite"><!--Mark as favorite-->FAV</button>
          </form>
        </article>`;
};

export const showCards = () => {
  const fragment = document.createDocumentFragment();
  const parser = new DOMParser();

  cards.forEach((el) => {
    const cardElementString = getCardElement(el);
    const cardElementObj = parser.parseFromString(cardElementString, `text/html`);
    const childNodes = cardElementObj.body.childNodes;
    childNodes.forEach((elem) => fragment.appendChild(elem));
  });
  cardNode.appendChild(fragment);
};

export const showSpecialCards = (quantity, specialFilmNode) => {
  let cardElementString = ``;
  const fragment = document.createDocumentFragment();
  const parser = new DOMParser();
  for (let i = 0; i < quantity; i++) {
    cardElementString += templateSpecialCard;
    const cardElementObj = parser.parseFromString(cardElementString, `text/html`);
    fragment.appendChild(cardElementObj.body.childNodes[0]);
  }
  specialFilmNode.appendChild(fragment);
};

const templateSpecialCard = `<article class="film-card film-card--no-controls">
          <h3 class="film-card__title">Incredibles 2</h3>
          <p class="film-card__rating">9.8</p>
          <p class="film-card__info">
            <span class="film-card__year">2018</span>
            <span class="film-card__duration">1h&nbsp;13m</span>
            <span class="film-card__genre">Comedy</span>
          </p>
          <img src="./images/posters/fuga-da-new-york.jpg" alt="" class="film-card__poster">
          <button class="film-card__comments">13 comments</button>
        </article>`;

const cards = [
  {filmTitle: `The Assassination`, rating: getRandomNumber(0, 10), year: getRandomNumber(1920, 2020), duration: `1h&nbsp;13m`, genre: `comedy`, description: `bla-bla-bla`, comments: getRandomNumber(0, 20)},
  {filmTitle: `Misery`, rating: getRandomNumber(0, 10), year: getRandomNumber(1920, 2020), duration: `1h&nbsp;13m`, genre: `comedy`, description: `bla-bla-bla`, comments: getRandomNumber(0, 20)},
  {filmTitle: `Mist`, rating: getRandomNumber(0, 10), year: getRandomNumber(1920, 2020), duration: `1h&nbsp;13m`, genre: `comedy`, description: `bla-bla-bla`, comments: getRandomNumber(0, 20)},
  {filmTitle: `Deadpool`, rating: getRandomNumber(0, 10), year: getRandomNumber(1920, 2020), duration: `1h&nbsp;13m`, genre: `comedy`, description: `bla-bla-bla`, comments: getRandomNumber(0, 20)},
  {filmTitle: `It`, rating: getRandomNumber(0, 10), year: getRandomNumber(1920, 2020), duration: `1h&nbsp;13m`, genre: `comedy`, description: `bla-bla-bla`, comments: getRandomNumber(0, 20)},
  {filmTitle: `Omen`, rating: getRandomNumber(0, 10), year: getRandomNumber(1920, 2020), duration: `1h&nbsp;13m`, genre: `comedy`, description: `bla-bla-bla`, comments: getRandomNumber(0, 20)},
  {filmTitle: `Deadpool`, rating: getRandomNumber(0, 10), year: getRandomNumber(1920, 2020), duration: `1h&nbsp;13m`, genre: `comedy`, description: `bla-bla-bla`, comments: getRandomNumber(0, 20)},
];


