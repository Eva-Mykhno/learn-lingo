import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TeacherCard from "../TeacherCard/TeacherCard";
import { selectFavorites } from "../../redux/favorites/selectors.js";
import s from "./FavoritesList.module.css";
import { selectUser } from "../../redux/auth/selectors.js";
import { fetchFavorites } from "../../redux/favorites/operations.js";

const FavoritesList = () => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(4);
  const favorites = useSelector(selectFavorites);
  const user = useSelector(selectUser);

  useEffect(() => {
    if (user?.uid) {
      dispatch(fetchFavorites(user.uid));
    }
  }, [dispatch, user]);

  const handleLoadMore = () => {
    setVisible((prev) => prev + 4);
  };

  const hasMoreFavorites = favorites.length > visible;

  return (
    <section className={s.list}>
      {favorites.length > 0 ? (
        favorites
          .slice(0, visible)
          .map((teacher, index) => (
            <TeacherCard key={index} teacher={teacher} />
          ))
      ) : (
        <section>
          <p>The list of favorites is currently empty.</p>
        </section>
      )}

      {hasMoreFavorites && (
        <button type="button" onClick={handleLoadMore} className={s.button}>
          Load More
        </button>
      )}
    </section>
  );
};

export default FavoritesList;
