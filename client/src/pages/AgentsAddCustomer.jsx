import React, { useEffect, useState } from "react";
import { CustomHeader } from "../components";
import UserAvatar from "../assets/img/user.png";
import { useAppContext } from "../context/AppContext";
import { useFormik } from "formik";
import { newCustomerValidator } from "../lib/formValidation";
import { TailSpin } from "react-loader-spinner";

const init = {
  firstname: "",
  lastname: "",
  email: "",
  phone: "",
  address: "",
  password: "",
};

const AgentsAddCustomer = () => {
  const { getZones, addCustomer, zones, isPostLoading, user } = useAppContext();
  const [selected, setSelected] = useState();

  useEffect(() => {
    const getData = async () => {
      await getZones();
    };

    getData();
  }, [user]);

  async function onSubmit(values, { resetForm }) {
    console.log("Subbmisino");
    await addCustomer({ ...values, zone: selected });
    resetForm(init);
  }

  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
      address: "",
      password: "",
    },
    validate: newCustomerValidator,
    onSubmit,
  });

  return (
    <div className="pb-16">
      <CustomHeader title="Add New Customer" />

      <form
        className="px-6 py-4 flex flex-col gap-4 mb-12"
        onSubmit={formik.handleSubmit}
      >
        <div className="w-full flex items-center justify-center mb-8">
          <img src={UserAvatar} alt="User" className="h-24 w-24" />
        </div>
        <div>
          <input
            className="w-full px-8 py-4 rounded-lg font-medium bg-blue-50 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
            type="text"
            placeholder="First Name"
            {...formik.getFieldProps("firstname")}
          />
          {formik.errors.firstname && formik.touched.firstname ? (
            <span className="text-sm text-rose-500">
              {formik.errors.firstname}
            </span>
          ) : null}
        </div>

        <div>
          <input
            className="w-full px-8 py-4 rounded-lg font-medium bg-blue-50 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
            type="text"
            placeholder="Last Name"
            {...formik.getFieldProps("lastname")}
          />
          {formik.errors.lastname && formik.touched.lastname ? (
            <span className="text-sm text-rose-500">
              {formik.errors.lastname}
            </span>
          ) : null}
        </div>
        <div>
          <input
            className="w-full px-8 py-4 rounded-lg font-medium bg-blue-50 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
            type="email"
            placeholder="Email"
            {...formik.getFieldProps("email")}
          />
          {formik.errors.email && formik.touched.email ? (
            <span className="text-sm text-rose-500">{formik.errors.email}</span>
          ) : null}
        </div>

        <div>
          <input
            className="w-full px-8 py-4 rounded-lg font-medium bg-blue-50 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
            type="password"
            placeholder="Password"
            {...formik.getFieldProps("password")}
          />
          {formik.errors.password && formik.touched.password ? (
            <span className="text-sm text-rose-500">
              {formik.errors.password}
            </span>
          ) : null}
        </div>

        <div>
          <input
            className="w-full px-8 py-4 rounded-lg font-medium bg-blue-50 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
            type="text"
            placeholder="Phone"
            {...formik.getFieldProps("phone")}
          />
          {formik.errors.phone && formik.touched.phone ? (
            <span className="text-sm text-rose-500">{formik.errors.phone}</span>
          ) : null}
        </div>

        <div>
          <input
            className="w-full px-8 py-4 rounded-lg font-medium bg-blue-50 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
            type="type"
            placeholder="Address"
            {...formik.getFieldProps("address")}
          />
          {formik.errors.address && formik.touched.address ? (
            <span className="text-sm text-rose-500">
              {formik.errors.address}
            </span>
          ) : null}
        </div>

        <div>
          {zones && (
            <select
              className="w-full px-8 py-4 rounded-lg font-medium bg-blue-50 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
              type="type"
              placeholder="Address"
              value={selected}
              onChange={(e) => setSelected(e.target.value)}
            >
              <option>Please Select A Zone</option>
              {zones?.zones.map((zone) => (
                <option
                  key={zone._id}
                  value={zone._id}
                >{`${zone.location} ${zone.state}, ${zone.country}`}</option>
              ))}
            </select>
          )}
        </div>
        <button
          type="submit"
          disabled={isPostLoading}
          className="mt-5 disabled:bg-indigo-200 tracking-wide font-semibold bg-indigo-600 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center gap-2 justify-center focus:shadow-outline focus:outline-none"
        >
          <svg
            className="w-6 h-6 -ml-2"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
            <circle cx="8.5" cy="7" r="4" />
            <path d="M20 8v6M23 11h-6" />
          </svg>
          <span className="ml-3">Create User</span>
          {isPostLoading && <TailSpin height="20" width="20" />}
        </button>
      </form>
    </div>
  );
};

export default AgentsAddCustomer;
