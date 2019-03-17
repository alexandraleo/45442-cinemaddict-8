import {templateCard} from './data.js';
import {Film} from './film.js';
import getRandomNumber from './utils.js';

export class Films {
  constructor(number) {
    this._quantity = getRandomNumber(1, number);
  }
  makeArray() {
    const filmsTemplateArray = [];
    for (let i = 0; i < this._quantity; i++) {
      filmsTemplateArray.push(new Film(templateCard()));
    }
    return filmsTemplateArray;
  }
  render(container) {
    const filmsTemplateArray = this.makeArray();
    for (let film of filmsTemplateArray) {
      const newFilm = film.render();
      container.appendChild(newFilm);
    }
  }
}
