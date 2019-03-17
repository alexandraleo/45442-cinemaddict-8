import {templateCard} from './data.js';
import {Film} from './film.js';
import {Popup} from './popup.js';
import getRandomNumber from './utils.js';

export class Films {
  constructor(number) {
    this._quantity = getRandomNumber(1, number);
  }
  makeArray() {
    const templatesArray = [];
    for (let i = 0; i < this._quantity; i++) {
      const newCard = templateCard();
      templatesArray.push(newCard);
    }
    return templatesArray;
  }
  render(container) {
    const filmsTemplateArray = this.makeArray();
    for (let film of filmsTemplateArray) {
      const filmOnTemplate = new Film(film);
      const newFilm = filmOnTemplate.render();
      const popupTemplate = new Popup(film);
      container.appendChild(newFilm);

      filmOnTemplate.onClick = () => {
        const popupElement = popupTemplate.render();
        document.body.appendChild(popupElement);
      };

      popupTemplate.onClick = () => {
        document.querySelector(`.film-details`).remove();
        popupTemplate.unrender();
      };
    }
  }
}
