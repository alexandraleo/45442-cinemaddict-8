import Component from './component';

export default class Search extends Component {
  constructor() {
    super();

    this._onSearchInput = this._onSearchInput.bind(this);
  }

  _onSearchInput() {
    return typeof this._onSearch === `function` && this._onSearch();
  }

  set osSearch(fn) {
    this._onSearch = fn;
  }

  get template() {
    return `<input type="text" name="search" class="search__field" placeholder="Search">
    <button type="submit" class="visually-hidden">Search</button>`.trim();
  }

  bind() {
    this._element.addEventListener(`input`, this._onSearchInput);
  }

  unbind() {
    this._element.removeEventListener(`input`, this._onSearchInput);
  }
}
