import {showFilters} from './make-filter.js';
import {Films} from './films.js';

const topRatedNode = document.querySelector(`.films-list--rated .films-list__container`);
const topCommentedNode = document.querySelector(`.films-list--commented .films-list__container`);
const cardsContainer = document.querySelector(`.films-list .films-list__container`);
const filterContainer = document.querySelector(`.main-navigation`);

showFilters();

const mainFilms = new Films(7);
mainFilms.render(cardsContainer);

const topRatedFilms = new Films(2);
topRatedFilms.render(topRatedNode);

const topCommentedFilms = new Films(2);
topCommentedFilms.render(topCommentedNode);

filterContainer.addEventListener(`click`, function (evt) {
  if (evt.currentTarget.className === `main-navigation`) {
    cardsContainer.innerHTML = ``;
    const filteredFilms = new Films(7);
    filteredFilms.render(cardsContainer);
  }
});

