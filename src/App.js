import { useState } from "react";
import Axios from "axios";
import "./App.css";

function App() {
  const [pokemonName, setPokemonName] = useState("");
  const [pokemonChosen, setPokemonChosen] = useState(false);
  const [pokemon, setPokemon] = useState({
    name: "",
    species: "",
    img: "",
    hp: "",
    attack: "",
    defense: "",
    types: "",
    weight: "",
  });

  const searchPokemon = () => {
    Axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`).then(
      (response) => {
        setPokemon({
          name: pokemonName,
          species: response.data.species.name,
          img: response.data.sprites.front_default,
          hp: response.data.stats[0].base_stat,
          attack: response.data.stats[1].base_stat,
          defense: response.data.stats[2].base_stat,
          type: response.data.types[0].type.name,
          weight: response.data.weight,
        });
        setPokemonChosen(true);
      }
    );
  };
  return (
    <div className="App bg-lime-300">

      {/* search bar starts */}
      <div className="searchbar mt-4">
        <h2 className="font-medium leading-tight text-4xl mt-0 mb-6 font-mono">
          Pokemon App
        </h2>
        <div className="flex justify-center">
          <div className="mb-3 xl:w-96">
            <input
              type="search" onChange={(event) => {
                setPokemonName(event.target.value);
              }}
              className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding
        border border-solid border-gray-300 rounded transition ease-in-out m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="exampleSearch"
              placeholder="Search Pokemon Name"
            />
          </div>
        </div>
      </div>
      <div className="flex space-x-2 justify-center">
        <div>
          <button
            type="button" onClick={searchPokemon}
            className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase 
            rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg 
            focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
          >
            Search
          </button>
        </div>
      </div>
      {/* search bar end */}

     
      {/* card start here */}
      <div className="flex justify-center mt-16">
      {!pokemonChosen ? (
          <h1>Please choose a Pokemon</h1>
        ) : (
          <>
        <div className="max-w-sm rounded overflow-hidden shadow-lg w-96">
        <h1 className="font-extrabold font-mono pb-2 text-green-500 bg-green-100 text-3xl">
          {pokemon.name}
        </h1>
        <div className="bg-green-400">
          <img className=" w-84 h-56  ml-20 bg-green-400" src={pokemon.img} />
          </div>
          <div className="px-6 py-2 bg-green-400">
            <div className="font-normal text-xl mb-2 bg-white rounded-2xl">
              Species: {pokemon.species}
            </div>
            <div className="font-normal text-xl mb-2 bg-white rounded-2xl">
              Type: {pokemon.type}
            </div>
            <div className="font-normal text-xl mb-2 bg-white rounded-2xl">
              Hp: {pokemon.hp}
            </div>
            <div className="font-normal text-xl mb-2 bg-white rounded-2xl">
              Defense: {pokemon.defense}
            </div>
            <div className="font-normal text-xl mb-2 bg-white rounded-2xl">
              Attack: {pokemon.attack}
            </div>
            <div className="font-normal text-xl mb-2 bg-white rounded-2xl">
              Weight: {pokemon.weight} kg
            </div>
          </div>
        </div>
        </>
        )}
      </div>
      {/* card end here */}



    </div>
  );
}

export default App;
