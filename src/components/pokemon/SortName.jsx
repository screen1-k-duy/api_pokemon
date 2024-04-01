import { FaSortAlphaDown } from "react-icons/fa";

const SortName = ({ onSortName }) => {
  return (
    <>
      <button onClick={onSortName}>
        <FaSortAlphaDown />
      </button>
    </>
  );
};

export default SortName;
