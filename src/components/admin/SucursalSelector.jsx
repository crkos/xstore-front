import { useEffect, useState } from "react";
import Label from "../form/Label.jsx";
import PropTypes from "prop-types";
import { useSearch } from "../../hooks/index.js";
import LiveSearch from "./LiveSearch.jsx";
import { searchSucursal } from "../../api/sucursal.js";
import { renderItemSucursal } from "./helper/renderFunctions.jsx";

const SucursalSelector = ({ onSelect, prevSelected }) => {
  const [value, setValue] = useState("");
  const [sucursales, setSucursales] = useState([]);

  const { handleSearch, resetSearch } = useSearch();

  const handleChange = ({ target }) => {
    const { value } = target;
    setValue(value);
    handleSearch(searchSucursal, value, setSucursales);
  };

  const handleOnSelect = (profile) => {
    setValue(profile.nombre_sucursal);
    onSelect(profile);
    setSucursales([]);
    resetSearch();
  };

  useEffect(() => {
    if (prevSelected) setValue(prevSelected);
  }, [prevSelected]);

  return (
    <div className="relative mb-8">
      <Label htmlFor="sucursal">Sucursal</Label>
      <LiveSearch
        onChange={handleChange}
        value={value}
        name="sucursal"
        placeholder="Buscar Sucursal"
        results={sucursales}
        renderItem={renderItemSucursal}
        onSelect={handleOnSelect}
      ></LiveSearch>
    </div>
  );
};

SucursalSelector.propTypes = {
  onSelect: PropTypes.func.isRequired,
  prevSelected: PropTypes.string,
};

export default SucursalSelector;
