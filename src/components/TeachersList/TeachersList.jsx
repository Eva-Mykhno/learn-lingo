import { useEffect } from "react";
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

const sprite = "../../../public/sprite.svg";

const TeachersList = () => {
  const dispatch = useDispatch();
  const teachers = useSelector(selectTeachers);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchTeachers());
  }, [dispatch]);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <section>
      <ul className={clsx(s.list, s.container)}>
        {teachers.map((teacher) => (
          <li key={teacher.id} className={s.item}>
            <img
              src={teacher.avatar_url}
              alt={teacher.name}
              className={s.img}
            />
            <div className={s.headerItem}>
              <p>Teacher</p>
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
                <span className={s.spanText}>{teacher.price_per_hour}</span>
              </div>
              <svg className={s.heart} height="16" width="16">
                <use href={`${sprite}#icon-heart`} />
              </svg>
            </div>
            <h3 className={s.title}>
              {teacher.name} {teacher.surname}
            </h3>
            <p className={s.info}>
              Speaks:{" "}
              <span className={s.text}>{teacher.languages.join(", ")}</span>
            </p>
            <p className={s.info}>
              Lesson Info: <span className={s.text}>{teacher.lesson_info}</span>
            </p>
            <p className={s.info}>
              Conditions: <span className={s.text}>{teacher.conditions}</span>
            </p>
            <button type="button" className={s.button}>
              Read more
            </button>
            <ul className={s.levelList}>
              {teacher.levels.map((level, index) => (
                <li className={s.levelItem} key={index}>
                  {level}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default TeachersList;
