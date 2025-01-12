import clsx from "clsx";
import TeachersList from "../../components/TeachersList/TeachersList";
import s from "./TeachersPage.module.css";
import SortBox from "../../components/SortBox/SortBox";

const TeachersPage = () => {
  return (
    <main className={clsx(s.page, "container")}>
      <SortBox />
      <TeachersList />
    </main>
  );
};

export default TeachersPage;
