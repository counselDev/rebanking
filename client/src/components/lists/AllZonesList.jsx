import React, { useEffect } from "react";
import { TailSpin } from "react-loader-spinner";
import { useAppContext } from "../../context/AppContext";
import SearchInput from "../SearchInput";


const AllZoneList = () => {
  const { getZones, zones } = useAppContext();

  useEffect(() => {
    const getData = async () => {
      await getZones();
    };

    getData();
  }, []);
  return (
    <div className="sm:p-10">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">All Zones</h1>
        <h2 className="text-gray-600 ml-0.5">List of all zones created</h2>
      </div>

      <div className="mt-0 overflow-x-auto relative shadow-md sm:rounded-lg bg-white  flex-1">
        <div className="w-1/2 px-6">
          <SearchInput placeholder="Search Zones" searchField="searchZone"/>
        </div>
        {zones ? (
          <div className="my-0  px-2 py-4">
            <div className="flex items-center justify-between mb-5"></div>
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-sm text-blue-700 uppercase bg-gray-100">
                <tr>
                  <th scope="col" className="py-5 px-3">
                    S/N
                  </th>
                  <th scope="col" className="py-5 px-3">
                    Area
                  </th>

                  <th scope="col" className="py-5 px-3">
                    State
                  </th>

                  <th scope="col" className="py-5 px-3">
                    Country
                  </th>
                </tr>
              </thead>
              <tbody>
                {zones.zones.length === 0 ? (
                  <tr className="text-center font-bold text-xl py-4 px-3">
                    <td className="py-4 px-3">No Zone Yet</td>
                  </tr>
                ) : (
                  zones.zones.map((item, index) => (
                    <tr key={item._id} className="bg-white border-b">
                      <td className="py-4 px-3">{index + 1}</td>

                      <td className="py-4 px-3">{item.location}</td>
                      <td className="py-4 px-3">{item.state}</td>

                      <td className="py-4 px-3">{item.country}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        ) : (
          <TailSpin />
        )}
      </div>
    </div>
  );
};

export default AllZoneList;
