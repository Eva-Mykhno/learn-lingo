import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Loader from "../Loader/Loader";

const Layout = lazy(() => import("../Layout/Layout.jsx"));
const TeachersPage = lazy(() =>
  import("../../pages/TeachersPage/TeachersPage.jsx")
);
const TeacherDetails = lazy(() =>
  import("../TeacherDetails/TeacherDetails.jsx")
);

const App = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="/teachers" element={<TeachersPage />}>
          <Route path="details" element={<TeacherDetails />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default App;
