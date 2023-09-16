import { Link } from "react-router-dom";
import { getCart } from "./cartSlice";
import { useSelector } from "react-redux";

function CartOverview() {
  const cart = useSelector(getCart);
  const isCartEmpty = Object.keys(cart).length === 0;
  const pizzaOrderedNum = cart.reduce((acc, curr) => curr.quantity + acc, 0);
  const orderTotalPrice = cart.reduce((acc, curr) => {
    if (curr.totalPrice !== undefined) return curr.totalPrice + acc;
    else return acc;
  }, 0);

  return (
    <div className="flex items-center justify-between bg-stone-800 px-4 py-4 uppercase text-stone-200 sm:px-6 md:text-base">
      <p className="space-x-4 text-stone-300 sm:space-x-6">
        <span>{pizzaOrderedNum} pizzas</span>
        <span>${orderTotalPrice}</span>
      </p>
      {isCartEmpty ? (
        "Start adding items to your Cart"
      ) : (
        <Link to={"/cart"}>Open cart &rarr;</Link>
      )}
    </div>
  );
}

export default CartOverview;
