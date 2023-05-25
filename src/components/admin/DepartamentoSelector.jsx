import { useEffect, useState } from "react";
import Label from "../form/Label.jsx";
import PropTypes from "prop-types";
import { useSearch } from "../../hooks/index.js";
import LiveSearch from "./LiveSearch.jsx";
import { renderItemDepartamento } from "./helper/renderItemDepartamento.jsx";
import { searchDepartamento } from "../../api/departamento.js";

const DepartamentoSelector = ({ onSelect, prevSelected }) => {
  const [value, setValue] = useState("");
  const [departamentos, setDepartamentos] = useState([]);

  const { handleSearch, resetSearch } = useSearch();

  const handleChange = ({ target }) => {
    const { value } = target;
    setValue(value);
    handleSearch(searchDepartamento, value, setDepartamentos);
  };

  const handleOnSelect = (profile) => {
    setValue(profile.nombre_departamento);
    onSelect(profile);
    setDepartamentos([]);
    resetSearch();
  };

  useEffect(() => {
    if (prevSelected) setValue(prevSelected);
  }, [prevSelected]);

  return (
    <div className="relative mb-8">
      <Label htmlFor="sucursal">Departamento</Label>
      <LiveSearch
        onChange={handleChange}
        value={value}
        name="departamento"
        placeholder="Buscar departamento"
        results={departamentos}
        renderItem={renderItemDepartamento}
        onSelect={handleOnSelect}
      ></LiveSearch>
    </div>
  );
};

DepartamentoSelector.propTypes = {
  onSelect: PropTypes.func.isRequired,
  prevSelected: PropTypes.string,
};

export default DepartamentoSelector;
