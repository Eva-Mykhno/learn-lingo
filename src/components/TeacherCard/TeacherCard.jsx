import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";
import LanguageLevels from "../LanguageLevels/LanguageLevels.jsx";
import TeacherDetails from "../TeacherDetails/TeacherDetails.jsx";
import { saveFavorites } from "../../redux/favorites/operations.js";
import { addFavorites, deleteFavorites } from "../../redux/favorites/slice.js";
import { selectIsAuthenticated, selectUser } from "../../redux/auth/selectors";
import { selectFavorites } from "../../redux/favorites/selectors";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import s from "./TeacherCard.module.css";


const sprite = "/sprite.svg";

const TeacherCard = ({ teacher }) => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const favorites = useSelector(selectFavorites);
  const [expandedTeacherId, setExpandedTeacherId] = useState(null);
  const [selectedLevels, setSelectedLevels] = useState({});
  const handleLevelChange = (teacherId, level) => {
    setSelectedLevels((prev) => ({
      ...prev,
      [teacherId]: level,
    }));
  };

  const user = useSelector(selectUser);
  const isFavorite = favorites.some(
    (fav) => fav.name === teacher.name && fav.surname === teacher.surname
  );

  const handleToggleDetails = (id) => {
    setExpandedTeacherId((prev) => (prev === id ? null : id));
  };

  const handleFavoriteClick = () => {
    if (!isAuthenticated) {
      iziToast.show({
        title: "Error!",
        message: "This feature is available only to authorized users!",
        position: "center",
        color: "red",
        timeout: 4000,
      });
      return;
    }

    if (isFavorite) {
      dispatch(deleteFavorites(teacher));
      dispatch(
        saveFavorites(
          user.uid,
          favorites.filter((fav) => fav !== teacher)
        )
      );
    } else {
      dispatch(addFavorites(teacher));
      dispatch(saveFavorites(user.uid, [...favorites, teacher]));
    }
  };

  const selectedLevel = selectedLevels[teacher.id] || teacher.levels[0];

  return (
    <div className={s.teacher}>
      <img src={teacher.avatar_url} alt={teacher.name} className={s.img} />
      <div className={s.wrapper}>
        <div className={s.headerItem}>
          <p className={s.subtitle}>Languages</p>
          <div className={s.wrap}>
            <div className={s.iconWithText}>
              <svg className={s.book} width="16" height="16">
                <use href={`${sprite}#icon-book-open`} />
              </svg>
              <span className={s.spanText}>Lessons online</span>
            </div>
            <div className={s.iconWithText}>
              <span className={s.spanText}>Lessons done:</span>
              <span className={s.spanText}>{teacher.lessons_done}</span>
            </div>
            <div className={s.iconWithText}>
              <svg className={s.star} height="16" width="16">
                <use href={`${sprite}#icon-star`} />
              </svg>
              <span className={s.spanText}>{teacher.rating}</span>
            </div>
            <div className={s.iconWithText}>
              <span className={s.spanText}>Price / 1 hour:</span>
              <span className={s.price}>{teacher.price_per_hour}$</span>
            </div>
          </div>
          <svg
            className={clsx(s.heart, {
              [s.isFavorite]: isFavorite,
            })}
            height="26"
            width="26"
            onClick={handleFavoriteClick}>
            <use href={`${sprite}#icon-heart`} />
          </svg>
        </div>
        <h3 className={s.title}>
          {teacher.name} {teacher.surname}
        </h3>
        <div className={s.wrapText}>
          <p className={s.info}>
            Speaks:{" "}
            <span className={s.textLang}>{teacher.languages.join(", ")}</span>
          </p>
          <p className={s.info}>
            Lesson Info: <span className={s.text}>{teacher.lesson_info}</span>
          </p>
          <p className={s.info}>
            Conditions: <span className={s.text}>{teacher.conditions}</span>
          </p>
        </div>

        {expandedTeacherId !== teacher.id && (
          <button
            type="button"
            onClick={() => handleToggleDetails(teacher.id)}
            className={s.read}>
            Read More
          </button>
        )}

        {expandedTeacherId === teacher.id && (
          <TeacherDetails
            teacher={teacher}
            selectedLevel={selectedLevel}
            onLevelChange={handleLevelChange}
          />
        )}

        {expandedTeacherId !== teacher.id && (
          <LanguageLevels
            teacherId={teacher.id}
            levels={teacher.levels}
            selectedLevel={selectedLevel}
            onLevelChange={handleLevelChange}
          />
        )}
      </div>
    </div>
  );
};

export default TeacherCard;
