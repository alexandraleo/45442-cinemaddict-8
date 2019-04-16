import {default as getRandomNumber} from '../../ToDo/src/utils.js';

const anyDescription = () => {
  const filmDescription = `Lorem ipsum dolor sit amet, consectetur adipiscing elit.Cras aliquet varius magna,
// non porta ligula feugiat eget.Fusce tristique felis at fermentum pharetra.Aliquam id orci ut lectus varius viverra.Nullam nunc ex,
// convallis sed finibus eget, sollicitudin eget ante.Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.Sed blandit,
// eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.Sed sed nisi sed augue convallis suscipit in sed felis.Aliquam
// erat volutpat.Nunc fermentum tortor ac porta dapibus.In rutrum ac purus sit amet tempus.`;
  const descriptionArray = filmDescription.split(`.`);
  return descriptionArray[getRandomNumber(0, descriptionArray.length - 1)];
};

// this._comments = data.comments;

export const templateCard = () => ({
  filmTitle: [
    `Roman Holiday`,
    `How to Steal a Million`,
    `The Children's Hour`,
    `Breakfast at Tiffany's`,
    `The Green Mile`,
    `Forrest Gump`,
    `The Shawshank Redemption`,
    `Schindler's List`,
    `Léon`,
    `The Lion King`,
    `Fight Club`,
    `La vita è bella`,
    `Knockin' on Heaven's Door`,
    `The Godfather`,
    `The Prestige`
  ][getRandomNumber(0, 14)],
  originalTitle: templateCard.filmTitle,
  director: [
    `Peter Jackson`,
    `Martin Scorsese`,
    `Steven Spielberg`,
    `David Fincher`,
    `David Lynch`,
    `Tim Burton`,
    `Milos Forman`,
    `James Cameron`,
    `Ridley Scott`,
    `Freddie Francis`,
    `Marek Piestrak`,
    `Christopher Nolan`,
    `Danny Boyle`,
    `Francis Ford Coppola`,
    `George Miller`,
    `Stanley Kubrick`,
    `David Cronenberg`,
  ][getRandomNumber(0, 16)],
  writers: [
    `Christopher Nolan`,
    `Luc Besson`,
    `John Hughes`,
    `Martin Scorsese`,
    `Stephen King`,
    `Guy Ritchie`,
    `Danny Boyle`,
    `Quentin Tarantino`,
  ][getRandomNumber(0, 7)],
  actors: [`Stephen Graham`, `Jamie Bell`, `Sam Worthington`,
    `Tim Robbins`, `Zach Galifianakis`, `Ed Helms`,
    `Bradley Cooper`, `Pierce Brosnan`, `Samuel L. Jackson`,
    `Uma Thurman`, `Hilary Swank`,
    `Amanda Bynes`, `Mila Kunis`, `Emma Stone`,
    `Kate Bosworth`, `Penélope Cruz`, `Sandra Bullock`, `Zooey Deschane`].slice(0, getRandomNumber(2, 5)),
  poster: [
    `accused`,
    `blackmail`,
    `blue-blazes`,
    `fuga-da-new-york`,
    `moonrise`,
    `three-friends`
  ][getRandomNumber(0, 5)],
  rating: getRandomNumber(1, 9),
  userRating: getRandomNumber(1, 9),
  releaseDate: getRandomNumber(1920, 2020),
  country: [`USA`, `Russian Federation`, `Canada`, `France`, `Greate Britain`, `USSR`][getRandomNumber(0, 5)],
  duration: getRandomNumber(60, 180),
  genres: [`comedy`, `thriller`, `fantasy`, `sci-fi`, `documental`, `parody`, `drama`, `melodrama`].slice(0, getRandomNumber(2, 5)),
  description: anyDescription(),
  comments: new Array(getRandomNumber(1, 5)).fill().map(() => ({
    emoji: [`sleeping`, `neutral-face`, `grinning`][getRandomNumber(0, 2)],
    text: anyDescription(),
    author: [`Stephen Graham`, `Jamie Bell`, `Sam Worthington`,
      `Tim Robbins`, `Zach Galifianakis`, `Ed Helms`,
      `Bradley Cooper`, `Pierce Brosnan`][getRandomNumber(0, 7)],
    publishDate: Date.now() + 1 + Math.floor(Math.random() * 7) * 24 * 60 * 60 * 1000,
    length: getRandomNumber(1, 5),
  })),
  age: [`0+`, `6+`, `12+`, `16+`, `18+`][getRandomNumber(0, 4)],
  isWatched: getRandomNumber(0, 1) === 0,
  isFavorites: getRandomNumber(0, 1) === 0,
  isInWatchlist: getRandomNumber(0, 1) === 0,
  // isControl: false,

});

export const filters = [
  {filterName: `All movies`, href: `#`, quantity: getRandomNumber(0, 15), isActive: true},
  {filterName: `Watchlist`, href: `#`, quantity: getRandomNumber(0, 15)},
  {filterName: `History`, href: `#`, quantity: getRandomNumber(0, 15)},
  {filterName: `Favorites`, href: `#`, quantity: getRandomNumber(0, 15)},
];

export const Emoji = {
  'sleeping': `😴`,
  'neutral-face': `😐`,
  'grinning': `😀`,
};
