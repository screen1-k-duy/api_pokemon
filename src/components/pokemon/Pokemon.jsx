import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import CardPokemon from "./CardPokemon";
let i = 0;
const Pokemon = () => {
  const [pokemons, setPokemons] = useState([]);
  const [current, setCurrent] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "https://pokeapi.co/api/v2/pokemon?limit=18"
        );
        console.log("res", res);
        setPokemons(res.data.results);
      } catch (err) {
        console.error(`Error: ${err}`);
      }
    };

    fetchData();
  }, []);
  //   console.log("Pokemon", i++);
  console.log("sdfsdf", pokemons);

  console.log("current current", current);
  return (
    <>
      <div className="relative">
        <div className="container mx-auto">
          <div className="text-red-500 text-xl text-center">Pokemon</div>
          <ul className="grid grid-cols-6  gap-4 ">
            {pokemons.map((item, index) => (
              <Fragment key={index}>
                <CardPokemon
                  id={index}
                  setCurrent={setCurrent}
                  current={current}
                />
              </Fragment>
            ))}
          </ul>
        </div>
        {current.length >= 2 && (
          <ul className=" absolute top-0 left-0 right-0 bottom-0 bg-slate-500/80 flex justify-center items-center gap-x-4">
            {current.map((item, index) => (
              <>
                <li
                  key={item.id}
                  className="p-6 bg-yellow-100 rounded-[10px] w-[300px] h-[400px]  flex justify-center items-center"
                >
                  <div className="flex justify-center flex-col items-center">
                    <h3 className="font-bold capitalize">{item.name}</h3>
                    <img
                      className="animate-[bounce_2s_ease-in-out]"
                      src={item.sprites?.other.home.front_shiny}
                      alt={item.name}
                    />
                    <div className="flex space-x-2">
                      {item.types?.map((type, index) => (
                        <p key={index}>{type.type.name}</p>
                      ))}
                    </div>
                  </div>
                </li>
                {index === 0 && <img src="src/assets/vs.png" alt="" className="h-[80%] animate-[ping_3s_ease-in-out_infinite]" />}
              </>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default Pokemon;
