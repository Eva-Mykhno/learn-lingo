import { useDispatch } from "react-redux";
import { Formik, Form, Field } from "formik";
import { setFilter } from "../../../redux/teachers/slice";
import s from "./SortLevels.module.css";

const sprite = "../../../../public/sprite.svg";

const SortLevels = () => {
  const dispatch = useDispatch();

  //   const handleLevelChange = (event) => {
  //     dispatch(setFilter({ filterName: "level", value: event.target.value }));
  //   };
  const levels = [
    "A1 Beginner",
    "A2 Elementary",
    "B1 Intermediate",
    "B2 Upper-Intermediate",
    "C1 Advanced",
    "C2 Proficient",
  ];

  const initialLevelValues = {
    level: "",
  };

  const handleSubmit = (values) => {
    dispatch(setFilter({ filterName: "level", value: values.level }));
  };

  //   return (
  //     <div className={s.wrapper}>
  //       <label className={s.label}>
  //         <select onChange={handleLevelChange}>
  //           {levels.map((level) => (
  //             <option key={level} value={level}>
  //               {level}
  //             </option>
  //           ))}
  //         </select>
  //       </label>
  //     </div>
  //   );
  // };

  return (
    <Formik initialValues={initialLevelValues} onSubmit={handleSubmit}>
      {({ handleSubmit }) => (
        <Form onChange={handleSubmit} className={s.wrapper}>
          <label className={s.label}>
            <span className={s.text}>Level of knowledge</span>
            <div className={s.wrapper}>
              <Field as="select" name="level" className={s.option}>
                <option value="">Select level</option>
                {levels.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </Field>
              <svg height="20" width="20" className={s.icon}>
                <use href={`${sprite}#icon-chevron-down`} />
              </svg>
            </div>
          </label>
        </Form>
      )}
    </Formik>
  );
};

export default SortLevels;
