import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Loader from "../Loader/Loader";

const Layout = lazy(() => import("../Layout/Layout.jsx"));
const TeachersPage = lazy(() =>
  import("../../pages/TeachersPage/TeachersPage.jsx")
);

const App = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="/teachers" element={<TeachersPage />} />
      </Routes>
    </Suspense>
  );
};

export default App;
