import { NavLink } from "react-router-dom";
import clsx from "clsx";
import s from "./NotFoundPage.module.css";

const NotFoundPage = () => {
  return (
    <main className={clsx(s.page, "container")}>
      <p className={s.text}>
        Sorry... The page is not found. You can go to the teachers page.
      </p>
      <div className={s.back}>
        <NavLink to="/teachers">
          <p className={s.backText}>Teachers</p>
        </NavLink>
      </div>
    </main>
  );
};
export default NotFoundPage;
