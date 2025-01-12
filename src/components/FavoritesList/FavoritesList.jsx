import { useSelector, useDispatch } from "react-redux";
import { toggleFavorite } from "../../redux/teachers/slice";
import {
  selectError,
  selectFavorites,
  selectFavoriteTeachers,
  selectIsLoading,
} from "../../redux/teachers/selectors";
import s from "./FavoritesList.module.css";
import { useState } from "react";
import Loader from "../Loader/Loader";
import clsx from "clsx";
import TeacherDetails from "../TeacherDetails/TeacherDetails";
import LanguageLevels from "../LanguageLevels/LanguageLevels";

const sprite = "../../../public/sprite.svg";

const FavoritesList = () => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(4);
  const [expandedTeacherId, setExpandedTeacherId] = useState(null);
  const [selectedLevels, setSelectedLevels] = useState({});

  const favoriteTeachers = useSelector(selectFavoriteTeachers);
  const favorites = useSelector(selectFavorites);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  const handleLevelChange = (teacherId, level) => {
    setSelectedLevels((prev) => ({
      ...prev,
      [teacherId]: level,
    }));
  };

  const handleToggleDetails = (id) => {
    setExpandedTeacherId((prev) => (prev === id ? null : id));
  };

  const handleLoadMore = () => {
    setVisible((prev) => prev + 4);
  };

  const hasMoreTeachers = favoriteTeachers.length > visible;

  const handleFavoriteToggle = (teacherId) => {
    dispatch(toggleFavorite(teacherId));
  };

  if (favoriteTeachers.length === 0) {
    return <p className={s.empty}>No favorite teachers yet.</p>;
  }

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <section>
      <ul className={s.list}>
        {favoriteTeachers.slice(0, visible).map((teacher) => {
          const isFavorite = favorites.includes(teacher.id);
          const selectedLevel = selectedLevels[teacher.id] || teacher.levels[0];

          return (
            <li key={teacher.id} className={s.item}>
              <img
                src={teacher.avatar_url}
                alt={teacher.name}
                className={s.img}
              />
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
                    onClick={() => handleFavoriteToggle(teacher.id)}>
                    <use href={`${sprite}#icon-heart`} />
                  </svg>
                </div>
                <h3 className={s.title}>
                  {teacher.name} {teacher.surname}
                </h3>
                <div className={s.wrapText}>
                  <p className={s.info}>
                    Speaks:{" "}
                    <span className={s.textLang}>
                      {teacher.languages.join(", ")}
                    </span>
                  </p>
                  <p className={s.info}>
                    Lesson Info:{" "}
                    <span className={s.text}>{teacher.lesson_info}</span>
                  </p>
                  <p className={s.info}>
                    Conditions:{" "}
                    <span className={s.text}>{teacher.conditions}</span>
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
            </li>
          );
        })}
      </ul>
      {hasMoreTeachers && (
        <button type="button" onClick={handleLoadMore} className={s.button}>
          Load More
        </button>
      )}
    </section>
  );
};

export default FavoritesList;
