import { useEffect } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { MdAdd } from "react-icons/md";
import { TailSpin } from "react-loader-spinner";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const Card = () => {
  const { getUserCustomers, userCustomers, user } = useAppContext();

  useEffect(() => {
    const getData = async () => {
      getUserCustomers();
    };
    getData();
  }, [user]);
  return (
    <div className="flex gap-2">
      <div
        className={`cursor-pointer transition delay-100 w-6/12  px-5 py-3 shadow-md  border rounded-xl bg-gradient-to-r from-yellow-600 to-yellow-500`}
      >
        <div className="flex justify-between">
          <div></div>

          <div className=" w-10  h-10 flex items-center justify-center  bg-rose-400 rounded-xl m-1  bg-opacity-30">
            <AiOutlineUser className="text-white" />
          </div>
        </div>
        <p className="text-gray-200 text-base  ">No. Customers</p>
        <div className="text-gray-50 text-lg  font-semibold  ">
          {userCustomers ? (
            userCustomers.length
          ) : (
            <TailSpin width={40} height={40} />
          )}
        </div>
      </div>

      <Link
        to="/agents/add"
        className={`cursor-pointer transition delay-100 w-6/12  px-5 py-3 shadow-md  border rounded-xl bg-gradient-to-r from-blue-400 to-blue-300`}
      >
        <div className="flex justify-between">
          <div></div>

          <div className=" w-10  h-10 flex items-center justify-center  bg-rose-400 rounded-xl m-1  bg-opacity-30">
            <MdAdd className="text-white" />
          </div>
        </div>
        <p className="text-gray-200 text-base  ">Add New User</p>
        <div className="text-gray-50   font-semibold">Click</div>
      </Link>
    </div>
  );
};

export default Card;
