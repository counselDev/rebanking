import { RiHome5Fill } from "react-icons/ri";
import { IoMdListBox } from "react-icons/io";
import { AiOutlineUserAdd } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { MdPaid } from "react-icons/md";
import { useState } from "react";

const Navbar = () => {
  const { path, user } = useAppContext();
  const [active, setActive] = useState(1);
  return (
    <div className="flex max-w-md mx-auto gap-4 z-50 fixed bottom-0 px-8 w-screen bg-white items-center justify-around py-2">
      <Link
        to={`/${path}/`}
        onClick={() => setActive(1)}
        className={`flex flex-col  items-center ${
          active === 1 ? "text-blue-700" : "text-gray-500"
        }`}
      >
        <RiHome5Fill size={22} />
        <span className=" text-xs">Home</span>
      </Link>
      {user?.role !== "customer" && (
        <Link
          to={`/${path}/customers`}
          onClick={() => setActive(2)}
          className={`flex flex-col  items-center ${
            active === 2 ? "text-blue-700" : "text-gray-500"
          } `}
        >
          <IoMdListBox size={22} />
          <span className="text-xs font-light">Customers</span>
        </Link>
      )}
      <Link
        to={`/${path}/transactions`}
        onClick={() => setActive(3)}
        className={`flex flex-col  items-center ${
          active === 3 ? "text-blue-700" : "text-gray-500"
        } `}
      >
        <MdPaid size={22} />
        <span className="text-xs">Transactions</span>
      </Link>
      {user?.role !== "customer" && (
        <Link
          to={`/${path}/add`}
          onClick={() => setActive(4)}
          className={`flex flex-col  items-center ${
            active === 4 ? "text-blue-700" : "text-gray-500"
          } `}
        >
          <AiOutlineUserAdd size={22} />
          <span className="text-xs">Add</span>
        </Link>
      )}
    </div>
  );
};

export default Navbar;
