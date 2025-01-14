import { Form, Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { getDatabase, ref, push } from "firebase/database";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import s from "./BookForm.module.css";

const bookFormSchema = Yup.object().shape({
  reason: Yup.string().required("Reason is required"),
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
  phone: Yup.string()
    .matches(
      /^[+]?[0-9]{1,3}[ -]?[0-9]{1,15}$/,
      "Phone number must be a valid phone number"
    )
    .required("Phone number is required"),
});

const BookForm = ({ teacher, closeModal }) => {
  const initialFormValues = {
    reason: "Career and business",
    name: "",
    email: "",
    phone: "",
  };

  const handleSubmit = async (values, actions) => {
    const message = {
      reason: values.reason,
      name: values.name,
      email: values.email,
      phone: values.phone,
      teacher: teacher.name, 
      timestamp: Date.now(),
    };

    try {
          const db = getDatabase();
      const trialLessonsRef = ref(db, "trial_lessons");
      await push(trialLessonsRef, message);

      iziToast.show({
        title: "Success!",
        message: "Your request for a trial lesson has been successfully sent!",
        position: "center",
        color: "green",
        timeout: 6000,
      });
      actions.resetForm();
      closeModal();
    } catch (error) {
      console.log(error.message);
      iziToast.show({
        title: "Error!",
        message: "Something went wrong. Please try again.",
        position: "center",
        color: "red",
        timeout: 6000,
      });
    }
  };

  return (
    <div className={s.wrapper}>
      <h2 className={s.title}>Book trial lesson</h2>
      <p className={s.text}>
        Our experienced tutor will assess your current language level, discuss
        your learning goals, and tailor the lesson to your specific needs.
      </p>
      <div className={s.info}>
        <img src={teacher.avatar_url} alt={teacher.name} className={s.img} />
        <div className={s.teacher}>
          <span className={s.span}>Your teacher:</span>
          <span className={s.name}>
            {teacher.name} {teacher.surname}
          </span>
        </div>
      </div>

      <h3 className={s.subtitle}>
        What is your main reason for learning English?
      </h3>
      <Formik
        validationSchema={bookFormSchema}
        initialValues={initialFormValues}
        onSubmit={handleSubmit}>
        <Form>
          <div className={s.labels}>
            <label className={s.label}>
              <Field
                type="radio"
                name="reason"
                value="Career and business"
                className={s.radio}
              />
              Career and business
            </label>
            <label className={s.label}>
              <Field
                type="radio"
                name="reason"
                value="Lesson for kids"
                className={s.radio}
              />
              Lesson for kids
            </label>
            <label className={s.label}>
              <Field
                type="radio"
                name="reason"
                value="Living abroad"
                className={s.radio}
              />
              Living abroad
            </label>
            <label className={s.label}>
              <Field
                type="radio"
                name="reason"
                value="Exams and coursework"
                className={s.radio}
              />
              Exams and coursework
            </label>
            <label className={s.label}>
              <Field
                type="radio"
                name="reason"
                value="Culture, travel or hobby"
                className={s.radio}
              />
              Culture, travel or hobby
            </label>
          </div>
          <div className={s.inputs}>
            <div className={s.wrap}>
              <Field
                type="text"
                name="name"
                placeholder="Full name"
                className={s.input}
              />
              <ErrorMessage name="name" component="span" className={s.error} />
            </div>

            <div className={s.wrap}>
              <Field
                type="email"
                name="email"
                placeholder="Email"
                className={s.input}
              />
              <ErrorMessage name="email" component="span" className={s.error} />
            </div>

            <div className={s.wrap}>
              <Field
                type="text"
                name="phone"
                placeholder="Phone number"
                className={s.input}
              />
              <ErrorMessage name="phone" component="span" className={s.error} />
            </div>
          </div>

          <button type="submit" className={s.button}>
            Book
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default BookForm;
