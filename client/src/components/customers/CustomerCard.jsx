import { useEffect, useState } from "react";
import { AiOutlineNumber } from "react-icons/ai";
import { MdMonetizationOn } from "react-icons/md";
import { TailSpin } from "react-loader-spinner";
import { useAppContext } from "../../context/AppContext";

const CustomerCard = () => {
  const {
    getSingleUserTransactions,
    singleUserTransactions,
    getUserZoneTransactions,
    userZoneTransactions,
    user,
    searchAgents,
    moneyFormat,
  } = useAppContext();
  const [allTransactions, setAllTransactions] = useState(null);

  useEffect(() => {
    const getData = async () => {
      if (user && user.role === "customer") {
        await getSingleUserTransactions();
      } else if (user && user.role === "agent") {
        await getUserZoneTransactions();
      }
    };
    getData();
  }, [user, searchAgents]);

  useEffect(() => {
    if (user && user.role === "customer" && singleUserTransactions) {
      setAllTransactions(singleUserTransactions);
    } else if (userZoneTransactions) {
      setAllTransactions(userZoneTransactions);
    }
  }, [userZoneTransactions, singleUserTransactions]);

  return (
    <div className="flex gap-2">
      <div
        className={`cursor-pointer transition delay-100 w-6/12  px-5 py-3 shadow-md  border rounded-xl bg-gradient-to-r from-indigo-500 to-blue-400`}
      >
        <div className="flex justify-between">
          <div></div>

          <div className=" w-10  h-10 flex items-center justify-center  bg-rose-400 rounded-xl m-1  bg-opacity-30">
            <MdMonetizationOn className="text-white" />
          </div>
        </div>
        <p className="text-gray-200 text-base  ">Total Amount</p>
        <div className="text-gray-50 text-lg  font-semibold  ">
          {allTransactions ? (
            moneyFormat.format(allTransactions.totalSaved)
          ) : (
            <TailSpin width={40} height={40} />
          )}
        </div>
      </div>

      <div
        className={`cursor-pointer transition delay-100 w-6/12  px-5 py-3 shadow-md  border rounded-xl bg-gradient-to-r from-green-500 to-green-400`}
      >
        <div className="flex justify-between">
          <div></div>
          <div className=" w-10  h-10 flex items-center justify-center  bg-gray-400 rounded-xl m-1  bg-opacity-30">
            <AiOutlineNumber className="text-white" />
          </div>
        </div>
        <p className="text-gray-200 text-base  ">No. Transaction(s)</p>
        <div className="text-gray-50 text-lg  font-semibold  ">
          {allTransactions ? (
            allTransactions.transactions.length
          ) : (
            <TailSpin width={40} height={40} />
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerCard;
