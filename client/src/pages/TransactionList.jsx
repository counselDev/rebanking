import { CustomHeader, SearchInput, Transaction } from "../components";
import { useAppContext } from "../context/AppContext";
import { useEffect, useState } from "react";
import { TailSpin } from "react-loader-spinner";

const TransactionList = () => {
  const {
    userZoneTransactions,
    getUserZoneTransactions,
    singleUserTransactions,
    getSingleUserTransactions,
    searchAgents,
    searchCustomers,
    user,
  } = useAppContext();

  const [transactions, setTransactions] = useState(null);

  useEffect(() => {
    const getData = async () => {
      if (user && user.role !== "customer") {
        await getUserZoneTransactions();
      } else if (user && user.role === "customer") {
        await getSingleUserTransactions();
      }
    };
    getData();
  }, [user, searchAgents, searchCustomers]);

  useEffect(() => {
    if (user && user.role === "customer" && singleUserTransactions) {
      setTransactions(singleUserTransactions.transactions);
    } else if (userZoneTransactions) {
      setTransactions(userZoneTransactions.transactions);
    }
  }, [userZoneTransactions, singleUserTransactions]);

  return (
    <div className="pb-16">
      <CustomHeader title="All Transactions" />
      <div className="bg-white py-4 px-6 font-normal">
        <SearchInput placeholder="Search Transactions" />
        <div className="mt-6">
          {transactions ? (
            transactions.length > 0 ? (
              transactions?.map((transaction) => (
                <Transaction key={transaction._id} transaction={transaction} />
              ))
            ) : (
              <h3>No Transaction Made Yet</h3>
            )
          ) : (
            <TailSpin />
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionList;
