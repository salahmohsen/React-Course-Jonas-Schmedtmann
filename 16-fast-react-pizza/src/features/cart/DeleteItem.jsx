import { useDispatch } from "react-redux";
import Button from "../../ui/Button";
import { deleteItem } from "./cartSlice";

function DeleteItem({ id }) {
  const dispatch = useDispatch();

  function handleDeleteButton() {
    dispatch(deleteItem(id));
  }

  return (
    <Button type="small" onClick={handleDeleteButton}>
      Delete
    </Button>
  );
}

export default DeleteItem;
