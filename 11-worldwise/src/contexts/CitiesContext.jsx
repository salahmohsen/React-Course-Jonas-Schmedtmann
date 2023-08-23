import { useState, useEffect, createContext, useContext } from "react";
import { useConvertCountryCodeToPNG } from "../hooks/useFlagsConvertor";

const BASE_URL = "http://127.0.0.1:8000";

const CitiesContext = createContext();

export function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

  useEffect(() => {
    setLoading(true);

    async function fetchingCities() {
      try {
        setLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        setCities(data);
      } catch (error) {
        alert("Something wrong happened with fitching cities...");
      } finally {
        setLoading(false);
      }
    }
    fetchingCities();
  }, []);

  async function getCity(id) {
    try {
      setLoading(true);
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      setCurrentCity({
        ...data,
      });
    } catch (error) {
      alert("Something wrong happened with fitching cities...");
    } finally {
      setLoading(false);
    }
  }

  async function postCity(newCity) {
    try {
      setLoading(true);
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "Post",
        body: JSON.stringify(newCity),
        headers: { "content-type": "application/json" },
      });
      const data = await res.json();
      if (data) setCities([...cities, data]);
    } catch (error) {
      alert("Something wrong happened with fitching cities...");
    } finally {
      setLoading(false);
    }
  }

  return (
    <CitiesContext.Provider
      value={{ cities, loading, currentCity, getCity, postCity }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

export function useCities() {
  const context = useContext(CitiesContext);
  if (!context)
    throw new Error("CitiesContext was used outside the CitiesProvider");
  return context;
}
