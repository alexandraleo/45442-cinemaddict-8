import {filters, MAIN_FILMS_QUANTITY, TOP_FILMS_QUANTITY} from './data.js';
import {Film} from './film.js';
import {Popup} from './popup.js';
import Filter from './filter.js';
import {default as Statistics} from './statistic.js';
import {API} from './api.js';

const AUTHORIZATION = `Basic eo0w590ik29889a${Math.random()}`;
const END_POINT = `https://es8-demo-srv.appspot.com/moowle/`;
const api = new API({endPoint: END_POINT, authorization: AUTHORIZATION});

const topRatedNode = document.querySelector(`.films-list--rated .films-list__container`);
const topCommentedNode = document.querySelector(`.films-list--commented .films-list__container`);
const filmsContainer = document.querySelector(`.films-list .films-list__container`);
const filterContainer = document.querySelector(`.main-navigation`);
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
  document.querySelector(`.main-navigation__item--additional`).addEventListener(`click`, onStatisticsClick);
};

const filterFilms = (filterName, filmsArray) => {
  switch (filterName) {
    case `All movies`:
      return filmsArray;
    case `History`:
      return filmsArray.filter((item) => item.isWatched);
    case `Watchlist`:
      return filmsArray.filter((item) => item.isInWatchList);
    case `Favorites`:
      return filmsArray.filter((item) => item.isFavorite);
    default:
      return filmsArray;
  }
};
// const hiddenFilmsQuantity = () => filmsContainer.querySelectorAll(`.film-card.visually-hidden`).length;

const showMoreBehavior = () => {
  return hiddenFilms === 0 ? showMoreButton.classList.add(`visually-hidden`) : showMoreButton.classList.remove(`visually-hidden`);
};

const hideFilms = () => {
  const filmsToHide = filmsContainer.querySelectorAll(`.film-card`); // ?
  filmsToHide.forEach((film, index) => {
    return index >= MAIN_FILMS_QUANTITY && film.classList.add(`visually-hidden`);
  });
};

const onShowMoreButtonClick = () => {
  for (let i = 0; i < hiddenFilms && i < MAIN_FILMS_QUANTITY; i++) {
    hiddenFilms[i].classList.remove(`visually-hidden`);
  }
  showMoreBehavior();
};

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

      popupTemplate.onCloseUpdate = () => {
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
        // popupTemplate.unrender();
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
  hideFilms();
  document.querySelector(`.films-list__show-more`).addEventListener(`click`, onShowMoreButtonClick);
};

const onStatisticsClick = () => {
  document.querySelector(`.films`).classList.toggle(`visually-hidden`);
  document.querySelector(`.statistic`).classList.toggle(`visually-hidden`);
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

const findTopRated = (filmsArray) => {
  return filmsArray.slice().sort((a, b) => Number(b.rating) - Number(a.rating)).slice(0, TOP_FILMS_QUANTITY);
};

const findTopCommented = (filmsArray) => {
  return filmsArray.slice().sort((a, b) => Number(b.comments.length) - Number(a.comments.length)).slice(0, TOP_FILMS_QUANTITY);
};

api.getFilms()
.then((films) => {
  console.log(films);
  renderFilms(filmsContainer, films);
  renderFilms(topRatedNode, findTopRated(films));
  renderFilms(topCommentedNode, findTopCommented(films));
  // renderFilms();
  renderStatistics(films);
  renderFilters(filterContainer, films);
  showFooterStatistics();
});
