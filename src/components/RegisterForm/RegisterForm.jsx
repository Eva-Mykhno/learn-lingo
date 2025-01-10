import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import s from "./RegisterForm.module.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../../redux/auth/operations"; // импортируем операцию для регистрации
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const sprite = "../../../public/sprite.svg";

const registerSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Name must be at least 3 characters")
    .max(15, "Name must be at most 15 characters")
    .required("Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      'Email must have a one "@" and a "."'
    )
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 8 characters")
    .max(16, "Password must be at most 16 characters")
    .matches(/^[^\s]*$/, "Password should not contain spaces")
    .required("Password is required"),
});

const RegisterForm = ({ closeModal }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const initialRegisterValues = {
    name: "",
    email: "",
    password: "",
  };

  const handleSubmit = async (values, actions) => {
    setIsLoading(true);
    try {
      await dispatch(registerUser(values));

      iziToast.show({
        title: "Success!",
        message: "You have successfully registered!",
        position: "center",
        color: "green",
        timeout: 6000,
      });
      actions.resetForm();
      closeModal();
    } catch (error) {
      console.error("Registration failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={s.wrapper}>
      <h2 className={s.title}>Registration</h2>
      <p className={s.text}>
        Thank you for your interest in our platform! In order to register, we
        need some information. Please provide us with the following information
      </p>
      <Formik
        validationSchema={registerSchema}
        initialValues={initialRegisterValues}
        onSubmit={handleSubmit}>
        <Form className={s.form}>
          <div>
            <Field
              type="text"
              name="name"
              placeholder="Name"
              className={s.input}
              disabled={isLoading}
            />
            <ErrorMessage name="name" component="span" className={s.error} />
          </div>

          <div>
            <Field
              type="email"
              name="email"
              placeholder="Email"
              className={s.input}
              disabled={isLoading}
            />
            <ErrorMessage name="email" component="span" className={s.error} />
          </div>

          <div className={s.wrap}>
            <Field
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              className={s.input}
              disabled={isLoading}
            />
            <ErrorMessage
              name="password"
              component="span"
              className={s.error}
            />

            <button
              type="button"
              onClick={togglePasswordVisibility}
              className={s.iconBtn}
              disabled={isLoading}
              tabIndex={isLoading ? -1 : 0}>
              <svg className={s.icon}>
                <use href={`${sprite}#icon-eye`} />
              </svg>
            </button>
          </div>

          <button type="submit" className={s.button} disabled={isLoading}>
            Sign Up
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default RegisterForm;
