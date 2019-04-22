import Component from './component';

export class Search extends Component {
	constructor() {
		super();

		this._onSearch = this._onSearch.bind(this);
	}

	_onSearch() {
		typeof this._onSearch === `function` && this._onSearch();
	}

	set osSearch(fn) {
		this._onSearch = fn;
	}

	get template() {
		`<input type="text" name="search" class="search__field" placeholder="Search">
    <button type="submit" class="visually-hidden">Search</button>`.trim();
	}

	bind() {
		this._element.addEventListener(`input`, this._onSearch);
	}

	unbind() {
		this._element.removeEventListener(`input`, this._onSearch);
	}
}