import {MAIN_FILMS_QUANTITY, TOP_FILMS_QUANTITY} from './data.js';
import {Film} from './film.js';
import {Popup} from './popup.js';
import Filter from './filter.js';
import Search from './search.js';
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
const searchNode = document.querySelector(`.header__search`);
// const hiddenFilms = filmsContainer.querySelectorAll(`.film-card.visually-hidden`);
const footerStatNode = document.querySelector(`.footer__statistics p`);

// const updateFilm = (films, filmToUpdate, newData) => {
//   const index = films.findIndex((item) => item === filmToUpdate);
//   films[index] = Object.assign({}, filmToUpdate, newData);
//   return films[index];
// };

export const filters = (filmArray) => [
  {filterName: `All movies`, href: `all`, quantity: filmArray.length, isActive: true},
  {filterName: `Watchlist`, href: `watchlist`, quantity: countFilteredFilms(filmArray, `isInWatchlist`), isActive: false},
  {filterName: `History`, href: `history`, quantity: countFilteredFilms(filmArray, `isWatched`), isActive: false},
  {filterName: `Favorites`, href: `favorites`, quantity: countFilteredFilms(filmArray, `isFavorite`), isActive: false},
  {filterName: `Stats`, href: `stats`, quantity: ``},
];

const countFilteredFilms = (filmArray, property) => {
  return filmArray.reduce((summ, curr) => +summ + +curr[`property`], 0);
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
    case `Top rated`:
      return filmsArray.slice().sort((a, b) => Number(b.rating) - Number(a.rating)).slice(0, TOP_FILMS_QUANTITY);
    case `Top commented`:
      return filmsArray.slice().sort((a, b) => Number(b.comments.length) - Number(a.comments.length)).slice(0, TOP_FILMS_QUANTITY);
    case `Search`:
      const regExpSearch = new RegExp(`${(text.length > 0) ? `${text.trim()}` : ``}`, `index`);
      return filmArray.filter((it) => regExpSearch.text(it.filmTitle));
    default:
      return filmsArray;
  }
};

// const findTopRated = (filmsArray) => {
//   return filmsArray.slice().sort((a, b) => Number(b.rating) - Number(a.rating)).slice(0, TOP_FILMS_QUANTITY);
// };

// const findTopCommented = (filmsArray) => {
//   return filmsArray.slice().sort((a, b) => Number(b.comments.length) - Number(a.comments.length)).slice(0, TOP_FILMS_QUANTITY);
// };
// const hiddenFilmsQuantity = () => filmsContainer.querySelectorAll(`.film-card.visually-hidden`).length;

// const showMoreBehavior = () => {
//   return hiddenFilms === 0 ? showMoreButton.classList.add(`visually-hidden`) : showMoreButton.classList.remove(`visually-hidden`);
// };

// const hideFilms = () => {
//   const filmsToHide = filmsContainer.querySelectorAll(`.film-card`); // ?
//   filmsToHide.forEach((film, index) => {
//     return index >= MAIN_FILMS_QUANTITY && film.classList.add(`visually-hidden`);
//   });
// };

// const onShowMoreButtonClick = () => {
//   for (let i = 0; i < hiddenFilms && i < MAIN_FILMS_QUANTITY; i++) {
//     hiddenFilms[i].classList.remove(`visually-hidden`);
//   }
//   showMoreBehavior();
// };

const global = {
  activeFilter: null,
  filmsCollection: null,
  filteredCollection: null,
  filmsCount: MAIN_FILMS_QUANTITY,
};

const setFilmCollection = (collection) => {
  global.filmsCollection = collection;
  global.filmsCount = Math.min(collection.length, MAIN_FILMS_QUANTITY);
  global.filteredCollection = filterFilms(collection, global.activeFilter);
};

const renderShortenedFilmsList = (collection) => {
  const shortenedCollection = collection.slice(0, MAIN_FILMS_QUANTITY);
  filmsContainer.innerHTML = ``;
  renderFilms(filmsContainer, shortenedCollection);
  showMoreButton.classList.remove(`visually-hidden`);
  showMoreButton.removeEventListener(`click`, onShowMoreButtonClick(collection));
  showMoreButton.addEventListener(`click`, onShowMoreButtonClick(collection));

  if (MAIN_FILMS_QUANTITY >= collection.length) {
    showMoreButton.classList.add(`visually-hidden`);
  }
};
// -------------------------------------!
const onShowMoreButtonClick = (evt) => {
  evt.preventDefault();
  const expandedCollection = global.filteredCollection.slice(global.filmsCount, global.filmsCount + MAIN_FILMS_QUANTITY);
  global.filmsCount = global.filmsCount + MAIN_FILMS_QUANTITY;

  renderFilms(filmsContainer, expandedCollection);

  if (global.filmsCount >= global.filteredCollection.length) {
    showMoreButton.classList.add(`visually-hidden`);
    showMoreButton.removeEventListener(`click`, onShowMoreButtonClick);
  }
};

