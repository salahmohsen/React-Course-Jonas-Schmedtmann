// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";

import styles from "./Form.module.css";
import Button from "./Button";
import BackButton from "./BackButton";
import useGeolocationPosition from "../hooks/useGeolocationPosition";
import {
  useConvertCountryCodeToEmoji,
  useConvertCountryCodeToPNG,
} from "../hooks/useFlagsConvertor";
import Spinner from "./Spinner";
import Message from "./Message";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useCities } from "../contexts/CitiesContext";
import { useNavigate } from "react-router-dom";

// export function convertToEmoji(countryCode) {
//   const codePoints = countryCode
//     .toUpperCase()
//     .split("")
//     .map((char) => 127397 + char.charCodeAt());
//   return String.fromCodePoint(...codePoints);
// }

function Form() {
  const navigate = useNavigate();
  const [lat, lng] = useGeolocationPosition();
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [loading, setLoading] = useState(false);
  const { postCity, loading: cityPostLoading } = useCities();

  async function handleSubmit(e) {
    e.preventDefault();
    const newCity = {
      cityName: cityName,
      country: country,
      emoji: emoji,
      date: date,
      notes: notes,
      position: {
        lat: lat,
        lng: lng,
      },
    };
    await postCity(newCity);
    navigate("/app/cities");
  }

  const emoji = useConvertCountryCodeToEmoji(countryCode);
  const emojiPng = useConvertCountryCodeToPNG(emoji);

  useEffect(() => {
    const Base_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";
    if (!lat && !lng) return;
    async function fetchingCityData() {
      try {
        setLoading(true);
        setErrorMessage("");
        const res = await fetch(`${Base_URL}?latitude=${lat}&longitude=${lng}`);
        const data = await res.json();
        if (!data.city || !data.locality || !data.countryName)
          throw new Error(
            "I coudn't find cities here, please try again with different location! ⚠️"
          );
        setCityName(data.city);
        setCountry(data.countryName);
        setCountryCode(data.countryCode);
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchingCityData();
  }, [lat, lng]);
  if (loading) return <Spinner />;
  if (!lat && !lng) return <Message message={"Start by clicking the map."} />;

  if (errorMessage) return <Message message={errorMessage} />;
  return (
    <form
      className={`${styles.form} ${cityPostLoading ? styles.loading : ""}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>
          <img src={emojiPng} />
        </span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <DatePicker
          id="date"
          selected={date}
          onChange={(date) => setDate(date)}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
