import { useDispatch } from "react-redux";
import { setFilter } from "../../../redux/teachers/slice";
import s from "./SortLevels.module.css";

const SortLevels = () => {
  const dispatch = useDispatch();

  const handleLevelChange = (event) => {
    dispatch(setFilter({ filterName: "level", value: event.target.value }));
  };
  const levels = [
    "A1 Beginner",
    "A2 Elementary",
    "B1 Intermediate",
    "B2 Upper-Intermediate",
    "C1 Advanced",
    "C2 Proficient",
  ];
  return (
    <div className={s.wrapper}>
      <label className={s.label}>
        <select onChange={handleLevelChange}>
          {levels.map((level) => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};

export default SortLevels;
