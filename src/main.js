import {filters, MAIN_FILMS_QUANTITY, TOP_FILMS_QUANTITY} from './data.js';
import {Film} from './film.js';
import {Popup} from './popup.js';
import Filter from './filter.js';
import {default as Statistics} from './statistic.js';
import {API} from './api.js';

const AUTHORIZATION = `Basic eo0w590ik29889a`;
const END_POINT = `https://es8-demo-srv.appspot.com/moowle/`;
const api = new API({endPoint: END_POINT, authorization: AUTHORIZATION});

const topRatedNode = document.querySelector(`.films-list--rated .films-list__container`);
const topCommentedNode = document.querySelector(`.films-list--commented .films-list__container`);
const filmsContainer = document.querySelector(`.films-list .films-list__container`);
const filterContainer = document.querySelector(`.main-navigation`);
const statButton = document.querySelector(`.main-navigation__item--additional`);
const showMoreButton = document.querySelector(`.films-list__show-more`);
const mainContainer = document.querySelector(`.main`);
const hiddenFilms = filmsContainer.querySelectorAll(`.film-card.visually-hidden`);
const footerStatNode = document.querySelector(`.footer__statistics p`);

const updateFilm = (films, filmToUpdate, newData) => {
  const index = films.findIndex((item) => item === filmToUpdate);
  films[index] = Object.assign({}, filmToUpdate, newData);
  return films[index];
};

const renderFilters = (container, filmsArray) => {
  for (let filter of filters) {
    const filterElement = new Filter(filter);
    const newFilter = filterElement.render();
    container.appendChild(newFilter);

    filterElement.onFilter = () => {
      const filteredFilms = filterFilms(filter.filterName, filmsArray);
      // console.log(filteredFilms.length);
      renderFilms(filmsContainer, filteredFilms);
    };
  }
};

const filterFilms = (filterName, filmsArray) => {
  switch (filterName) {
    case `All movies`:
      return filmsArray;
    case `History`:
      return filmsArray.filter((item) => item.isWatched);
    case `Watchlist`:
      return filmsArray.filter((item) => item.isInWatchlist);
    case `Favorites`:
      return filmsArray.filter((item) => item.isFavorite);
    default:
      return filmsArray;
  }
};

const hideFilms = () => {
  const filmsToHide = filmsContainer.querySelectorAll(`.film-card`); // ?
  filmsToHide.forEach((film, index) => {
    return index >= MAIN_FILMS_QUANTITY && film.classList.add(`visually-hidden`);
  });
}

const onShowMoreButtonClick = () => {
  for (let i = 0; i < hiddenFilms.length && i < MAIN_FILMS_QUANTITY; i++) {
    hiddenFilms[i].classList.remove(`visually-hidden`);
  }
  showMoreBehavior();
};

const findTopFilms = (filmsArray, property) => {
  return filmsArray.slice().sort((a, b) => Number(b.property) - Number(a.property)).slice(0, TOP_FILMS_QUANTITY);
};

const showMoreBehavior = () => {
  return hiddenFilms.length === 0 ? showMoreButton.classList.add(`visually-hidden`) : showMoreButton.classList.remove(`visually-hidden`);
}

const renderFilms = (container, filmArray) => {
  container.innerHTML = ``;

  for (let film of filmArray) {
    const filmElement = new Film(film);
    const newFilm = filmElement.render();

    container.appendChild(newFilm);

    filmElement.onClick = () => {
      const popupTemplate = new Popup(film);
      const popupElement = popupTemplate.render();
      document.body.appendChild(popupElement);

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

    filmElement.onMarkFavorite = () => {
      film.isFavorite = !film.isFavorite;
      const updateCard = updateFilm(filmArray, film);
      filmElement.update(updateCard);
      // console.log(`marked as watched`);
      // stat
    };
  }
};

const onStatisticsClick = () => {
  document.querySelector(`.films`).classList.toggle(`visually-hidden`);
  stat.element.classList.toggle(`visually-hidden`);
};

const renderStatistics = (data) => {
  const stat = new Statistics(data);
  stat.render();
  mainContainer.appendChild(stat.element);
  stat.showStatistics();
};

const showFooterStatistics = () => {
  const filmsQuantity = filmsContainer.querySelectorAll(`.film-card`).length;
  footerStatNode.textContent = `${filmsQuantity} movie${filmsQuantity > 1 ? `s` : ``} inside`;
};

const topRated = findTopFilms(films, rating);
const topCommented = findTopFilms(films, comments.length);

api.getFilms()
.then((films) => {
  console.log(films);
  renderFilms(filmsContainer, films);
  renderFilms(topRatedNode, topRated);
  renderFilms(topCommentedNode, topCommented);
  // renderFilms();
  renderStatistics(films);
  renderFilters(filterContainer, films);
});
statButton.addEventListener(`click`, onStatisticsClick);
