import clsx from "clsx";
import TeachersList from "../../components/TeachersList/TeachersList";
import s from "./TeachersPage.module.css";

const TeachersPage = () => {
  return (
    <div className={clsx(s.page, "container")}>
      <TeachersList />
    </div>
  );
};

export default TeachersPage;
