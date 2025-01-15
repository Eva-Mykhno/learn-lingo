import { useState } from "react";
import LanguageLevels from "../LanguageLevels/LanguageLevels";
import Modal from "../Modal/Modal";
import BookForm from "../BookForm/BookForm";
import s from "./TeacherDetails.module.css";

const sprite = "/sprite.svg";

const TeacherDetails = ({ teacher, selectedLevel, onLevelChange }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

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
      <LanguageLevels
        teacherId={teacher.id}
        levels={teacher.levels}
        selectedLevel={selectedLevel}
        onLevelChange={onLevelChange}
      />

      <button type="button" onClick={() => openModal()} className={s.button}>
        Book trial lesson
      </button>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {" "}
        <BookForm teacher={teacher} closeModal={closeModal} />
      </Modal>
    </section>
  );
};

export default TeacherDetails;
