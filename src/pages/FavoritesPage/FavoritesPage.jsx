import clsx from "clsx";
import FavoritesList from "../../components/FavoritesList/FavoritesList";
import s from "./FavoritesPage.module.css";

const FavoritesPage = () => {
  return (
    <main className={clsx(s.page, "container")}>
      <FavoritesList />
    </main>
  );
};

export default FavoritesPage;
