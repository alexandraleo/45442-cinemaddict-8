import {showFilters} from './make-filter.js';
import {showCards, showSpecialCards} from './make-card.js';
import {default as getRandomNumber} from './utils.js';

const topRatedNode = document.querySelector(`.films-list--rated .films-list__container`);
const topCommentedNode = document.querySelector(`.films-list--commented .films-list__container`);
const cardsContainer = document.querySelector(`.films-list .films-list__container`);

showFilters();
showCards();
showSpecialCards(2, topRatedNode);
showSpecialCards(2, topCommentedNode);

cardsContainer.addEventListener(`click`, function (evt) {
  if (evt.target.className === `main-navigation__item`) {
    cardsContainer.innerHTML = ``;
    showSpecialCards(getRandomNumber(1, 7), cardsContainer);
  }
});
