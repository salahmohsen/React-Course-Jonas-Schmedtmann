import {
  useState,
  useEffect,
  createContext,
  useContext,
  useReducer,
  useCallback,
} from "react";
import { useConvertCountryCodeToPNG } from "../hooks/useFlagsConvertor";
import { useLoaderData } from "react-router-dom";

const BASE_URL = "http://127.0.0.1:8000";

const CitiesContext = createContext();

const initialState = { cities: [], loading: false, currentCity: {} };

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, loading: true };

    case "cities/loaded":
      return { ...state, loading: false, cities: action.payload };

    case "city/loaded":
      return { ...state, loading: false, currentCity: action.payload };

    case "city/created":
      return {
        ...state,
        loading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };

    case "city/deleted":
      return {
        ...state,
        loading: false,
        cities: [...state.cities.filter((city) => city.id !== action.payload)],
        currentCity: {},
      };

    case "rejected":
      return { ...state, loading: false, error: action.payload };

    default:
      throw new Error("Unkown action type!");
  }
}

export function CitiesProvider({ children }) {
  const [{ cities, loading, currentCity }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    async function fetchingCities() {
      dispatch({ type: "loading" });

      try {
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        dispatch({ type: "cities/loaded", payload: data });
      } catch (error) {
        dispatch({
          type: "rejected",
          payload: "Something wrong happened with fitching cities...",
        });
      }
    }
    fetchingCities();
  }, []);

  const getCity = useCallback(
    async (id) => {
      if (Number(id) === currentCity.id) return;
      dispatch({ type: "loading" });

      try {
        const res = await fetch(`${BASE_URL}/cities/${id}`);
        const data = await res.json();
        dispatch({ type: "city/loaded", payload: data });
      } catch (error) {
        dispatch({
          type: "rejected",
          payload: "Something wrong happened with fitching cities...",
        });
      }
    },
    [currentCity.id]
  );

  async function postCity(newCity) {
    dispatch({ type: "loading" });

    try {
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "Post",
        body: JSON.stringify(newCity),
        headers: { "content-type": "application/json" },
      });
      const data = await res.json();
      dispatch({ type: "city/created", payload: data });
    } catch (error) {
      dispatch({
        type: "rejected",
        payload: "Something wrong happened with creating a city.",
      });
    }
  }
  async function deleteCity(id) {
    dispatch({ type: "loading" });

    try {
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });
      dispatch({ type: "city/deleted", payload: id });
    } catch (error) {
      dispatch({
        type: "rejected",
        payload: "Something wrong happened with deleting the city.",
      });
    }
  }

  return (
    <CitiesContext.Provider
      value={{ cities, loading, currentCity, getCity, postCity, deleteCity }}
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
