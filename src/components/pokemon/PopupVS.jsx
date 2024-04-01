import { Fragment } from "react";
import { IoMdCloseCircle } from "react-icons/io";

const PopupVS = ({ current, setCurrent }) => {
  return (
    <>
      {current.length >= 2 && (
        <div>
          <ul className=" absolute top-0 left-0 right-0 bottom-0 bg-slate-500/80 flex justify-center items-center gap-x-4">
            {current.map((item, index) => (
              <Fragment key={item.id}>
                <li className="p-6 bg-yellow-100 rounded-[10px] w-[300px] h-[400px]  flex justify-center items-center">
                  <div className="flex justify-center flex-col items-center">
                    <h3 className="font-bold capitalize">{item.name}</h3>
                    <img
                      className="animate-[bounce_2s_ease-in-out]"
                      src={item.sprites?.other.showdown.front_shiny}
                      alt={item.name}
                    />
                    <div className="flex space-x-2">
                      {item.types?.map((type, index) => (
                        <p key={index}>{type.type.name}</p>
                      ))}
                    </div>
                  </div>
                </li>
                {index === 0 && (
                  <img
                    src="src/assets/vs.png"
                    alt=""
                    className="h-[80%] animate-[ping_3s_ease-in-out_infinite]"
                  />
                )}
              </Fragment>
            ))}
          </ul>
          <div
            className="absolute top-11 right-11 cursor-pointer z-50 text-[40px]"
            onClick={() => setCurrent([])}
          >
            <IoMdCloseCircle />
          </div>
        </div>
      )}
    </>
  );
};

export default PopupVS;
