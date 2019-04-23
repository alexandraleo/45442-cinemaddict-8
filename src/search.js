import Component from './component';

export default class Search extends Component {
  constructor() {
    super();

    this._onSearchButtonPress = this._onSearchButtonPress.bind(this);
    this._onSearchInput = this._onSearchInput.bind(this);
    this._onDocumentFocus = this._onDocumentFocus.bind(this);
  }

  _onSearchInput() {
    if (this._searchInput.value) {
      this._searchButton.classList.remove(`visually-hidden`);
    } else {
      this._searchButton.classList.add(`visually-hidden`);
    }
    // return typeof this._onSearch === `function` && this._onSearch();
  }

  _onSearchButtonPress(evt) {
    evt.preventDefault();
    this._onSearch(this._searchInput.value);
    document.addEventListener(`focus`, this._onDocumentFocus);
  }

  _onDocumentFocus(evt) {
    if(evt.currentTarget.blur) {
      this._searchInput.value = ``;
      this._searchButton.classList.add(`visually-hidden`);
      document.removeEventListener(`focus`, this._onDocumentFocus);
    }
  }

  set osSearch(fn) {
    this._onSearch = fn;
  }

  bind() {
    this._searchInput = this._element.querySelector(`.search__field`);
    this._searchButton = this._element.querySelector(`button`);
    this._searchInput.addEventListener(`input`, this._onSearchInput);
    this._searchButton.addEventListener(`click`, this._onSearchButtonPress);
  }

  unbind() {
    this._searchInput.removeEventListener(`input`, this._onSearchInput);
    this._searchButton.removeEventListener(`click`, this._onSearchButtonPress);

  }

  get template() {
    return `<form class="header__search search">
      <input type="text" name="search" class="search__field" placeholder="Search">
      <button type="submit" class="visually-hidden">Search</button>
    </form>`.trim();
  }
}
