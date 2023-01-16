import { TailSpin } from "react-loader-spinner";
import { useAppContext } from "../context/AppContext";
import { useEffect, useState } from "react";
import Transaction from "./Transaction";

const RecentTransactions = () => {
  const [transactions, setTransactions] = useState(null);

  const {
    userZoneTransactions,
    getAllTransactions,
    user,
    allTransactions,
    singleUserTransactions,
    getSingleUserTransactions,
    getUserZoneTransactions,
  } = useAppContext();

  useEffect(() => {
    const getData = async () => {
      if (user && user.role === "agent") {
        await getUserZoneTransactions();
      } else if (user && user.role === "admin") {
        await getAllTransactions();
      }else if(user && user.role === "customer"){
        await getSingleUserTransactions()
      }
    };

    getData();
  }, [user]);

  useEffect(() => {
    if (user && user.role === "customer" && singleUserTransactions) {
      setTransactions(singleUserTransactions.transactions);
    } else if (user && user.role === "admin" && allTransactions) {
      setTransactions(allTransactions.transactions);
    } else if (userZoneTransactions) {
      setTransactions(userZoneTransactions.transactions);
    }
  }, [userZoneTransactions, singleUserTransactions, allTransactions]);

  return (
    <div className="bg-white p-4 font-normal mb-12">
      <h2 className="mb-3 text-sm font-semibold text-gray-600">
        Recent Transactions
      </h2>
      {transactions ? (
        transactions.length > 0 ? (
          transactions
            .slice(0, 4)
            .map((transaction) => (
              <Transaction key={transaction._id} transaction={transaction} />
            ))
        ) : (
          <h3>No Transaction Recorded</h3>
        )
      ) : (
        <TailSpin />
      )}
    </div>
  );
};

export default RecentTransactions;
