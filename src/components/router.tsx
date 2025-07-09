import { Route, Routes } from 'react-router-dom';
import MainPage from '../pages/main-page';
import AboutUs from '../pages/about-us';
import FavoritesPage from '../pages/favs';
import CreateCard from '../pages/addition';
import CardDetail from '../pages/detailed';

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />

      <Route path="/favs" element={<FavoritesPage />} />

      <Route path="/about-us" element={<AboutUs />} />

      <Route path="/add-card" element={<CreateCard />} />

      <Route path="/link/:id" element={<CardDetail />} />
    </Routes>
  );
};

export default AllRoutes;
