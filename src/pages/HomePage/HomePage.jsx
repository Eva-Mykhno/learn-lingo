import clsx from "clsx";
import Home from "../../components/Home/Home";
import s from "./HomePage.module.css";

const HomePage = () => {
  return (
    <main className={clsx(s.wrapper, "container")}>
      <Home />
    </main>
  );
};

export default HomePage;
