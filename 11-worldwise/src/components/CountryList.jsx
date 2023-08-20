import CountryItem from "./CountryItem";
import styles from "./CountryList.module.css";
import Spinner from "./Spinner";
import Message from "./Message";
import { useCities } from "../contexts/CitiesContext";

function CountryList() {
  const { cities, loading } = useCities();

  if (loading) return <Spinner />;
  if (!cities.length)
    return (
      <Message message="Add your first country by clicking a city on the map!" />
    );

  // const countries = cities.reduce((arr, city) => {
  //   if (!arr.map((el) => el.country).includes(city.country)) {
  //     return [
  //       ...arr,
  //       { country: city.country, emoji: city.emoji, id: city.id },
  //     ];
  //   }
  // }, []);

  const countriesUnique = new Set(
    cities.map((city) =>
      JSON.stringify({ country: city.country, emoji: city.emoji, id: city.id })
    )
  );
  const countries = [...countriesUnique].map((each) => JSON.parse(each));

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.id} />
      ))}
    </ul>
  );
}

export default CountryList;
