import React, { useEffect, useState } from "react";
import { CustomHeader } from "../components";
import { Link, useParams } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { TailSpin } from "react-loader-spinner";
import { IoIosAdd } from "react-icons/io";
import Transaction from "../components/Transaction";
import { format } from "date-fns";

const UserProfile = () => {
  let params = useParams();
  const [userInfo, setUserInfo] = useState(null);
  const { getCustomerInfo, moneyFormat } = useAppContext();

  useEffect(() => {
    const getData = async () => {
      if (params.id) {
        setUserInfo(await getCustomerInfo(params.id));
      }
    };

    getData();
  }, []);

  return userInfo ? (
    <div className="">
      <CustomHeader title={`${userInfo.firstname} ${userInfo.lastname}`} />

      <div className="px-6 py-4">
        <div className="bg-indigo-500 p-4 rounded-xl text-white my-4">
          <h4 className="text-center">Avialable Balance</h4>

          <h2 className="text-3xl font-bold my-6 text-center">
            {moneyFormat.format(userInfo.totalSaved)}
          </h2>

          <div className="flex items-center justify-between text-sm">
            <p>
              Last Saved: &#8358;{userInfo.customerSavings[0]?.amount || 0}{" "}
            </p>

            <p>
              {userInfo.customerSavings[0]
                ? format(
                    new Date(userInfo.customerSavings[0]?.createdAt),
                    "MMM, do"
                  )
                : "No savings yet"}
            </p>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between py-6">
            <h2 className="font-semibold">
              Activity({userInfo.numOfTransactions})
            </h2>
            <Link
              to={`/agents/save/${userInfo._id}`}
              className="flex gap-2 border border-blue-600 rounded bg-white items-center justify-center py-2 px-3 text-blue-600 font-semibold"
            >
              <IoIosAdd size={25} />
              Save New
            </Link>
          </div>

          <div>
            {userInfo.customerSavings ? (
              userInfo.customerSavings.length > 0 ? (
                userInfo.customerSavings?.map((transaction) => (
                  <Transaction
                    key={transaction._id}
                    transaction={transaction}
                  />
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
    </div>
  ) : (
    <div className="h-screen flex items-center justify-center">
      <TailSpin />
    </div>
  );
};

export default UserProfile;
