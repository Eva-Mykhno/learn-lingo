import { useSelector } from "react-redux";
import { selectUser } from "../redux/auth/selectors";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const user = useSelector(selectUser);
  if (!user) {
    return <Navigate to="/auth/login" />;
  }

  return children;
};

export default PrivateRoute;
