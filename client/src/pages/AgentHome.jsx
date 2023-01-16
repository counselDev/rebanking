import React from "react";
import { Header, RecentTransactions, SearchInput } from "../components";
import { IoLocationOutline } from "react-icons/io5";
import { useAppContext } from "../context/AppContext";
import CustomerCard from "../components/customers/CustomerCard";

const AgentHome = () => {
  const { user } = useAppContext();
  return (
    <div className="font-semibold ">
      <Header />
      <div className="px-6 py-4 flex flex-col gap-4">
        <div className="flex text-sm gap-2">
          <IoLocationOutline size={22} />

          {user && <span className="text-blue-800">{user.zone.name}</span>}
        </div>
        <CustomerCard />
        <SearchInput search="searhCustomers" />

        <RecentTransactions />
      </div>
    </div>
  );
};

export default AgentHome;
