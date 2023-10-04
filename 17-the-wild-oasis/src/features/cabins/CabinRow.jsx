import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import Button from "../../ui/Button";
import { useState } from "react";
import CreateCabinForm from "./CreateCabinForm";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  vertical-align: middle;
  justify-content: center;
  gap: 0.5rem;
`;

function CabinRow({ cabin }) {
  const [showForm, setShowForm] = useState(false);

  const {
    id: cabinID,
    name,
    maxCapacity,
    regularPrice,
    discount,
    description,
    image,
  } = cabin;

  const queryClient = useQueryClient();
  const { isLoading: isDeleting, mutate } = useMutation({
    mutationFn: deleteCabin,
    onSuccess: () => {
      toast.success("Cabin Succefully Deleted");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return (
    <>
      <TableRow role="row">
        <img src={image} alt={description} />
        <Cabin>{name}</Cabin>
        <div>Fits up to {maxCapacity}</div>
        <Price>{formatCurrency(regularPrice)}</Price>
        {discount ? (
          <Discount>{formatCurrency(discount)}</Discount>
        ) : (
          <span>&mdash;</span>
        )}
        <ButtonsContainer>
          <Button
            variation="secondary"
            size="small"
            onClick={() => setShowForm((curr) => !curr)}
          >
            Edit
          </Button>
          <Button
            variation="danger"
            size="small"
            onClick={() => mutate(cabinID)}
            disabled={isDeleting}
          >
            Delete
          </Button>
        </ButtonsContainer>
      </TableRow>
      {showForm && (
        <CreateCabinForm cabinToEdit={cabin} setShowForm={setShowForm} />
      )}
    </>
  );
}

export default CabinRow;
