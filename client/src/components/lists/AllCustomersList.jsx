import React, { useEffect } from "react";
import { TailSpin } from "react-loader-spinner";
import { Link } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import SearchInput from "../SearchInput";

const AllCustomersList = () => {
  const {
    getAllCustomers,
    user,
    searchCustomers,
    allCustomers,
    moneyFormat,
  } = useAppContext();

  useEffect(() => {
    const getData = async () => {
      await getAllCustomers();
    };

    getData();
  }, [searchCustomers, user]);
  return (
    <div className="sm:p-10">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">All Customers</h1>
        <h2 className="text-gray-600 ml-0.5">
          List of all current registered Customers
        </h2>
      </div>

      <div className="mt-0 overflow-x-auto relative shadow-md sm:rounded-lg bg-white  flex-1">
        <div className="w-1/2 px-6">
          <SearchInput
            placeholder="Seacrh Customer"
            searchField="searchCustomers"
            search={searchCustomers}
          />
        </div>
        {allCustomers ? (
          <div className="my-0  px-2 py-4">
            <div className="flex items-center justify-between mb-5"></div>
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-sm text-blue-700 uppercase bg-gray-100">
                <tr>
                  <th scope="col" className="py-5 px-3">
                    S/N
                  </th>
                  <th scope="col" className="py-5 px-3">
                    First Name
                  </th>

                  <th scope="col" className="py-5 px-3">
                    Last Name
                  </th>

                  <th scope="col" className="py-5 px-3">
                    Email
                  </th>

                  <th scope="col" className="py-5 px-3">
                    Phone
                  </th>

                  <th scope="col" className="py-5 px-3">
                    State/Country
                  </th>
                  <th scope="col" className="py-5 px-3">
                    Location
                  </th>
                  <th scope="col" className="py-5 px-3">
                    Total Saved
                  </th>
                  <th scope="col" className="py-5 px-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {allCustomers.customers.length === 0 ? (
                  <tr className="text-center font-bold text-xl py-4 px-3">
                    <td className="py-4 px-3">No Customers Yet</td>
                  </tr>
                ) : (
                  allCustomers.customers.map((item, index) => (
                    <tr key={item._id} className="bg-white border-b">
                      <td className="py-4 px-3">{index + 1}</td>

                      <td className="py-4 px-3">{item.firstname}</td>
                      <td className="py-4 px-3">{item.lastname}</td>

                      <td className="py-4 px-3">{item.email}</td>
                      <td className="py-4 px-3">{item.phone}</td>
                      <td className="py-4 px-3">
                        {item.zone.state}/{item.zone.country}
                      </td>
                      <td className="py-4 px-3">{item.zone.location}</td>
                      <td className="py-4 px-3">
                        {moneyFormat.format(item.totalSaved)}
                      </td>
                      <td className="py-4 px-3">
                        <Link
                          to={`/admin/customers/${item._id}`}
                          className="mr-2 font-medium bg-white text-blue-900 p-1 rounded border border-blue-900 hover:underline"
                        >
                          Details
                        </Link>
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

export default AllCustomersList;
