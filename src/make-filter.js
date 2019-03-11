import {default as getRandomNumber} from './utils.js';

const filtersNode = document.querySelector(`.main-navigation`);
const filters = [
  {filterName: `All movies`, count: getRandomNumber(0, 15), isActive: true},
  {filterName: `Watchlist`, count: getRandomNumber(0, 15)},
  {filterName: `History`, count: getRandomNumber(0, 15)},
  {filterName: `Favorites`, count: getRandomNumber(0, 15)},
];

const getFilterElement = (el) => {
  const {filterName, count, isActive = false} = el;
  return `<a href="#${filterName}" class="main-navigation__item ${isActive ? `main-navigation__item--active` : ``}">${filterName} <span class="main-navigation__item-count">${count}</span></a>`;
};

export const showFilters = () => {
  const fragment = document.createDocumentFragment();
  const parser = new DOMParser();

  filters.forEach((el) => {
    const filterElementString = getFilterElement(el);
    const filterElementObj = parser.parseFromString(filterElementString, `text/html`);
    const childNodes = filterElementObj.body.childNodes;
    childNodes.forEach((elem) => fragment.appendChild(elem));
  });
  filtersNode.insertBefore(fragment, filtersNode.firstChild);
};
