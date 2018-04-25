import { Recipe, Ingredient } from "./api";

console.log(JSON.stringify(randomArray(10, 20).map(randomRecipe)));

function randomRecipe(): Recipe {
  return {
    id: randomID().toString(),
    name: randomWord(),
    totalTime: `${(10 * Math.random()).toFixed(2)} hours`,
    directions: randomParagraph(),
    ingredients: randomArray(1, 5).map(randomIngredient),
    servings: randomInteger(4, 6),
    images: randomArray(0, 2).map(randomImage),
    author: randomWord(),
    lastEdited: randomDate(),
    datePublished: randomDate(),
  };
}

function randomIngredient(): Ingredient {
  return {
    name: randomWord(),
    measurement: randomWord(),
    amount: randomInteger(1, 10),
    images: randomArray(0, 1).map(randomImage),
  };
}

function randomImage() {
  return "http://38.media.tumblr.com/avatar_b0498610c6b6_128.png";
}

function randomID() {
  return randomInteger(100000, 999999);
}

function randomInteger(a = 0, b = 100) {
  return Math.floor(Math.random() * (b + 1 - a) + a);
}

function randomDate() {
  return new Date().toJSON();
}

function randomArray(a = 0, b = 10) {
  const n = randomInteger(a, b);
  const arr = new Array(n);
  if (n === 0) {
    return [];
  }
  for (let i = 0; i < n; i++) {
    arr[i] = null;
  }
  return arr;
}

function randomParagraph() {
  return randomArray(2, 4)
    .map(randomSentance)
    .join(" ");
}

function randomSentance() {
  return (
    randomArray(3, 8)
      .map(randomWord)
      .join(" ") + "."
  );
}

function randomWord() {
  return randomArray(2, 6)
    .map(randomCharacter)
    .join("");
}

function randomCharacter() {
  const a = "a".charCodeAt(0);
  return String.fromCharCode(randomInteger(a, a + 25));
}
