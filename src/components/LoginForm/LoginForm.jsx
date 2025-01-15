import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/auth/operations";
import s from "./LoginForm.module.css";

const sprite = "/sprite.svg";

const loginSchema = Yup.object().shape({
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

const LoginForm = ({ closeModal }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const initialLoginValues = {
    email: "",
    password: "",
  };

  const handleSubmit = async (values, actions) => {
    setIsLoading(true);
    try {
      await dispatch(loginUser(values));
      actions.resetForm();
      closeModal();
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={s.wrapper}>
      <h2 className={s.title}>Log In</h2>
      <p className={s.text}>
        Welcome back! Please enter your credentials to access your account and
        continue your search for an teacher.
      </p>
      <Formik
        validationSchema={loginSchema}
        initialValues={initialLoginValues}
        onSubmit={handleSubmit}>
        <Form className={s.form}>
          <div className={s.wrap}>
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
            Log in
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default LoginForm;
