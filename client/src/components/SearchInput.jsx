import React from "react";
import { BsSearch } from "react-icons/bs";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const SearchInput = ({ placeholder, searchField, search }) => {
  const {
    user,
    path,
    searchAgents,
    handleFieldChange,
    searchCustomers,
  } = useAppContext();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = (value) => {
    if (user && user.role === "customer") {
      handleFieldChange("searchAgents", value);
      if (location.pathname !== "/customers/transactions") {
        navigate(`/customers/transactions`);
      }
    } else if (user && user.role === "agent") {
      handleFieldChange("searchCustomers", value);
      if (location.pathname !== `/${path}/customers`) {
        navigate(`/${path}/customers`);
      }
    } else {
      handleFieldChange(searchField, value);
    }
  };
  return (
    <div className="relative w-full flex gap-4 mt-4">
      <BsSearch size={28} className="absolute  mt-3 ml-4 text-gray-400" />

      <input
        type="text"
        role="search"
        onChange={(e) => handleSearch(e.target.value)}
        value={
          user.role === "customer"
            ? searchAgents
            : user.role === "agent"
            ? searchCustomers
            : search
        }
        placeholder={placeholder}
        className="w-full pl-16 pr-4 py-4 rounded-lg font-medium bg-blue-50 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
      />
    </div>
  );
};

export default SearchInput;
