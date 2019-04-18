import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import Component from './component.js';

export default class Statistics extends Component {
  constructor(filmArray) {
    super();
    this._watchedFilms = filmArray.filter((it) => it.isWatched);
    this._onStatisticsClick = this._onStatisticsClick.bind(this);
  }
  get template() {
    return `<section class="statistic visually-hidden">
    <p class="statistic__rank">Your rank: <span class="statistic__rank-label">${this._giveRank()}</span></p>

    <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters visually-hidden">
      <p class="statistic__filters-description">Show stats:</p>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-all-time"
        value="all-time" checked>
      <label for="statistic-all-time" class="statistic__filters-label">All time</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-today"
        value="today">
      <label for="statistic-today" class="statistic__filters-label">Today</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-week"
        value="week">
      <label for="statistic-week" class="statistic__filters-label">Week</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-month"
        value="month">
      <label for="statistic-month" class="statistic__filters-label">Month</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-year"
        value="year">
      <label for="statistic-year" class="statistic__filters-label">Year</label>
    </form>

    <ul class="statistic__text-list">
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">You watched</h4>
        <p class="statistic__item-text">${this._watchedFilms.length}<span class="statistic__item-description">movie${this._watchedFilms.length <= 1 ? `` : `s`}</span></p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Total duration</h4>
        <p class="statistic__item-text">${Math.floor(this._totalDuration() / 60)}<span class="statistic__item-description">h</span> ${this._totalDuration() % 60} <span
            class="statistic__item-description">m</span></p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Top genre</h4>
        <p class="statistic__item-text">${this._genresRange()[0][0]}</p>
      </li>
    </ul>

    <div class="statistic__chart-wrap">
      <canvas class="statistic__chart" width="1000"></canvas>
    </div>

  </section>`.trim();
  }
  set onStatistics(fn) {
    this._onStatistics = fn;
  }

  _totalDuration() {
    return this._watchedFilms.reduce((acc, item) => acc + item.duration, 0);
  }

  _onStatisticsClick() {
    return typeof this._onStatisticsClick === `function` && this._onStatisticsClick();
  }
  _genresRange() {
    const genres = {};
    for (let film of this._watchedFilms) {
      for (let genre of film.genres) {
        if (genres[genre] === undefined) {
          genres[genre] = 1;
        } else {
          genres[genre] += 1;
        }
      }
    }
    const sortedGenres = Object.entries(genres).sort((a, b) => {
      return b[1] - a[1];
    });
    const arrayOfKeys = [];
    const arrayOfValues = [];
    sortedGenres.forEach((item) => {
      arrayOfKeys.push(item[0]);
      arrayOfValues.push(item[1]);
    });
    return sortedGenres;
  }

  _giveRank() {
    if (this._watchedFilms.length >= 0 && this._watchedFilms.length <= 10) {
      return `novice`;
    } else if (this._watchedFilms.length > 10 && this._watchedFilms.length <= 20) {
      return `fan`;
    } else {
      return `movie buff`;
    }
  }

  showStatistics() {
    const sortedGenres = this._genresRange();
    const statisticCtx = document.querySelector(`.statistic__chart`);
    const BAR_HEIGHT = 50;
    statisticCtx.height = BAR_HEIGHT * sortedGenres.length;
    const myChart = new Chart(statisticCtx, {
      plugins: [ChartDataLabels],
      type: `horizontalBar`,
      data: {
        labels: sortedGenres.map((it) => it[0]),
        datasets: [{
          data: sortedGenres.map((it) => it[1]),
          backgroundColor: `#ffe800`,
          hoverBackgroundColor: `#ffe800`,
          anchor: `start`
        }]
      },
      options: {
        plugins: {
          datalabels: {
            font: {
              size: 20
            },
            color: `#ffffff`,
            anchor: `start`,
            align: `start`,
            offset: 40,
          }
        },
        scales: {
          yAxes: [{
            ticks: {
              fontColor: `#ffffff`,
              padding: 100,
              fontSize: 20
            },
            gridLines: {
              display: false,
              drawBorder: false
            },
            barThickness: 24
          }],
          xAxes: [{
            ticks: {
              display: false,
              beginAtZero: true
            },
            gridLines: {
              display: false,
              drawBorder: false
            },
          }],
        },
        legend: {
          display: false
        },
        tooltips: {
          enabled: false
        }
      }
    });
    return myChart;
  }
  update(filmArray) {
    this._towatched = filmArray.filter((it) => it.towatched === true);
    this._totalDuration = this._totalDuration = this._towatched.reduce((acc, item) => acc + item.duration, 0);
    const genreMap = {};
    for (let film of this._towatched) {
      for (let genre of film.genre) {
        if (genreMap[genre] === undefined) {
          genreMap[genre] = 1;
        } else {
          genreMap[genre] += 1;
        }
      }
    }
    const arrGenreMap = Object.entries(genreMap);
    const newArr = arrGenreMap.sort((a, b) => {
      return b[1] - a[1];
    });
    const arrayOfKeys = [];
    const arrayOfValues = [];
    newArr.forEach((item) => {
      arrayOfKeys.push(item[0]);
      arrayOfValues.push(item[1]);
    });
  }
}
