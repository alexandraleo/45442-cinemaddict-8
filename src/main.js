import {showFilters} from './make-filter.js';
import {showCards} from './make-card.js';
import {default as getRandomNumber} from './utils.js';

const topRatedNode = document.querySelector(`.films-list--rated .films-list__container`);
const topCommentedNode = document.querySelector(`.films-list--commented .films-list__container`);
const cardsContainer = document.querySelector(`.films-list .films-list__container`);
const filterContainer = document.querySelector(`.main-navigation`);

showFilters();
showCards(cardsContainer, 7);
showCards(topRatedNode, 2);
showCards(topCommentedNode, 2);

filterContainer.addEventListener(`click`, function (evt) {
  if (evt.currentTarget.className === `main-navigation`) {
    cardsContainer.innerHTML = ``;
    showCards(cardsContainer, getRandomNumber(1, 7));
  }
});
