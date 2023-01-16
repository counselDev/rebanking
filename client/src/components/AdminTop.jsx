import React from "react";
import { useAppContext } from "../context/AppContext";
import { format } from "date-fns";
import { Link } from "react-router-dom";

const AdminTop = () => {
  const { user, path } = useAppContext();
  return (
    <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between">
      <div className="mr-6">
        <h1 className="text-3xl font-semibold mb-2">Dashboard</h1>
        <h2 className="text-gray-600 ml-0.5">Welcome John Doe</h2>
      </div>
      <div className="flex flex-wrap items-start justify-end -mb-3">
        <button className=" cursor-default flex px-5 py-3 text-white bg-[#3b2fbd] hover:bg-[#2c2290] focus:bg-purple-700 rounded-md ml-6 mb-3">
          <Link to={`/admin/add-location`} className="flex">
            <svg
              aria-hidden="true"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="flex-shrink-0 h-6 w-6 text-white -ml-1 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            New Agent
          </Link>
        </button>
      </div>
    </div>
  );
};

export default AdminTop;
