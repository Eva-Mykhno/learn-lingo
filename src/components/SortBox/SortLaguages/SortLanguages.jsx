import { useDispatch } from "react-redux";
import { setFilter } from "../../../redux/teachers/slice";
import s from "./SortLanguages.module.css";

const SortLanguages = () => {
  const dispatch = useDispatch();

  const handleLanguageChange = (event) => {
    dispatch(setFilter({ filterName: "language", value: event.target.value }));
  };
  const languages = [
    "English",
    "Spanish",
    "Mandarin Chinese",
    "French",
    "German",
    "Italian",
    "Korean",
    "Vietnamese",
  ];
  return (
    <label className={s.wrapper}>
      <span className={s.label}>Languages</span>
      <select onChange={handleLanguageChange} className={s.option}>
        {/* <option value="">All Languages</option> */}
        {languages.map((language) => (
          <option key={language} value={language}>
            {language}
          </option>
        ))}
      </select>
    </label>
  );
};

export default SortLanguages;
