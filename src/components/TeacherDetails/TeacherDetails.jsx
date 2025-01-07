import s from "./TeacherDetails.module.css";

const sprite = "../../../public/sprite.svg";

const TeacherDetails = ({ teacher }) => {
  const getReviewerName = (reviewer_name) => {
    return reviewer_name.charAt(0).toUpperCase();
  };
  return (
    <section className={s.details}>
      <p className={s.text}>{teacher.experience}</p>
      <ul className={s.list}>
        {teacher.reviews.map((review, index) => {
          const firstLetter = getReviewerName(review.reviewer_name);
          return (
            <li key={index} className={s.review}>
              <div className={s.reviewer}>
                <span className={s.firstLetter}>{firstLetter}</span>
                <div>
                  <p className={s.name}>{review.reviewer_name}</p>
                  <div className={s.wrap}>
                    <svg className={s.star} height="16" width="16">
                      <use href={`${sprite}#icon-star`} />
                    </svg>
                    <span className={s.rating}>{review.reviewer_rating}.0</span>
                  </div>
                </div>
              </div>
              <p className={s.comment}>{review.comment}</p>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default TeacherDetails;
