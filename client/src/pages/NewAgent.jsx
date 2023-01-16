import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import UserAvatar from "../assets/img/user.png";
import { useAppContext } from "../context/AppContext";
import { newAgentValidator } from "../lib/formValidation";

const NewAgent = () => {
  const [select, setSelect] = useState("");
  const { getZones, isPostLoading, addAgent, zones } = useAppContext();

  useEffect(() => {
    const getData = async () => {
      await getZones();
    };

    getData();
  }, []);

  async function onSubmit(values, { resetForm }) {
    const payload = { ...values, zone: select };
    await addAgent(payload);
    resetForm();
  }

  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      phone: "",
      email: "",
      password: "",
    },
    validate: newAgentValidator,
    onSubmit,
  });

  return (
    <div className="p-6">
      <div className="mb-6 ">
        <h1 className="text-3xl font-semibold mb-2">Add Agents</h1>
        <h2 className="text-gray-600 ml-0.5">
          Please Fill all Fields Appropriately
        </h2>
      </div>
      <form
        onSubmit={formik.handleSubmit}
        className=" max-w-md mx-auto px-6 py-4 flex flex-col gap-4"
      >
        <div className="w-full flex items-center justify-center mb-8">
          <img src={UserAvatar} alt="User" className="h-24 w-24" />
        </div>
        <div>
          <input
            className="w-full px-8 py-4 rounded-lg font-medium border border-gray-400 placeholder-gray-500 text-sm focus:outline-none focus:border-blue-600 focus:bg-white"
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
            className="w-full px-8 py-4 rounded-lg font-medium border border-gray-400 placeholder-gray-500 text-sm focus:outline-none focus:border-blue-600 focus:bg-white"
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
            className="w-full px-8 py-4 rounded-lg font-medium border border-gray-400 placeholder-gray-500 text-sm focus:outline-none focus:border-blue-600 focus:bg-white"
            type="text"
            placeholder="Phone Number"
            {...formik.getFieldProps("phone")}
          />
          {formik.errors.phone && formik.touched.phone ? (
            <span className="text-sm text-rose-500">{formik.errors.phone}</span>
          ) : null}
        </div>

        <div>
          <input
            className="w-full px-8 py-4 rounded-lg font-medium border border-gray-400 placeholder-gray-500 text-sm focus:outline-none focus:border-blue-600 focus:bg-white"
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
            className="w-full px-8 py-4 rounded-lg font-medium border border-gray-400 placeholder-gray-500 text-sm focus:outline-none focus:border-blue-600 focus:bg-white"
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
          {zones ? (
            <select
              onChange={(e) => setSelect(e.target.value)}
              className="w-full px-8 py-4 rounded-lg font-medium border border-gray-400 placeholder-gray-500 text-sm focus:outline-none focus:border-blue-600 focus:bg-white"
            >
              <option value="">Select Zone</option>
              {zones.zones.map((zone) => (
                <option key={zone._id} value={zone._id}>
                  {zone.location}
                </option>
              ))}
            </select>
          ) : (
            <TailSpin width={30} height={30} />
          )}
        </div>

        <button
          type="submit"
          disabled={isPostLoading}
          className="mt-5 gap-2 disabled:bg-indigo-300 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
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
          {isPostLoading && <TailSpin width={30} height={30} />}
        </button>
      </form>
    </div>
  );
};

export default NewAgent;
