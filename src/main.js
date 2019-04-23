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
const searchNode = document.querySelector(`.header__search .search`);
const footerStatNode = document.querySelector(`.footer__statistics p`);

// const updateFilm = (films, filmToUpdate, newData) => {
//   const index = films.findIndex((item) => item === filmToUpdate);
//   films[index] = Object.assign({}, filmToUpdate, newData);
//   return films[index];
// };

const getfilters = (filmArray) => {
  return [
    {filterName: `All movies`, href: `all`, isActive: true},
    {filterName: `Watchlist`, href: `watchlist`, quantity: countFilteredFilms(filmArray, `isInWatchList`)},
    {filterName: `History`, href: `history`, quantity: countFilteredFilms(filmArray, `isWatched`)},
    {filterName: `Favorites`, href: `favorites`, quantity: countFilteredFilms(filmArray, `isFavorite`)},
    {filterName: `Stats`, href: `stats`},
  ];
};

const countFilteredFilms = (filmArray, property) => {
  return filmArray.reduce((summ, curr) => +summ + +curr[property], 0);
};

const renderFilters = (container, filmsArray) => {
  const filters = getfilters(filmsArray);
  for (let filter of filters) {
    const filterElement = new Filter(filter);
    const newFilter = filterElement.render();
    container.appendChild(newFilter);

    filterElement.onFilter = () => {
      const filteredFilms = filterFilms(filter.filterName, filmsArray);
      // console.log(filteredFilms.length);
      showLimitedFilmsNumber(filmsContainer, filteredFilms);
      if (document.querySelector(`.films`).classList.contains(`visually-hidden`)) {
        document.querySelector(`.films`).classList.remove(`visually-hidden`);
        document.querySelector(`.statistic`).classList.add(`visually-hidden`);
      }
    };
  }
  document.querySelector(`.main-navigation__item--additional`).addEventListener(`click`, onStatisticsClick);
};

const filterFilms = (filterName, filmsArray, text = ``) => {
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
      return filmsArray.filter((it) => regExpSearch.text(it.filmTitle));
    default:
      return filmsArray;
  }
};

let filmsToShowNumber = MAIN_FILMS_QUANTITY;

const updateComponents = () => {
  api.updateFilm({id: film.id, data: film.toRAW()})
    .then((newFilmData) => {
      console.log(`watched:`, newFilmData);
      // filmElement.update(newFilmData);
      popupElement.update(newFilmData);
    });
  api.getFilms()
    .then((films) => {
      renderFilters(filterContainer, films);
      renderStatistics(films);
    });
  };

const showLimitedFilmsNumber = (container, filmsArray) => {
  renderFilms(container, filmsArray.slice(0, filmsToShowNumber));
  if (filmsToShowNumber >= filmArray.length) {
    showMoreButton.addEventListener(`click`, onShowMoreButtonClick);
    showMoreButton.classList.add(`visually-hidden`);
  }
  filmsToShowNumber += MAIN_FILMS_QUANTITY;
};

const renderFilms = (container, filmArray, hasControlls = true) => {
  container.innerHTML = ``;

  for (let film of filmArray) {
    const filmElement = new Film(film);
    const popupElement = new Popup(film);

    filmElement.hasControls = hasControlls;

    container.appendChild(filmElement.render());

    filmElement.onClick = () => {
      document.body.appendChild(popupElement.render());
    };

    filmElement.onAddToWatchList = () => {
      // // film.isInWatchlist = !film.isInWatchlist;
      // api.updateFilm({id: film.id, data: film.toRAW()})
      //   .then((newFilmData) => {
      //     console.log(`addToWatchList:`, newFilmData);
      //     // filmElement.update(newFilmData);
      //     popupElement.update(newFilmData);
      //   });
      // api.getFilms()
      //   .then((films) => renderFilters(filterContainer, films));
      updateComponents();
      console.log(`added to watchlist`, film.isInWatchList);
    };

    filmElement.onMarkAsWatched = () => {
      // film.isWatched = !film.isWatched;
      // api.updateFilm({id: film.id, data: film.toRAW()})
      //   .then((newFilmData) => {
      //     console.log(`watched:`, newFilmData);
      //     // filmElement.update(newFilmData);
      //     popupElement.update(newFilmData);
      //   });
      // api.getFilms()
      //   .then((films) => {
      //     renderFilters(filterContainer, films);
      //     renderStatistics(films);
      //   });
      updateComponents();
      console.log(`marked as watched`, film.isWatched);
    };

    filmElement.onMarkAsFavorite = () => {
      // film.isFavorite = !film.isFavorite;
      // api.updateFilm({id: film.id, data: film.toRAW()})
      //   .then((newFilmData) => {
      //     // filmElement.update(newFilmData);
      //     popupElement.update(newFilmData);
      //   });
      // api.getFilms()
      //   .then((films) => renderFilters(filterContainer, films));
      updateComponents();
      console.log(`marked as favorite`, film.isFavorite);
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
  }
};

const showSearchResults = (filmsArray, text) => {
  const filteredFilms = filterFilms(`Search`, filmsArray, text);
  showLimitedFilmsNumber(filmsContainer, filteredFilms, true);
};

const renderSearch = (container, filmsArray) => {
  const searchElement = new Search();
  const profileNode = document.querySelector(`.header__profile`);
  container.insertBefore(searchElement.render(), profileNode);

  searchElement.onSearchButtonPress = () => {
    showSearchResults(filmsArray, searchElement.element.value);
    console.log(searchElement.element.value);
  };
  return searchElement.element;
};

const onStatisticsClick = () => {
  document.querySelector(`.films`).classList.add(`visually-hidden`);
  document.querySelector(`.statistic`).classList.remove(`visually-hidden`);
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

const renderAllComponents = () => {
  api.getFilms()
  .then((films) => {
    showLimitedFilmsNumber(filmsContainer, films);
    renderFilms(topRatedNode, filterFilms(`Top rated`, films), false);
    renderFilms(topCommentedNode, filterFilms(`Top commented`, films), false);
    renderStatistics(films);
    renderFilters(filterContainer, films);
    renderSearch(searchNode, films);
    showFooterStatistics();

    const onShowMoreButtonClick = () => showLimitedFilmsNumber(films);
    showMoreButton.addEventListener(`click`, onShowMoreButtonClick);
})};

renderAllComponents();
