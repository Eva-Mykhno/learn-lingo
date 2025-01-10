import ReactModal from "react-modal";
import s from "./Modal.module.css";

const sprite = "../../../public/sprite.svg";

const customStyles = {
  content: {
    position: "absolute",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    padding: "64px",
    transform: "translate(-50%, -50%)",
    overflow: "hidden",
    borderRadius: "30px",
    backgroundColor: "var(--white)",
  },
  overlay: {
    backgroundColor: "var(--accent)",
    zIndex: "100",
  },
};

ReactModal.setAppElement("#root");

const Modal = ({ isOpen, onClose, children }) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      shouldCloseOnEsc
      shouldCloseOnOverlayClick
      closeTimeoutMS={200}
      style={customStyles}
      contentLabel="ReactModal"
      ariaHideApp={false}>
      <button onClick={onClose} className={s.button}>
        <svg className={s.icon} height="32" width="32">
          <use href={`${sprite}#icon-close`} />
        </svg>
      </button>
      {children}
    </ReactModal>
  );
};

export default Modal;
