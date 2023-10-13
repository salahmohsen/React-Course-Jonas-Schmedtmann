import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import { useSettings } from "./useSettings";
import { useUpdateSetting } from "./useUpdateSetting";

function UpdateSettingsForm() {
  const {
    isSettingsLoading,
    settings: {
      minBookingLenth,
      maxBookingLength,
      maxGuestsPerBooking,
      breakfastPrice,
    } = {},
    error,
  } = useSettings();
  const { isUpdatingSetting, updateSetting } = useUpdateSetting();
  if (isSettingsLoading) return <Spinner />;

  function handleUpdate(e, fieldName) {
    const { value } = e.target;
    if (!value) return;
    updateSetting({ [fieldName]: value });
  }

  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          defaultValue={minBookingLenth}
          onBlur={(e) => handleUpdate(e, "minBookingLenth")}
          disabled={isUpdatingSetting}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          defaultValue={maxBookingLength}
          onBlur={(e) => handleUpdate(e, "maxBookingLength")}
          disabled={isUpdatingSetting}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          defaultValue={maxGuestsPerBooking}
          onBlur={(e) => handleUpdate(e, "maxGuestsPerBooking")}
          disabled={isUpdatingSetting}
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          defaultValue={breakfastPrice}
          onBlur={(e) => handleUpdate(e, "breakfastPrice")}
          disabled={isUpdatingSetting}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
