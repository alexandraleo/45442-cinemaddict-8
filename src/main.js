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

const updateByApi = (data) = {
  api.updateFilm({id: data.id, data: data.toRAW()})
  .then((newFilmData) => {
    filmElement.update(newFilmData);
    popupElement.update(newFilmData);
  }).catch(() => popupElement.shake());
}

const renderFilms = (container, filmArray) => {
  container.innerHTML = ``;

  for (let film of filmArray) {
    const filmElement = new Film(film);
    const newFilm = filmElement.render();

    filmElement.onClick = () => {
      const popupTemplate = new Popup(film);
      const popupElement = popupTemplate.render();
      document.body.appendChild(popupElement);

      popupTemplate.onCloseUpdate = (newData) => {
        Object.assign(film, newData);

        api.updateFilm({id: film.id, data: film.toRAW()})
          .then((newFilmData) => {
            film.update(newFilmData);
            popupElement.update(newFilmData);
            popupElement.unrender();
            // update filter
          }).catch(() => {
            popupElement.shake();
        });
        // popupTemplate.unrender();
        // filmElement.bind();
      };

      popupElement.onEscKeydown = () => {
        filmElement.update(film); // ?
        popupElement.unrender();
      }
 
      popupTemplate.onSubmit = (newData) => {
        const commentNode = popupTemplate._element.querySelector(`.film-details__comment-input`);
        commentNode.disabled = true;
        commentNode.style.border = null;

        film.comments.push(newData.comment);
        api.updateFilm({id: film.id, data: film.toRAW()})
          .then((newFilmData) => {
            commentNode.value = ``;
            commentNode.disabled = false;
            popupElement.addComment();
            film.update(newFilmData);
            popupElement.update(newFilmData);
            // update filter
          }).catch(() => {
            popupElement.shake();
            commentNode.style.border = `3px solid red`;
            commentNode.disabled = false;
        });
        // const updateCard = updateFilm(filmArray, film);
        // const oldFilm = filmElement.element;
        // filmElement.update(updateCard);
        // filmElement.render();
        // container.replaceChild(filmElement.element, oldFilm);
        // document.body.removeChild(popupTemplate.element);
        // popupTemplate.unrender();
        // console.log(`on submit`);
      };

      popupElement.onChooseRating = (newData) => {
        const userRatingValues = popupElement._element.querySelectorAll(`.film-details__user-rating-score`);
        const scoreValue = popupElement._element.querySelectorAll(`.film-details__user-rating-label[for="rating-${}"]`);

        const applyErrorStyle = (element) => {
          element.classList.add(`error`);
        }

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
            })
          });
        }
      }
      container.appendChild(newFilm);

    };

    filmElement.onAddToWatchList = () => {
      film.isInWatchlist = !film.isInWatchlist;
      updateByApi();
      // const updateCard = updateFilm(filmArray, film);
      // filmElement.update(updateCard);
      // // console.log(`added to watchlist`);
      // stat.update(filmArray);
    };

    filmElement.onMarkAsWatched = () => {
      film.isWatched = !film.isWatched;
      updateByApi();
      // console.log(`marked as watched`);
      // stat
    };

    filmElement.onMarkFavorite = () => {
      film.isFavorite = !film.isFavorite;
      updateByApi();
      // console.log(`marked as watched`);
      // stat
    };


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
  hideFilms();
  renderStatistics(films);
  renderFilters(filterContainer, films);
  showFooterStatistics();
});

document.querySelector(`.films-list__show-more`).addEventListener(`click`, onShowMoreButtonClick);
