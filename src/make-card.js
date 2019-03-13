import {default as getRandomNumber} from '../../ToDo/src/utils.js';

const anyDescription = () => {
  const filmDescription = `Lorem ipsum dolor sit amet, consectetur adipiscing elit.Cras aliquet varius magna,
// non porta ligula feugiat eget.Fusce tristique felis at fermentum pharetra.Aliquam id orci ut lectus varius viverra.Nullam nunc ex,
// convallis sed finibus eget, sollicitudin eget ante.Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.Sed blandit,
// eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.Sed sed nisi sed augue convallis suscipit in sed felis.Aliquam
// erat volutpat.Nunc fermentum tortor ac porta dapibus.In rutrum ac purus sit amet tempus.`;
  const descriptionArray = filmDescription.split(`.`);
  return descriptionArray[getRandomNumber(0, descriptionArray.length - 1)];
};

const templateCard = () => ({
  filmTitle: [
    `Roman Holiday`,
    `How to Steal a Million`,
    `The Children's Hour`,
    `Breakfast at Tiffany's`,
    `The Green Mile`,
    `Forrest Gump`,
    `The Shawshank Redemption`,
    `Schindler's List`,
    `Léon`,
    `The Lion King`,
    `Fight Club`,
    `La vita è bella`,
    `Knockin' on Heaven's Door`,
    `The Godfather`,
    `The Prestige`
  ][getRandomNumber(0, 14)],
  poster: [
    `accused`,
    `blackmail`,
    `blue-blazes`,
    `fuga-da-new-york`,
    `moonrise`,
    `three-friends`
  ][getRandomNumber(0, 5)],
  rating: getRandomNumber(0, 10),
  year: getRandomNumber(1920, 2020),
  duration: [`1h 30min`, `2h 30 min`, `3h`][getRandomNumber(0, 2)],
  genre: [`comedy`, `thriller`, `fantasy`, `sci-fi`, `documental`, `parody`, `drama`, `melodrama`][getRandomNumber(0, 7)],
  description: anyDescription(),
  comments: getRandomNumber(0, 25),
});

const getCardElement = (film) => `<article class="film-card">
          <h3 class="film-card__title">${film.filmTitle}</h3>
          <p class="film-card__rating">${film.rating}</p>
          <p class="film-card__info">
            <span class="film-card__year">${film.year}</span>
            <span class="film-card__duration">${film.duration}</span>
            <span class="film-card__genre">${film.genre}</span>
          </p>
          <img src="./images/posters/${film.poster}.jpg" alt="" class="film-card__poster">
          <p class="film-card__description">${film.description}</p>
          <button class="film-card__comments">${film.comments}${film.comments > 1 ? ` comments` : ` comment`}</button>

          <form class="film-card__controls">
            <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist"><!--Add to watchlist--> WL</button>
            <button class="film-card__controls-item button film-card__controls-item--mark-as-watched"><!--Mark as watched-->WTCHD</button>
            <button class="film-card__controls-item button film-card__controls-item--favorite"><!--Mark as favorite-->FAV</button>
          </form>
        </article>`;

export const showCards = (dest, quantity) => {
  dest.insertAdjacentHTML(`beforeend`, new Array(quantity).fill(``).map(() => getCardElement(templateCard())).join(``));
};
