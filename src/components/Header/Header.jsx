import { NavLink } from "react-router-dom";
import { useState } from "react";
import clsx from "clsx";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../redux/auth/operations";
import { selectUser } from "../../redux/auth/selectors";
import Modal from "../Modal/Modal";
import LoginForm from "../LoginForm/LoginForm";
import RegisterForm from "../RegisterForm/RegisterForm";
import s from "./Header.module.css";

const sprite = "../../../public/sprite.svg";

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null);

  const user = useSelector(selectUser); // Получаем информацию о пользователе из Redux
  // console.log("Current user in Header:", user);

  const dispatch = useDispatch();

  const openModal = (type) => {
    setModalType(type);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalType(null);
  };

  const buildLinkClassName = ({ isActive }) => {
    return clsx(s.link, isActive && s.active);
  };

  const handleLogout = () => {
    dispatch(logoutUser()); // Вызов операции логаута
  };

  return (
    <header className={clsx(s.header, "container")}>
      <div className={s.logo}>
        <svg height="28" width="28">
          <use href={`${sprite}#icon-ukraine`} />
        </svg>
        <span className={s.textLogo}>LearnLingo</span>
      </div>
      <nav className={s.nav}>
        <NavLink to="/" className={buildLinkClassName}>
          Home
        </NavLink>
        <NavLink to="/teachers" className={buildLinkClassName}>
          Teachers
        </NavLink>
        <NavLink to="/favorites" className={buildLinkClassName}>
          Favorites
        </NavLink>
      </nav>

      <div className={s.wrapLogin}>
        {!user ? (
          <>
            <button
              type="button"
              className={s.login}
              onClick={() => openModal("login")}>
              <svg className={s.icon} height="20" width="20">
                <use href={`${sprite}#icon-log-in`} />
              </svg>
              <span className={s.text}>Log in</span>
            </button>
            <button
              type="button"
              className={s.register}
              onClick={() => openModal("register")}>
              Registration
            </button>
          </>
        ) : (
          <div className={s.wrapLogin}>
            <button type="button" className={s.login} onClick={handleLogout}>
              <svg className={s.icon} height="20" width="20">
                <use href={`${sprite}#icon-log-out`} />
              </svg>
              <span className={s.text}>Logout</span>
            </button>
          </div>
        )}
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          {modalType === "login" && <LoginForm closeModal={closeModal} />}
          {modalType === "register" && <RegisterForm closeModal={closeModal} />}
        </Modal>
      </div>
    </header>
  );
};

export default Header;
