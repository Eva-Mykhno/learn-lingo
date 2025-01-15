import { CircleLoader } from "react-spinners";
import s from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={s.loader}>
      <CircleLoader color="#F0AA8D" size={150} speedMultiplier={1} />;
    </div>
  );
};

export default Loader;
