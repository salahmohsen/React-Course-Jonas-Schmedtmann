import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getTotalCartPrice, getTotalCartQuantity } from "./cartSlice";

function CartOverview() {
  const pizzaOrderedNum = useSelector(getTotalCartQuantity);
  const orderTotalPrice = useSelector(getTotalCartPrice);

  if (pizzaOrderedNum === 0) return;

  return (
    <div className="flex items-center justify-between bg-stone-800 px-4 py-4 uppercase text-stone-200 sm:px-6 md:text-base">
      <p className="space-x-4 text-stone-300 sm:space-x-6">
        <span>{pizzaOrderedNum} pizzas</span>
        <span>${orderTotalPrice}</span>
      </p>

      <Link to={"/cart"}>Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
