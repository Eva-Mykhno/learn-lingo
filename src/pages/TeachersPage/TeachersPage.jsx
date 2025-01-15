import clsx from "clsx";
import TeachersList from "../../components/TeachersList/TeachersList";
import SortBox from "../../components/SortBox/SortBox";
import s from "./TeachersPage.module.css";

const TeachersPage = () => {
  return (
    <main className={clsx(s.page, "container")}>
      <SortBox />
      <TeachersList />
    </main>
  );
};

export default TeachersPage;
