import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import clsx from "clsx";
import { fetchTeachers } from "../../redux/teachers/operations";
import {
  selectTeachers,
  selectIsLoading,
  selectError,
} from "../../redux/teachers/selectors";
import Loader from "../Loader/Loader";
import s from "./TeachersList.module.css";
import TeacherDetails from "../TeacherDetails/TeacherDetails";

const sprite = "../../../public/sprite.svg";

const TeachersList = () => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(4);
  const [expandedTeacherId, setExpandedTeacherId] = useState(null);

  // Состояние для выбранных уровней каждого учителя
  const [selectedLevels, setSelectedLevels] = useState({});

  const teachers = useSelector(selectTeachers);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchTeachers());
  }, [dispatch]);

  // Обработчик изменения уровня
  const handleLevelChange = (teacherId, level) => {
    setSelectedLevels((prev) => ({
      ...prev,
      [teacherId]: level,
    }));
  };

  const handleToggleDetails = (id) => {
    setExpandedTeacherId(id);
  };

  const handleLoadMore = () => {
    setVisible((prev) => prev + 4);
  };

  const hasMoreTeachers = teachers.length > visible;

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <section>
      <ul className={s.list}>
        {teachers.slice(0, visible).map((teacher) => {
          // Устанавливаем первый уровень как выбранный по умолчанию, если он еще не был установлен
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
                  <p className={s.subtitle}>Teacher</p>
                  <div className={s.wrap}>
                    <div className={s.iconWithText}>
                      <svg className={s.book} height="16" width="16">
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
                      <span className={s.price}>{teacher.price_per_hour}</span>
                    </div>
                  </div>
                  <svg className={s.heart} height="26" width="26">
                    <use href={`${sprite}#icon-heart`} />
                  </svg>
                </div>
                <h3 className={s.title}>
                  {teacher.name} {teacher.surname}
                </h3>
                <div className={s.wrapText}>
                  <p className={s.info}>
                    Speaks:
                    <span className={s.textLang}>
                      {teacher.languages.join(", ")}
                    </span>
                  </p>
                  <p className={s.info}>
                    Lesson Info:
                    <span className={s.text}>{teacher.lesson_info}</span>
                  </p>
                  <p className={s.info}>
                    Conditions:
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
                  <TeacherDetails teacher={teacher} />
                )}
                {/* Радио-кнопки для уровней */}
                <ul className={s.levelList}>
                  {teacher.levels.map((level, index) => (
                    <li
                      key={index}
                      className={clsx(
                        s.levelItem,
                        selectedLevel === level ? s.selected : s.unselected
                      )}
                      onClick={() => handleLevelChange(teacher.id, level)}>
                      <input
                        type="radio"
                        name={`level-${teacher.id}`}
                        value={level}
                        checked={selectedLevel === level}
                        onChange={() => handleLevelChange(teacher.id, level)}
                        className={s.radioHidden}
                      />
                      <label className={s.radioLabel}>{level}</label>
                    </li>
                  ))}
                </ul>
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

export default TeachersList;
