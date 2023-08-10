import CityItem from "./CityItem";
import styles from "./CityList.module.css";
import Spinner from "./Spinner";
import Message from "./Message";

function CityList({ cities, loading }) {
  if (loading) return <Spinner />;
  if (!cities.length)
    return (
      <Message message="Add your first city by clicking a city on the map!" />
    );
  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem city={city} key={city.id} />
      ))}
    </ul>
  );
}

export default CityList;
