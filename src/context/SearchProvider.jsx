import { createContext, useState } from "react";
import { useNotification } from "../hooks";

export const SearchContext = createContext();

let timeoutId;
const debounce = (func, delay) => {
  return (...args) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(null, args);
    }, delay);
  };
};

// eslint-disable-next-line react/prop-types
const SearchProvider = ({ children }) => {
  const { updateNotification } = useNotification();
  const [searching, setSearching] = useState(false);
  const [results, setResults] = useState([]);
  const [resultsNotFound, setResultsNotFound] = useState(false);

  const search = async (method, query, updateFun) => {
    const { error, results } = await method(query);
    if (error) return updateNotification("error", error);

    if (!results.length) {
      setResults([]);
      updateFun && updateFun([]);
      return setResultsNotFound(true);
    }

    setResultsNotFound(false);

    setResults(results);
    updateFun && updateFun([...results]);
  };

  const debounceFunc = debounce(search, 350);

  const handleSearch = (method, query, updaterFun) => {
    setSearching(true);
    if (!query.trim()) {
      updaterFun && updaterFun([]);
      return resetSearch();
    }

    debounceFunc(method, query, updaterFun);
  };

  const resetSearch = () => {
    setSearching(false);
    setResults([]);
    setResultsNotFound(false);
  };

  return (
    <SearchContext.Provider
      value={{ resetSearch, handleSearch, searching, resultsNotFound, results }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export default SearchProvider;
