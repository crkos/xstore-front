import { useEffect, useState } from "react";
import Label from "../form/Label.jsx";
import PropTypes from "prop-types";
import { useSearch } from "../../hooks/index.js";
import LiveSearch from "./LiveSearch.jsx";
import { renderItemProveedor } from "./helper/renderItemProveedor.jsx";
import { searchProveedor } from "../../api/proveedor.js";

const ProveedorSelector = ({ onSelect, prevSelected }) => {
  const [value, setValue] = useState("");
  const [proveedores, setProveedores] = useState([]);

  const { handleSearch, resetSearch } = useSearch();

  const handleChange = ({ target }) => {
    const { value } = target;
    setValue(value);
    handleSearch(searchProveedor, value, setProveedores);
  };

  const handleOnSelect = (profile) => {
    setValue(profile.nombre_proveedor);
    onSelect(profile);
    setProveedores([]);
    resetSearch();
  };

  useEffect(() => {
    if (prevSelected) setValue(prevSelected);
  }, [prevSelected]);

  return (
    <div className="relative mb-8">
      <Label htmlFor="proveedor">Proveedor</Label>
      <LiveSearch
        onChange={handleChange}
        value={value}
        name="proveedor"
        placeholder="Buscar proveedor"
        results={proveedores}
        renderItem={renderItemProveedor}
        onSelect={handleOnSelect}
      ></LiveSearch>
    </div>
  );
};

ProveedorSelector.propTypes = {
  onSelect: PropTypes.func.isRequired,
  prevSelected: PropTypes.string,
};

export default ProveedorSelector;
