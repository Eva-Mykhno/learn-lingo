import { useSelector } from "react-redux";
import { selectUser } from "../redux/auth/selectors";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const user = useSelector(selectUser); // Получаем информацию о пользователе из Redux
  if (!user) {
    return <Navigate to="/auth/login" />;
  }

  return children; // Если пользователь авторизован, рендерим переданный компонент
};

export default PrivateRoute;
