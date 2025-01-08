import Home from "../../components/Home/Home";
import clsx from "clsx";
import s from "./HomePage.module.css";

const HomePage = () => {
  return (
    <main className={clsx(s.wrapper, "container")}>
      <Home />
    </main>
  );
};

export default HomePage;
