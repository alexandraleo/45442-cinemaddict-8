import {templateCard, filters} from './data.js';
import {Film} from './film.js';
import {Popup} from './popup.js';
import getRandomNumber from './utils.js';
import Filter from './filter.js';
import {default as Statistics} from './statistic.js';

const topRatedNode = document.querySelector(`.films-list--rated .films-list__container`);
const topCommentedNode = document.querySelector(`.films-list--commented .films-list__container`);
const filmsContainer = document.querySelector(`.films-list .films-list__container`);
const filterContainer = document.querySelector(`.main-navigation`);
const statButton = document.querySelector(`.main-navigation__item--additional`);
// const statContainer = document.querySelector(`.statistic`);
const mainContainer = document.querySelector(`.main`);

const makeArray = (quantity) => {
  const templatesArray = [];
  for (let i = 0; i < quantity; i++) {
    const newCard = templateCard();
    templatesArray.push(newCard);
  }
  return templatesArray;
};

const updateFilm = (films, filmToUpdate, newData) => {
  const index = films.findIndex((item) => item === filmToUpdate);
  films[index] = Object.assign({}, filmToUpdate, newData);
  return films[index];
};

const renderFilters = (container) => {
  for (let filter of filters) {
    const filterElement = new Filter(filter);
    const newFilter = filterElement.render();
    container.appendChild(newFilter);

    filterElement.onFilter = () => {
      const filteredFilms = filterFilms(filter.filterName);
      // console.log(filteredFilms.length);
      renderFilms(filmsContainer, filteredFilms);
    };
  }
};

const filterFilms = (filterName) => {
  switch (filterName) {
    case `All movies`:
      return filmsTemplateArray;
    case `History`:
      return filmsTemplateArray.filter((item) => item.isWatched);
    case `Watchlist`:
      return filmsTemplateArray.filter((item) => item.isInWatchlist);
    default:
      return filmsTemplateArray;
  }
};

const quantity = (number) => getRandomNumber(1, number);
const filmsTemplateArray = makeArray(quantity(7));
const filmsTopRated = makeArray(quantity(2));

const renderFilms = (container, filmArray) => {
  container.innerHTML = ``;

  for (let film of filmArray) {
    const filmElement = new Film(film);
    const popupTemplate = new Popup(film);
    const newFilm = filmElement.render();

    container.appendChild(newFilm);

    filmElement.onClick = () => {
      const popupElement = popupTemplate.render();
      document.body.appendChild(popupElement);
    };

    filmElement.onAddToWatchList = () => {
      film.isInWatchlist = !film.isInWatchlist;
      const updateCard = updateFilm(filmArray, film);
      filmElement.update(updateCard);
      // console.log(`added to watchlist`);
      stat.update(filmArray);
    };

    filmElement.onMarkAsWatched = () => {
      film.isWatched = !film.isWatched;
      const updateCard = updateFilm(filmArray, film);
      filmElement.update(updateCard);
      // console.log(`marked as watched`);
      // stat
    };

    popupTemplate.onCloseClick = () => {
      popupTemplate.unrender();
      filmElement.bind();
    };

    popupTemplate.onSubmit = () => {
      const updateCard = updateFilm(filmArray, film);
      const oldFilm = filmElement.element;
      filmElement.update(updateCard);
      filmElement.render();
      container.replaceChild(filmElement.element, oldFilm);
      document.body.removeChild(popupTemplate.element);
      popupTemplate.unrender();
      // console.log(`on submit`);
    };
  }
};

const onStatisticsClick = () => {
  document.querySelector(`.films`).classList.toggle(`visually-hidden`);
  stat.element.classList.toggle(`visually-hidden`);
};

const stat = new Statistics(filmsTemplateArray);
const renderStatistics = () => {
  stat.render();
  mainContainer.appendChild(stat.element);
  stat.showStatistics();
};

renderFilters(filterContainer);
renderFilms(filmsContainer, filmsTemplateArray);
renderFilms(topCommentedNode, filmsTopRated);
renderFilms(topRatedNode, filmsTopRated);
renderStatistics();
statButton.addEventListener(`click`, onStatisticsClick);
