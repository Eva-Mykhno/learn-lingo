import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Loader from "../Loader/Loader";
import { selectIsGlobalLoading } from "../../redux/favorites/selectors";
import { useSelector } from "react-redux";

const Layout = () => {
  const isGlobalLoading = useSelector(selectIsGlobalLoading);

  return (
    <>
      {isGlobalLoading && <Loader />}
      <Header />
      <Outlet />
    </>
  );
};

export default Layout;
