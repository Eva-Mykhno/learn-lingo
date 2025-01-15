import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import TeacherCard from "../TeacherCard/TeacherCard.jsx";
import { fetchTeachers } from "../../redux/teachers/operations";
import { selectFilteredTeachers } from "../../redux/teachers/selectors.js";
import s from "./TeachersList.module.css";

const TeachersList = () => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(4);

  const teachers = useSelector(selectFilteredTeachers);

  useEffect(() => {
    dispatch(fetchTeachers());
  }, [dispatch]);

  const handleLoadMore = () => {
    setVisible((prev) => prev + 4);
  };

  const hasMoreTeachers = teachers.length > visible;

  return (
    <section className={s.list}>
      {teachers.length > 0 ? (
        teachers
          .slice(0, visible)
          .map((teacher, index) => (
            <TeacherCard key={index} teacher={teacher} />
          ))
      ) : (
        <section>
          <p>
            Sorry, nothing found for your request. Please change sorting
            options.
          </p>
        </section>
      )}

      {hasMoreTeachers && (
        <button type="button" onClick={handleLoadMore} className={s.button}>
          Load More
        </button>
      )}
    </section>
  );
};

export default TeachersList;
