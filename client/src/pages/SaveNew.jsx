import React, { useEffect, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { useParams } from "react-router-dom";
import { CustomHeader } from "../components";
import { useAppContext } from "../context/AppContext";
import { useFormik } from "formik";
import { MdAddTask } from "react-icons/md";
import { newTransaction } from "../lib/formValidation";

const SaveNew = () => {
  const [userInfo, setUserInfo] = useState(null);
  const { getCustomerInfo, addSaved, isPostLoading } = useAppContext();
  let params = useParams();

  useEffect(() => {
    const getData = async () => {
      if (params.id) {
        setUserInfo(await getCustomerInfo(params.id));
      }
    };

    getData();
  }, []);

  async function onSubmit(values, { resetForm }) {
    const transaction = await addSaved({
      amount: values.amount,
      customerId: params.id,
    });
    if (transaction) {
      resetForm();
    }
  }

  const formik = useFormik({
    initialValues: {
      amount: "",
    },
    validate: newTransaction,
    onSubmit,
  });

  return (
    <div className="h-screen">
      <CustomHeader title="Save New" />

      {userInfo ? (
        <div className="px-6 py-4 flex flex-col gap-6 items-center h-full ">
          <div className="flex flex-col items-center gap-3 my-8">
            <div className="rounded-full h-20 w-20  border-2 border-indigo-600 bg-white text-indigo-600 flex items-center justify-center text-3xl font-bold">
              <span>{userInfo.firstname.slice(0, 1)}</span>
              <span>{userInfo.lastname.slice(0, 1)}</span>
            </div>
            <h3 className="font-semibold text-lg">
              {userInfo.firstname} {userInfo.lastname}
            </h3>
          </div>
          <form onSubmit={formik.handleSubmit}>
            <div>
              <input
                className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                type="number"
                placeholder="Amount to Add"
                {...formik.getFieldProps("amount")}
              />
              {formik.errors.amount && formik.touched.amount ? (
                <span className="text-sm text-rose-500">
                  {formik.errors.amount}
                </span>
              ) : null}
            </div>

            <button
              type="submit"
              disabled={isPostLoading}
              className="mt-5 disabled:bg-indigo-200 tracking-wide font-semibold bg-indigo-600 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center gap-2 justify-center focus:shadow-outline focus:outline-none"
            >
              <MdAddTask size={29} />
              <span className="ml-3">Save Anount</span>
              {isPostLoading && <TailSpin height="20" width="20" />}
            </button>
          </form>
        </div>
      ) : (
        <div className="h-screen flex items-center justify-center">
          <TailSpin />
        </div>
      )}
    </div>
  );
};

export default SaveNew;
