import { useDispatch } from "react-redux";
import { Formik, Form, Field } from "formik";
import { setFilter } from "../../../redux/teachers/slice";
import s from "./SortLanguages.module.css";

const sprite = "../../../../public/sprite.svg";

const SortLanguages = () => {
  const dispatch = useDispatch();

  const languages = [
    "English",
    "Spanish",
    "Mandarin Chinese",
    "French",
    "German",
    "Italian",
    "Korean",
    "Vietnamese",
  ];

  const initialLanguageValues = {
    language: "",
  };

  const handleSubmit = (values) => {
    dispatch(setFilter({ filterName: "language", value: values.language }));
  };

  return (
    <Formik initialValues={initialLanguageValues} onSubmit={handleSubmit}>
      {({ handleSubmit }) => (
        <Form onChange={handleSubmit} className={s.wrapper}>
          <label className={s.label}>
            <span className={s.text}>Languages</span>
            <div className={s.wrapper}>
              <Field as="select" name="language" className={s.option}>
                <option value="">Select language</option>
                {languages.map((language) => (
                  <option key={language} value={language}>
                    {language}
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

export default SortLanguages;
