import { useFormik } from "formik";
import { MdAddLocationAlt } from "react-icons/md";
import { TailSpin } from "react-loader-spinner";
import Location from "../assets/img/pin.png";
import { useAppContext } from "../context/AppContext";
import { newLocationValidator } from "../lib/formValidation";

const NewLocation = () => {
  const { addZone, isPostLoading } = useAppContext();

  async function onSubmit(values, { resetForm }) {
    console.log("Running");
    await addZone(values);
    resetForm();
  }

  const formik = useFormik({
    initialValues: {
      location: "",
      state: "",
      country: "",
    },
    validate: newLocationValidator,
    onSubmit,
  });
  return (
    <div className="p-6">
      <div className="mb-6 ">
        <h1 className="text-3xl font-semibold mb-2">Add Location</h1>
        <h2 className="text-gray-600 ml-0.5">
          Please Fill all Fields Appropriately
        </h2>
      </div>
      <form
        onSubmit={formik.handleSubmit}
        className=" max-w-md mx-auto px-6 py-4 flex flex-col gap-4"
      >
        <div className="w-full flex items-center justify-center mb-8">
          <img src={Location} alt="User" className="h-24 w-24" />
        </div>
        <div>
          <input
            className="w-full px-8 py-4 rounded-lg font-medium border border-gray-400 placeholder-gray-500 text-sm focus:outline-none focus:border-blue-600 focus:bg-white"
            type="text"
            placeholder="Area/Region"
            {...formik.getFieldProps("location")}
          />
          {formik.errors.location && formik.touched.location ? (
            <span className="text-sm text-rose-500">
              {formik.errors.location}
            </span>
          ) : null}
        </div>

        <div>
          <input
            className="w-full px-8 py-4 rounded-lg font-medium border border-gray-400 placeholder-gray-500 text-sm focus:outline-none focus:border-blue-600 focus:bg-white"
            type="text"
            placeholder="State"
            {...formik.getFieldProps("state")}
          />
          {formik.errors.state && formik.touched.state ? (
            <span className="text-sm text-rose-500">{formik.errors.state}</span>
          ) : null}
        </div>

        <div>
          <input
            className="w-full px-8 py-4 rounded-lg font-medium border border-gray-400 placeholder-gray-500 text-sm focus:outline-none focus:border-blue-600 focus:bg-white"
            type="text"
            placeholder="Country"
            {...formik.getFieldProps("country")}
          />{" "}
          {formik.errors.country && formik.touched.country ? (
            <span className="text-sm text-rose-500">
              {formik.errors.country}
            </span>
          ) : null}
        </div>

        <button
          type="submit"
          disabled={isPostLoading}
          className="mt-5 gap-2 disabled:bg-indigo-300  tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
        >
          <MdAddLocationAlt size={25} />
          <span className="ml-3">Create Location</span>
          {isPostLoading && <TailSpin width={30} height={30} />}
        </button>
      </form>
    </div>
  );
};

export default NewLocation;
