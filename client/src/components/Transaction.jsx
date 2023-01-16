import { format } from "date-fns";
import React from "react";
import { GoArrowUp } from "react-icons/go";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const Transaction = ({ transaction }) => {
  const { user, moneyFormat } = useAppContext();
  return (
    <div className="flex justify-between items-center border-b last-of-type:border-b-0  py-4">
      <div className="flex gap-2 items-center">
        <div className="px-2 py-2 bg-blue-50 border border-blue-300 rounded flex items-center h-fit">
          <GoArrowUp size={22} className="text-blue-600" />
        </div>
        <div className="flex flex-col ">
          {user.role !== "customer" && (
            <Link
              to={`/agents/user/${transaction.customer?._id}`}
              className="text-gray-600 font-semibold"
            >
              {transaction.customer?.firstname} {transaction.customer?.lastname}
            </Link>
          )}
          <span className="text-sm">
            {format(new Date(transaction.createdAt), "MMM, do")}
          </span>
          {user?.role === "customer" && (
            <h4 className="text-sm">
              <span className="text-gray-500"> Agent: </span>
              <span className="font-semibold">{`${transaction.agent.firstname} ${transaction.agent.lastname}`}</span>
            </h4>
          )}
        </div>
      </div>
      <span className="font-semibold  text-blue-600">
        +{moneyFormat.format(transaction.amount)}
      </span>
    </div>
  );
};

export default Transaction;
