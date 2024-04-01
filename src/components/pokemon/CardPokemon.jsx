import axios from "axios";
import { useEffect, useState } from "react";
let i = 0;

const CardPokemon = ({ id, name, setCurrent, current, pokemons }) => {
  const [pokemon, setPokemon] = useState({});
  useEffect(() => {
    // console.log("voo card");

    async function getPokemon() {
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${id}`
        );
        const data = response.data;
        // console.log("data", data);
        setPokemon(data);
        return data;
      } catch (error) {
        console.error(error);
      }
    }
    getPokemon();
  }, [pokemons]);

  const currentClick = () => {
    if (current.length < 2) {
      const arr = [];
      arr.push(pokemon);
      setCurrent([...current, ...arr]);
    }
  };

  return (
    <li
      key={pokemon.id}
      className="p-6 bg-yellow-100 rounded-[10px] cursor-pointer "
      onClick={() => currentClick()}
    >
      <div className="flex justify-center flex-col items-center">
        <h3 className="font-bold capitalize">{pokemon.name}</h3>
        <img
          src={pokemon.sprites?.other.home.front_default}
          alt={pokemon.name}
        />
        <div className="flex space-x-2">
          {pokemon.types?.map((type, index) => (
            <p key={index}>{type.type.name}</p>
          ))}
        </div>
      </div>
    </li>
  );
};

export default CardPokemon;
