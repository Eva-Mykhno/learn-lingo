import { NavLink } from "react-router-dom";
import image from "/img/image.jpg";
import s from "./Home.module.css";

const Home = () => {
  return (
    <div className={s.wrapper}>
      <div className={s.wrap}>
        <div className={s.info}>
          <h1 className={s.title}>
            Unlock your potential with the best{" "}
            <span className={s.spanTitle}>language</span> tutors
          </h1>
          <p className={s.text}>
            Embark on an Exciting Language Journey with Expert Language Tutors:
            Elevate your language proficiency to new heights by connecting with
            highly qualified and experienced tutors.
          </p>
          <NavLink to="/teachers" className={s.link}>
            {" "}
            Get started
          </NavLink>
        </div>
        <img src={image} alt="language tutor" className={s.img} />
      </div>
      <div className={s.wrapNumbers}>
        <div className={s.wrapSpan}>
          <span className={s.numbers}>32,000 +</span>
          <span className={s.span}>Experienced tutors</span>
        </div>
        <div className={s.wrapSpan}>
          <span className={s.numbers}>300,000 +</span>
          <span className={s.span}>5-star tutor reviews</span>
        </div>
        <div className={s.wrapSpan}>
          <span className={s.numbers}>120 +</span>
          <span className={s.span}>Subjects taught</span>
        </div>
        <div className={s.wrapSpan}>
          <span className={s.numbers}>200 +</span>
          <span className={s.span}>Tutor nationalities</span>
        </div>
      </div>
    </div>
  );
};

export default Home;
