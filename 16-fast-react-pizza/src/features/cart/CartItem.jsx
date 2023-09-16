import { formatCurrency } from "../../utils/helpers";
import DeleteItem from "./DeleteItem";
import UpdateCartQuantity from "./UpdateCartQuantity";

function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;
  return (
    <li className="py-3 sm:flex sm:items-center sm:justify-between">
      <p className="mb-1 sm:mb-0">
        {quantity}&times; {name}
      </p>
      <div className=" flex items-center justify-between sm:gap-6">
        <p className=" flex-none text-sm font-bold">
          {formatCurrency(totalPrice)}
        </p>
        <div className="flex gap-2 md:gap-6">
          <UpdateCartQuantity pizzaId={pizzaId} quantity={quantity} />
          <DeleteItem id={pizzaId} />
        </div>
      </div>
    </li>
  );
}

export default CartItem;
