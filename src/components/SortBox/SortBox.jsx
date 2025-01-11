import SortLanguages from "./SortLaguages/SortLanguages";
import SortLevels from "./SortLevels/SortLevels";
import SortPrice from "./SortPrice/SortPrise";

const SortBox = () => {
  return (
    <div>
      <SortLanguages />
      <SortLevels />
      <SortPrice />
    </div>
  );
};

export default SortBox;
