import {templateCard} from './data.js';
import {Film} from './film.js';
import {Popup} from './popup.js';
import getRandomNumber from './utils.js';

export class Films {
  constructor(number) {
    this._quantity = getRandomNumber(1, number);
  }
  _makeArray() {
    const templatesArray = [];
    for (let i = 0; i < this._quantity; i++) {
      const newCard = templateCard();
      templatesArray.push(newCard);
    }
    return templatesArray;
  }

  _updateFilm(films, filmToUpdate, newData) {
    const index = films.findIndex((item) => item === filmToUpdate);
    films[index] = Object.assign({}, filmToUpdate, newData);
    return films[index];
  }

  render(container) {
    const filmsTemplateArray = this._makeArray();
    for (let film of filmsTemplateArray) {
      const filmElement = new Film(film);
      const newFilm = filmElement.render();
      const popupTemplate = new Popup(film);
      container.appendChild(newFilm);

      filmElement.onClick = () => {
        const popupElement = popupTemplate.render();
        document.body.appendChild(popupElement);
      };

      newFilm.onAddToWatchList = () => {
        film.isInWatchlist = !film.isInWatchlist;
        const updateCard = filmElement._updateFilm(filmsTemplateArray, film);
        filmElement.update(updateCard);
        // stat
      };

      newFilm.onMarkAsWatched = () => {
        film.isWatched = !film.isWatched;
        const updateCard = filmElement._updateFilm(filmsTemplateArray, film);
        filmElement.update(updateCard);
        // stat
      };

      popupTemplate.onClick = () => {
        popupTemplate.unrender();
        filmElement.bind();
      };
      popupTemplate.onSubmit = () => {
        this._updateFilm(filmsTemplateArray, film);
        popupTemplate.update(film);
        filmElement.render();
        // let oldFilm = filmElement.element;
        // document.body.replaceChild(oldFilm, popupTemplate.element);
        popupTemplate.unrender();

        // filmElement.render();
        // filmElement.bind();
        // container.replaceChild(filmElement.element, oldFilm);
        // popupTemplate.unrender();
      };
    }
  }
}
