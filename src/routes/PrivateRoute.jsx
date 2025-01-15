import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectUser } from "../redux/auth/selectors";

const PrivateRoute = ({ children }) => {
  const user = useSelector(selectUser);
  if (!user) {
    return <Navigate to="/auth/login" />;
  }

  return children;
};

export default PrivateRoute;
