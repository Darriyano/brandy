import { Route, Routes } from "react-router-dom";
import MainPage from "../pages/main-page";
import AboutUs from "../pages/about-us";
import FavoritesPage from "../pages/favs";

// All routes for navigation
const AllRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
            <MainPage />
        }
      />

      <Route
        path="/favs"
        element={
            <FavoritesPage />
        }
      />

      <Route
        path="/about-us"
        element={
            <AboutUs />
        }
      />
    </Routes>
  );
};

export default AllRoutes;
