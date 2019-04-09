import Component from './component';

export default class Filter extends Component {
  constructor(filterData) {
    super();
    this._filterName = filterData.filterName;
    this._href = filterData.href;
    this._quantity = filterData.quantity;
    this._isActive = filterData.isActive;
    this._onFilterClick = this._onFilterClick.bind(this);
  }
  set onFilter(fn) {
    this._onFilter = fn;
  }

  _onFilterClick() {
    return typeof this._onFilter === `function` && this._onFilter();
  }

  get template() {
    return `<a href="#${this._href}" class="main-navigation__item ${this._isActive ? `main-navigation__item--active` : ``}">${this._filterName} <span class="main-navigation__item-count">${this._quantity}</span></a>`;

  }
  bind() {
    this._element.addEventListener(`click`, this._onFilterClick);
  }

  unbind() {
    this._element.removeEventListener(`click`, this._onFilterClick);
  }
}

