import React from "react";
import { CustomerList, CustomHeader, SearchInput } from "../components";

const AllCustomers = () => {
  return (
    <div className="pb-16">
      <CustomHeader title="Your Customers" />

      <div className="px-6 py-4 flex flex-col gap-4">
        <SearchInput
          placeholder="Search Customers"
          searchField="searchCustomers"
        />
        <CustomerList />
      </div>
    </div>
  );
};

export default AllCustomers;
