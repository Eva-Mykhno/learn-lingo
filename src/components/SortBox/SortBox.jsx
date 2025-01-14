import SortLanguages from "./SortLanguages/SortLanguages";
import SortLevels from "./SortLevels/SortLevels";
import SortPrice from "./SortPrice/SortPrice";
import s from "./SortBox.module.css";

const SortBox = () => {
  return (
    <section className={s.sort}>
      <SortLanguages />
      <SortLevels />
      <SortPrice />
    </section>
  );
};

export default SortBox;
