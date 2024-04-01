import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import CardPokemon from "./CardPokemon";
import InputSearch from "./InputSearch";
import PopupVS from "./PopupVS";
import SortName from "./SortName";

let i = 0;
// const typePokemon = [
//   "bug",
//   "poison",
//   "normal",
//   "water",
//   "flying",
//   "fire",
//   "grass",
// ];
const Pokemon = ({ itemsPerPage }) => {
  const [pokemons, setPokemons] = useState([]);
  const [current, setCurrent] = useState([]);
  const [limit, setLimit] = useState(18);
  const [search, setSearch] = useState("");

  const [page, setPage] = useState(0);
  const [countPage, setCountPage] = useState(0);
  const pageCount = Math.ceil(countPage / itemsPerPage);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${
            page * limit
          }`
        );
        // console.log("res", res);

        setPokemons(res.data.results);
      } catch (err) {
        console.error(`Error: ${err}`);
      }
    };

    fetchData();
  }, [limit, page]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("https://pokeapi.co/api/v2/pokemon/");
        setCountPage(res.data.count);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  // const handleClickMore = () => {
  //   setPage(limit*page);
  // };

  const handlePageClick = (event) => {
    setPage(event.selected);
  };

  const handleSortName = () => {
    const isSorted = [...pokemons].sort(function (a, b) {
      let x = a.name.toLowerCase(),
        y = b.name.toLowerCase();
      return x < y ? -1 : x > y ? 1 : 0;
    });
    if (isSorted) {
      setPokemons(isSorted);
    }
  };
  console.log("handleSortName", pokemons);

  return (
    <>
      <div className="relative overflow-hidden">
        <div className="flex justify-center space-x-2">
          <InputSearch setSearch={setSearch} />
          <SortName onSortName={handleSortName} />
        </div>
        <div className="container mx-auto">
          <div className="text-red-500 text-xl text-center">Pokemon</div>
          <ul className="grid grid-cols-2 gap-2  md:gap-4 md:grid-cols-6">
            {pokemons
              .filter((item) => {
                return search.toLowerCase() === ""
                  ? item
                  : item.name.toLowerCase().includes(search);
              })
              .map((item, index) => {
                let pokemonId = item.url.match(/\/\d+/)[0].slice(1);
                return (
                  <Fragment key={pokemonId}>
                    <CardPokemon
                      id={pokemonId}
                      setCurrent={setCurrent}
                      // pokemons={pokemons}
                      current={current}
                      name={item.name}
                    />
                  </Fragment>
                );
              })}
          </ul>
          {/* <div className="flex justify-center py-8">
            <button
              className="px-3 py-4 bg-lime-400 rounded-sm font-bold hover:bg-red-300 "
              onClick={handleClickMore}
            >
              Learn More
            </button>
          </div> */}
          {/* <Items currentItems={currentItems} /> */}
          <ReactPaginate
            breakLabel="..."
            nextLabel="next"
            onPageChange={handlePageClick}
            pageRangeDisplayed={2}
            marginPagesDisplayed={1}
            pageCount={pageCount}
            previousLabel="previous"
            renderOnZeroPageCount={null}
            className="flex justify-center space-x-2 py-8"
            pageClassName="testpage"
            pageLinkClassName="px-3 py-4 hover:font-bold  "
            currentPage={page}
            previousClassName={page === 0 ? "hidden" : "block"}
            nextClassName={page + 1 === pageCount ? "hidden" : "block"}
            previousLinkClassName="px-3 py-4 bg-lime-400 rounded-sm font-bold hover:bg-red-300 "
            nextLinkClassName="px-3 py-4 bg-lime-400 rounded-sm font-bold hover:bg-red-300"
            activeClassName="font-bold testselec"
            prevRel="testprevRel"
            prevPageRel="testprevPageRel"
          />
        </div>
        <PopupVS current={current} setCurrent={setCurrent} />
      </div>
    </>
  );
};

export default Pokemon;
