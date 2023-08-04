import "./styles/style.scss";
import { Pokemon } from "./data/types";
import { pokemonArray } from "./data/pokemon";
import confetti, { Options } from "canvas-confetti";

const cardContainer = document.querySelector(".card-container") as HTMLElement;
const button = document.querySelector<HTMLButtonElement>(".button");
const inputName = document.querySelector("#filter");
const inputNumber = document.querySelector("#filterNumber");
const inputType = document.querySelector("#filterType");

if (!button || !cardContainer) {
  throw new Error("Issue with Button");
}

if (!inputName || !inputNumber || !inputType) {
  throw new Error("issue with input");
}

// Capitalise the names in the function
const capitalizeName = (name: string): string => {
  return name.charAt(0).toUpperCase() + name.slice(1);
};

// Pokemon coloured confetti for fun
const pokemonConfetti: Options = {
  gravity: 0.8,
  spread: 360,
  angle: 90,
  drift: 3,
  scalar: 0.7,
  ticks: 200,
  particleCount: 200,
  colors: ["#FF0000", "#CC0000", "#3B4CCA", "#FFDE00", "#B3A125"],
};

// General function for printing an array of pokemon
const printPokemon = (array: Pokemon[]) => {
  array.forEach((pokemon: Pokemon) => {
    const name = capitalizeName(pokemon.name);

    const type = pokemon.types.join(" & ");
    const template = `<div class="card">
        <main class="card-container">
        <div class="card">
          <div class="card__content">
            <img class="card__image" src="${pokemon.sprite}">
            <h2 class="card__heading">Name: ${name}</h2>
            <p class="card__content">${name} (#${pokemon.id}) is a ${type} pokemon</p>
          </div>
        </div>`;
    cardContainer.innerHTML += template;
  });
};

// Find the Pokemon by name
const handleFilterName = (event: Event) => {
  const filter = (event.currentTarget as HTMLInputElement).value.toLowerCase();
  const filteredPokemons = pokemonArray.filter((pokemon) => {
    return pokemon.name.toLowerCase().includes(filter);
  });

  cardContainer.innerHTML = "";

  printPokemon(filteredPokemons);
};

// Filter Pokemon by range -- has to work in the format "x - y"
const handleFilterNumber = (event: Event) => {
  const filter = (event.currentTarget as HTMLInputElement).value;
  const filterNumbers: number[] = filter
    .split("-")
    .map((id) => parseInt(id.trim()));

  const filteredArray = pokemonArray.filter((pokemon: Pokemon) => {
    const pokemonId = pokemon.id;
    return pokemonId >= filterNumbers[0] && pokemonId <= filterNumbers[1];
  });
  cardContainer.innerHTML = "";
  printPokemon(filteredArray);
};

// Filter Pokemon by type
const handleFilterType = (event: Event) => {
  const filter = (event.currentTarget as HTMLInputElement).value;
  const filteredPokemons = pokemonArray.filter((pokemon: Pokemon) => {
    return pokemon.types.includes(filter);
  });
  cardContainer.innerHTML = "";
  printPokemon(filteredPokemons);
};

// Release all the pokemon
const handleButtonPress = () => {
  printPokemon(pokemonArray);
  confetti(pokemonConfetti);
};

// EVENT LISTENERS
button.addEventListener("click", handleButtonPress);
inputName.addEventListener("input", handleFilterName);
inputNumber.addEventListener("input", handleFilterNumber);
inputType.addEventListener("input", handleFilterType);
