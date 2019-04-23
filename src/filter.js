import Component from './component';
import createElement from './create-element';

export default class Filter extends Component {
  constructor(filterData) {
    super();
    this._filterName = filterData.filterName;
    this._href = filterData.href;
    this._quantity = filterData.quantity;
    this._onFilterClick = this._onFilterClick.bind(this);
  }
  set onFilter(fn) {
    this._onFilter = fn;
  }

  _onFilterClick() {
    const activeFilter = document.querySelector(`.main-navigation__item--active`);
    if (activeFilter) {
      this._isActive = false;
      activeFilter.classList.remove(`main-navigation__item--active`);
    }

    this._isActive = !this._isActive;
    this.unbind();
    this._activeFilterUpdate();
    this.bind();
    return typeof this._onFilter === `function` && this._onFilter();
  }

  _activeFilterUpdate() {
    this._tempElement = this._element;
    this._element = createElement(this.template);
    this._tempElement.parentNode.replaceChild(this._element, this._tempElement);
    this._tempElement = null;
  }

  bind() {
    this._element.addEventListener(`click`, this._onFilterClick);
  }

  unbind() {
    this._element.removeEventListener(`click`, this._onFilterClick);
  }

  update(newQuantity) {
    this._quantity = newQuantity;
  }

  get template() {
    return `<a href="#${this._href}" class="main-navigation__item
    ${this._isActive || this._filterName === `All movies` ? `main-navigation__item--active` : ``} ${this._filterName === `Stats` ? `main-navigation__item--additional` : ``}">${this._filterName}
    ${this._filterName === `Stats` || this._filterName === `All movies` ? `` : `<span class="main-navigation__item-count">${this._quantity}</span>`}</a >`;
  }
}

