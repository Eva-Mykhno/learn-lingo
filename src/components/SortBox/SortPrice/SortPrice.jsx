import { Formik, Form, Field } from "formik";
import { setFilter } from "../../../redux/teachers/slice";
import s from "./SortPrice.module.css";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentPrice } from "../../../redux/teachers/selectors";

const sprite = "/sprite.svg";

const SortPrice = () => {
  const dispatch = useDispatch();
  const currentPrice = useSelector(selectCurrentPrice);

  const prices = [25, 27, 28, 30, 32, 35];

  const initialPriceValue = {
    price: currentPrice || "",
  };

  const handleChange = (event) => {
    const price = event.target.value === "" ? null : Number(event.target.value);
    dispatch(setFilter({ name: "price_per_hour", value: price }));
  };

  return (
    <Formik initialValues={initialPriceValue} enableReinitialize={true}>
      {({ values }) => (
        <Form className={s.wrapper}>
          <label className={s.label}>
            <span className={s.text}>Price</span>
            <div className={s.wrapper}>
              <Field
                as="select"
                name="price"
                className={s.option}
                value={values.price}
                onChange={handleChange}>
                <option value="">Select price</option>
                {prices.map((price) => (
                  <option key={price} value={price}>
                    {price}
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

export default SortPrice;