const renderFilms = (container, filmArray, hasControlls = true) => {
  container.innerHTML = ``;

  for (let film of filmArray) {
    const filmElement = new Film(film);
    filmElement.hasControls = hasControlls;

    const popupElement = new Popup(film);
    container.appendChild(filmElement.render());

    filmElement.onClick = () => {
      document.body.appendChild(popupElement.render());
    };

    popupElement.onCloseClick = (newData) => {
      Object.assign(film, newData);

      api.updateFilm({id: film.id, data: film.toRAW()})
        .then((newFilmData) => {
          console.log(newFilmData);
          filmElement.update(newFilmData);
          popupElement.update(newFilmData);
          popupElement.unrender();
          // update filter
        }).catch(() => {
          popupElement.shake();
        });
    };

    popupElement.onEscKeydown = (newData) => {
      Object.assign(film, newData);

      api.updateFilm({id: film.id, data: film.toRAW()})
        .then((newFilmData) => {
          console.log(newFilmData);
          filmElement.update(newFilmData);
          popupElement.update(newFilmData);
          popupElement.unrender();
          // update filter
        }).catch(() => {
          popupElement.shake();
        });
    };

    popupElement.onSubmit = (newData) => {
      const commentNode = popupElement._element.querySelector(`.film-details__comment-input`);
      commentNode.disabled = true;
      commentNode.style.border = null;

      film.comments.push(newData.comment);
      api.updateFilm({id: film.id, data: film.toRAW()})
        .then((newFilmData) => {
          commentNode.value = ``;
          commentNode.disabled = false;
          filmElement.update(newFilmData);
          popupElement.update(newFilmData);
          popupElement.addComment();
          // update filter
        }).catch(() => {
          popupElement.shake();
          commentNode.style.border = `3px solid red`;
          commentNode.disabled = false;
        });
    };

    popupElement.onChooseRating = (newData) => {
      const userRatingValues = popupElement._element.querySelectorAll(`.film-details__user-rating-score`);
      const scoreValue = popupElement._element.querySelectorAll(`.film-details__user-rating-label[for="rating-${popupElement.this__chosenRating}"]`);

      // const applyErrorStyle = (element) => {
      //   element.classList.add(`error`);
      // };

      if (scoreValue.classList.contains(`error`)) {
        scoreValue.classList.remove(`error`);
      }

      userRatingValues.forEach((element) => {
        element.disabled = true;
      });

      film.userRating = newData.userRating;

      api.updateFilm({id: film.id, data: film.toRAW()})
        .then((newFilmData) => {
          userRatingValues.forEach((element) => {
            element.disabled = false;
          });
          film.update(newFilmData);
          popupElement.update(newFilmData);
        }).catch(() => {
          popupElement.shake();
          userRatingValues.forEach((element) => {
            element.disabled = false;
          });
        });
    };

    filmElement.onAddToWatchList = () => {
      // film.isInWatchlist = !film.isInWatchlist;
      api.updateFilm({id: film.id, data: film.toRAW()})
        .then((newFilmData) => {
          console.log(newFilmData);
          filmElement.update(newFilmData);
          popupElement.update(newFilmData);
        }).catch(() => popupElement.shake());
      // const updateCard = updateFilm(filmArray, film);
      // filmElement.update(updateCard);
      console.log(`added to watchlist`, film.isInWatchList);
      // stat.update(filmArray);
    };

    filmElement.onMarkAsWatched = () => {
      // film.isWatched = !film.isWatched;
      api.updateFilm({id: film.id, data: film.toRAW()})
        .then((newFilmData) => {
          filmElement.update(newFilmData);
          popupElement.update(newFilmData);
        }).catch(() => popupElement.shake());
      console.log(`marked as watched`, film.isWatched);
      // stat
    };

    filmElement.onMarkAsFavorite = () => {
      // film.isFavorite = !film.isFavorite;
      api.updateFilm({id: film.id, data: film.toRAW()})
        .then((newFilmData) => {
          filmElement.update(newFilmData);
          popupElement.update(newFilmData);
        }).catch(() => popupElement.shake());
      console.log(`marked as favorite`, film.isFavorite);
      // stat
    };
  }
};

const showSearchResults = () => {
   
};

const renderSearch = (constainer, filmArray) => {
  const searchElement = new Search();
  constainer.innerHTML = ``;
  constainer.appendChild(searchElement.render());

  searchElement.onSearch = () => {
    showSearchResults();
  }
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

api.getFilms()
.then((films) => {
  setFilmCollection(films);
  console.log(films);
  // renderFilms(filmsContainer, films);
  renderShortenedFilmsList(films);
  renderFilms(topRatedNode, filterFilms(`Top rated`, films), false);
  renderFilms(topCommentedNode, filterFilms(`Top commented`, films), false);
  // hideFilms();
  renderStatistics(films);
  renderFilters(filterContainer, films);
  showFooterStatistics();
});

document.querySelector(`.films-list__show-more`).addEventListener(`click`, onShowMoreButtonClick);
