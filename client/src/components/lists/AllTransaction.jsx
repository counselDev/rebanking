import { format } from "date-fns";
import React, { useEffect } from "react";
import { TailSpin } from "react-loader-spinner";
import { useAppContext } from "../../context/AppContext";
import SearchInput from "../SearchInput";

const AllTransaction = () => {
  const {
    user,
    getAllTransactions,
    searchAgents,
    allTransactions,
    moneyFormat
  } = useAppContext();

  useEffect(() => {
    const getData = async () => {
      await getAllTransactions();
    };

    getData();
  }, [searchAgents, user]);

  return (
    <div className="sm:p-10">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">All Transaction</h1>
        <h2 className="text-gray-600 ml-0.5">
          List of all current Transaction
        </h2>
      </div>

      <div className="mt-0 overflow-x-auto relative shadow-md sm:rounded-lg bg-white  flex-1">
        <div className="w-1/2 px-6">
          <SearchInput
            placeholder="Search Transactions"
            searchField="searchAgents"
            searcg="searchAgents"
          />
        </div>
        {allTransactions ? (
          <div className="my-0  px-2 py-4">
            <div className="flex items-center justify-between mb-5"></div>
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-sm text-blue-700 uppercase bg-gray-100">
                <tr>
                  <th scope="col" className="py-5 px-3">
                    S/N
                  </th>
                  <th scope="col" className="py-5 px-3">
                    Agent Name
                  </th>

                  <th scope="col" className="py-5 px-3">
                    Agent Phone
                  </th>
                  <th scope="col" className="py-5 px-3">
                    Agent Email
                  </th>

                  <th scope="col" className="py-5 px-3">
                    Customer
                  </th>
                  <th scope="col" className="py-5 px-3">
                    Customer Phone
                  </th>

                  <th scope="col" className="py-5 px-3">
                    Amount
                  </th>
                  <th scope="col" className="py-5 px-3">
                    Created At
                  </th>
                </tr>
              </thead>
              <tbody>
                {allTransactions.transactions.length === 0 ? (
                  <tr className="text-center font-bold text-xl py-4 px-3">
                    <td className="py-4 px-3">No Transaction Yet</td>
                  </tr>
                ) : (
                  allTransactions.transactions.map((item, index) => (
                    <tr key={item.transactionId} className="bg-white border-b">
                      <td className="py-4 px-3">{index + 1}</td>

                      <td className="py-4 px-3">
                        {item.agent.firstname} {item.agent.lastname}
                      </td>
                      <td className="py-4 px-3">{item.agent.phone}</td>
                      <td className="py-4 px-3">{item.agent.email}</td>

                      <td className="py-4 px-3">
                        {item.customer.firstname} {item.customer.lastname}
                      </td>
                      <td className="py-4 px-3">{item.customer.phone}</td>
                      <td className="py-4 px-3"> {moneyFormat.format(item.amount)}</td>
                      <td className="py-4 px-3">
                        {format(new Date(item.createdAt), "MMM, dd, yyyy")}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        ) : (
          <TailSpin />
        )}
      </div>
    </div>
  );
};

export default AllTransaction;
