// import { useDispatch } from "react-redux";
// import { Formik, Form, Field } from "formik";
// import { setFilter } from "../../../redux/teachers/slice";
// import s from "./SortPrice.module.css";

// const sprite = "../../../../public/sprite.svg";

// const SortPrice = () => {
//   const dispatch = useDispatch();

//   const prices = [25, 27, 28, 30, 32, 35];

//   const initialPriceValue = {
//     price: 0,
//   };

//   const handleSubmit = (event) => {
//     dispatch(setFilter({ filterName: "price", Number(event.price) }));
//   };

//   return (
//     <Formik initialValues={initialPriceValue} onSubmit={handleSubmit}>
//       {({ handleSubmit }) => (
//         <Form onChange={handleSubmit} className={s.wrapper}>
//           <label className={s.label}>
//             <span className={s.text}>Price</span>
//             <div className={s.wrapper}>
//               <Field as="select" name="price" className={s.option}>
//                 {prices.map((price) => (
//                   <option key={price} value={price}>
//                     {price}
//                   </option>
//                 ))}
//               </Field>
//               <svg height="20" width="20" className={s.icon}>
//                 <use href={`${sprite}#icon-chevron-down`} />
//               </svg>
//             </div>
//           </label>
//         </Form>
//       )}
//     </Formik>
//   );
// };

// export default SortPrice;

// import { useDispatch } from "react-redux";
// import { Formik, Form, Field } from "formik";
// import { setFilter } from "../../../redux/teachers/slice";
// import s from "./SortPrice.module.css";

// const sprite = "../../../../public/sprite.svg";

// const SortPrice = () => {
//   const dispatch = useDispatch();

//   const prices = [25, 27, 28, 30, 32, 35];

//   const initialPriceValue = {
//     price: 0,
//   };

//   const handleSubmit = (values) => {
//     dispatch(setFilter({ filterName: "price", price: values.price }));
//   };

//   return (
//     <Formik initialValues={initialPriceValue} onSubmit={handleSubmit}>
//       {() => (
//         <Form className={s.wrapper}>
//           <label className={s.label}>
//             <span className={s.text}>Price</span>
//             <div className={s.wrapper}>
//               <Field as="select" name="price" className={s.option}>
//                 {prices.map((price) => (
//                   <option key={price} value={price}>
//                     {price}
//                   </option>
//                 ))}
//               </Field>
//               <svg height="20" width="20" className={s.icon}>
//                 <use href={`${sprite}#icon-chevron-down`} />
//               </svg>
//             </div>
//           </label>
//         </Form>
//       )}
//     </Formik>
//   );
// };

// // export default SortPrice;

// import { useDispatch } from "react-redux";
// import { Formik, Form, Field } from "formik";
// import { setFilter } from "../../../redux/teachers/slice";
// import s from "./SortPrice.module.css";

// const sprite = "../../../../public/sprite.svg";

// const SortPrice = () => {
//   const dispatch = useDispatch();

//   const prices = [25, 27, 28, 30, 32, 35];

//   const initialPriceValue = {
//     price: 0,
//   };

//   const handleSubmit = (values) => {
//     dispatch(setFilter({ filterName: "price", value: Number(values.price) }));
//   };

//   return (
//     <Formik initialValues={initialPriceValue} onSubmit={handleSubmit}>
//       {() => (
//         <Form className={s.wrapper}>
//           <label className={s.label}>
//             <span className={s.text}>Price</span>
//             <div className={s.wrapper}>
//               <Field as="select" name="price" className={s.option}>
//                 {prices.map((price) => (
//                   <option key={price} value={price}>
//                     {price}
//                   </option>
//                 ))}
//               </Field>
//               <svg height="20" width="20" className={s.icon}>
//                 <use href={`${sprite}#icon-chevron-down`} />
//               </svg>
//             </div>
//           </label>
//         </Form>
//       )}
//     </Formik>
//   );
// };

// export default SortPrice;

// import { useDispatch } from "react-redux";
// import { Formik, Form, Field } from "formik";
// import { setFilter } from "../../../redux/teachers/slice";
// import s from "./SortPrice.module.css";

// const sprite = "../../../../public/sprite.svg";

// const SortPrice = () => {
//   const dispatch = useDispatch();

//   const prices = [25, 27, 28, 30, 32, 35];

//   const initialPriceValue = {
//     price: 0,
//   };

//   const handleChange = (event) => {
//     const price = Number(event.target.value);
//     dispatch(setFilter({ filterName: "price", value: price }));
//   };

//   return (
//     <Formik initialValues={initialPriceValue}>
//       {() => (
//         <Form className={s.wrapper}>
//           <label className={s.label}>
//             <span className={s.text}>Price</span>
//             <div className={s.wrapper}>
//               <Field
//                 as="select"
//                 name="price"
//                 value={values.price}
//                 className={s.option}
//                 onChange={handleChange} // Обработчик onChange
//               >
//                 {prices.map((price) => (
//                   <option key={price} value={price}>
//                     {price}
//                   </option>
//                 ))}
//               </Field>
//               <svg height="20" width="20" className={s.icon}>
//                 <use href={`${sprite}#icon-chevron-down`} />
//               </svg>
//             </div>
//           </label>
//         </Form>
//       )}
//     </Formik>
//   );
// };

// export default SortPrice;

import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field } from "formik";
import { setFilter } from "../../../redux/teachers/slice";
import s from "./SortPrice.module.css";
import { selectCurrentPrice } from "../../../redux/teachers/selectors";

const sprite = "../../../../public/sprite.svg";

const SortPrice = () => {
  const dispatch = useDispatch();
  const currentPrice = useSelector(selectCurrentPrice);

  const prices = [25, 27, 28, 30, 32, 35];

  const initialPriceValue = {
    price: currentPrice || 0,
  };

  const handleChange = (event) => {
    const price = Number(event.target.value);
    dispatch(setFilter({ filterName: "price", value: price }));
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
                value={values.price} // Привязываем значение select к состоянию формы
                onChange={handleChange} // Обработчик изменения
              >
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
