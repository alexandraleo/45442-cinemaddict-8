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
  poster: [
    `accused`,
    `blackmail`,
    `blue-blazes`,
    `fuga-da-new-york`,
    `moonrise`,
    `three-friends`
  ][getRandomNumber(0, 5)],
  rating: getRandomNumber(0, 10),
  year: getRandomNumber(1920, 2020),
  duration: [`1h 30min`, `2h 30 min`, `3h`][getRandomNumber(0, 2)],
  genre: [`comedy`, `thriller`, `fantasy`, `sci-fi`, `documental`, `parody`, `drama`, `melodrama`][getRandomNumber(0, 7)],
  description: anyDescription(),
  comments: getRandomNumber(0, 25),
});
