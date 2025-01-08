import clsx from "clsx";
import s from "./LanguageLevels.module.css";

const LanguageLevels = ({
  teacherId,
  levels,
  selectedLevel,
  onLevelChange,
}) => {
  return (
    <ul className={s.levelList}>
      {levels.map((level, index) => (
        <li
          key={index}
          className={clsx(
            s.levelItem,
            selectedLevel === level ? s.selected : s.unselected
          )}
          onClick={() => onLevelChange(teacherId, level)}>
          <input
            type="radio"
            name={`level-${teacherId}`}
            value={level}
            checked={selectedLevel === level}
            onChange={() => onLevelChange(teacherId, level)}
            className={s.radioHidden}
          />
          <label className={s.radioLabel}>{level}</label>
        </li>
      ))}
    </ul>
  );
};

export default LanguageLevels;
