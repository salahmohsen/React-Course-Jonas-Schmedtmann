import { useDispatch, useSelector } from "react-redux";
import Button from "../../ui/Button";
import {
  decreaseItemQuantity,
  getCurrentItem,
  increseItemQuantity,
} from "./cartSlice";

function UpdateCartQuantity({ pizzaId }) {
  const dispatch = useDispatch();
  const { quantity } = useSelector(getCurrentItem(pizzaId));

  return (
    <div className="flex items-center gap-3 md:gap-5">
      <Button
        type="rounded"
        onClick={() => dispatch(decreaseItemQuantity(pizzaId))}
      >
        -
      </Button>
      <p>{quantity}</p>
      <Button
        type="rounded"
        onClick={() => dispatch(increseItemQuantity(pizzaId))}
      >
        +
      </Button>
    </div>
  );
}

export default UpdateCartQuantity;
