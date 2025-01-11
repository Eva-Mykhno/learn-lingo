import { useDispatch } from "react-redux";
import { setFilter } from "../../../redux/teachers/slice";
import s from "./SortPrice.module.css";

const SortPrice = () => {
  const dispatch = useDispatch();

  const handlePriceChange = (event) => {
    dispatch(
      setFilter({ filterName: "price", value: Number(event.target.value) })
    );
  };

  const prices = [25, 27, 28, 30, 32, 35];
  return (
    <div className={s.wrapper}>
      <label className={s.label}>
        <select onChange={handlePriceChange}>
          {prices.map((price) => (
            <option key={price} value={price}>
              {price}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};

export default SortPrice;
