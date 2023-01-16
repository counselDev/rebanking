import React, { useState } from "react";
import { HiUsers } from "react-icons/hi";
import { ImUsers } from "react-icons/im";
import { IoPersonAddSharp } from "react-icons/io5";
import { MdOutlineAddLocationAlt, MdOutlinePaid } from "react-icons/md";
import { BiLocationPlus } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";

const Sidebar = () => {
  const [active, setActive] = useState(0);

  const { logout } = useAppContext();

  return (
    <aside className="hidden h-full sm:flex sm:flex-col">
      <Link
        to="#"
        className="inline-flex items-center font-semibold text-lg text-white justify-center h-20 bg-[#3428b1] hover:bg-[#2c2290] focus:bg-[#2c2290] "
      >
        Rebank
      </Link>
      <div className="flex-grow flex flex-col justify-between text-gray-300 bg-[#0a0442]">
        <nav className="flex flex-col mx-3 my-6 space-y-12">
          <div className="flex flex-col space-y-4">
            <h4 className="text-gray-400">Menu</h4>
            <Link
              to="/admin/"
              onClick={() => setActive(0)}
              style={
                active === 0
                  ? { color: "#9333ea", backgroundColor: "white" }
                  : null
              }
              className="inline-flex items-center gap-4 px-4 py-3 hover:text-gray-100 hover:bg-gray-500 focus:text-gray-400 focus:bg-gray-500 rounded-lg"
            >
              <svg
                aria-hidden="true"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
              <span className="">Dashboard</span>
            </Link>
            <Link
              to="/admin/agents"
              onClick={() => setActive(1)}
              style={
                active === 1
                  ? { color: "#9333ea", backgroundColor: "white" }
                  : null
              }
              className="inline-flex items-center gap-4 px-4 py-3 hover:text-gray-100 hover:bg-gray-500 focus:text-gray-400 focus:bg-gray-500 rounded-lg"
            >
              <ImUsers size={24} />
              <span className="">Agents</span>
            </Link>

            <Link
              to="/admin/customers"
              onClick={() => setActive(2)}
              style={
                active === 2
                  ? { color: "#9333ea", backgroundColor: "white" }
                  : null
              }
              className="inline-flex items-center gap-4 px-4 py-3 hover:text-gray-100 hover:bg-gray-500 focus:text-gray-400 focus:bg-gray-500 rounded-lg"
            >
              <HiUsers size={24} />
              <span className="">Customers</span>
            </Link>
            <Link
              to="/admin/transactions"
              onClick={() => setActive(3)}
              style={
                active === 3
                  ? { color: "#9333ea", backgroundColor: "white" }
                  : null
              }
              className="inline-flex items-center gap-4 px-4 py-3 hover:text-gray-100 hover:bg-gray-500 focus:text-gray-400 focus:bg-gray-500 rounded-lg"
            >
              <MdOutlinePaid size={29} />

              <span className="">Transactions</span>
            </Link>
            <Link
              to="/admin/zones"
              onClick={() => setActive(4)}
              style={
                active === 4
                  ? { color: "#9333ea", backgroundColor: "white" }
                  : null
              }
              className="inline-flex items-center gap-4 px-4 py-3 hover:text-gray-100 hover:bg-gray-500 focus:text-gray-400 focus:bg-gray-500 rounded-lg"
            >
              <MdOutlineAddLocationAlt size={29} />

              <span className="">Zones</span>
            </Link>
          </div>
          <div className="flex flex-col space-y-4">
            <h4 className="text-gray-400">Add</h4>
            <Link
              to="/admin/add-agent"
              onClick={() => setActive(5)}
              style={
                active === 5
                  ? { color: "#9333ea", backgroundColor: "white" }
                  : null
              }
              className="flex items-center gap-4 px-4 py-3 hover:text-gray-100 hover:bg-gray-500 focus:text-gray-400 focus:bg-gray-500 rounded-lg"
            >
              <IoPersonAddSharp size={24} />
              <span className="">Add Agent</span>
            </Link>
            <Link
              to="/admin/add-location"
              onClick={() => setActive(6)}
              style={
                active === 6
                  ? { color: "#9333ea", backgroundColor: "white" }
                  : null
              }
              className="flex items-center gap-4 px-4 py-3 hover:text-gray-100 hover:bg-gray-500 focus:text-gray-400 focus:bg-gray-500 rounded-lg"
            >
              <BiLocationPlus size={24} />
              <span className="">Add Location</span>
            </Link>
          </div>
        </nav>

        <div
          onClick={logout}
          className="inline-flex items-center px-4 h-20 border-t border-gray-700"
        >
          <button className="p-3   hover:text-gray-100 flex gap-4 hover:bg-gray-500 focus:text-gray-400 focus:bg-gray-500 rounded-lg">
            <svg
              aria-hidden="true"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            <span className="">Logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
