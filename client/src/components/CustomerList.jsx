import { format } from "date-fns";
import React, { useEffect } from "react";
import { TailSpin } from "react-loader-spinner";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const colors = ["#ff7544", "#22b9b8", "#8677fe", "#fb6485"];
const CustomerList = () => {
  const {
    userCustomers,
    searchCustomers,
    getUserCustomers,
    user,
    moneyFormat
  } = useAppContext();

  useEffect(() => {
    const getData = async () => {
      await getUserCustomers();
    };

    getData();
  }, [user, searchCustomers]);

  return (
    <div>
      {userCustomers ? (
        userCustomers.length > 0 ? (
          userCustomers.map((customer) => (
            <div
              key={customer._id}
              className="flex justify-between items-center border-b last-of-type:border-b-0 py-4"
            >
              <div className="flex gap-3 items-center">
                <div className="px-2 py-2 bg-blue-50 border border-blue-300 rounded flex items-center h-fit">
                  <div
                    style={{ color: colors[Math.floor(Math.random() * 3)] }}
                    className=" font-bold text-xl flex gap-1 items-center"
                  >
                    <span>{customer.firstname.slice(0, 1)}</span>
                    <span>{customer.lastname.slice(0, 1)}</span>
                  </div>
                </div>
                <div className="flex flex-col ">
                  <Link
                    to={`/agents/user/${customer._id}`}
                    className="text-gray-600 font-semibold"
                  >
                    {customer.firstname} {customer.lastname}
                  </Link>
                  <span className="text-sm">
                    {format(new Date(customer.createdAt), "MMM, do")}
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center">
                <span className="font-semibold  text-blue-600">
                {moneyFormat.format(customer.totalSaved)}
                </span>
                <span className="text-xs font-light text-gray-400">
                  Balance
                </span>
              </div>
            </div>
          ))
        ) : (
          <h3>No Registered Customer</h3>
        )
      ) : (
        <TailSpin />
      )}
    </div>
  );
};

export default CustomerList;
