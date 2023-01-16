import { useFormik } from "formik";
import React from "react";
import { loginValidator } from "../lib/formValidation";
import Logo from "../assets/img/logo.png";
import { useAppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";

const Login = () => {
  const { login, clearMessage, errorMessage, isPostLoading } = useAppContext();
  const navigate = useNavigate();

  async function onSubmit(values) {
    const user = await login(values);

    if (user && user.role === "admin") {
      navigate("/admin");
    } else if (user && user.role === "customer") {
      navigate("/customers");
    } else if (user && user.role === "agent") {
      navigate("/agents");
    }
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: loginValidator,
    onSubmit,
  });

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
      <div className="relative max-w-screen-xl m-0 sm:m-20 bg-white shadow sm:rounded-lg flex justify-center flex-1">
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          {errorMessage ? (
            <div
              className="bg-[#fff5f5] border border-[#fc8181] text-[#c53030] px-2 py-4 rounded absolute top-12 right-6 flex items-center justify-between gap-4 z-50"
              role="alert"
            >
              <strong className="font-semibold">{errorMessage}!</strong>

              <span className=" px-4 py-2" onClick={clearMessage}>
                <svg
                  className="fill-current h-6 w-6 text-red-500"
                  role="button"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <title>Close</title>
                  <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                </svg>
              </span>
            </div>
          ) : null}
          <div>
            <img src={Logo} className="w-12 mx-auto" alt="" />
          </div>
          <div className="mt-12 flex flex-col items-center">
            <h1 className="text-2xl xl:text-3xl font-extrabold">
              Welcome Back!
            </h1>
            <div className="w-full flex-1 mt-1">
              <div className="my-12 border-b text-center">
                <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                  Login with E-mail
                </div>
              </div>

              <form className="mx-auto max-w-xs" onSubmit={formik.handleSubmit}>
                <div>
                  <input
                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="email"
                    placeholder="Email"
                    {...formik.getFieldProps("email")}
                  />
                  {formik.errors.email && formik.touched.email ? (
                    <span className="text-sm text-rose-500">
                      {formik.errors.email}
                    </span>
                  ) : null}
                </div>

                <div>
                  <input
                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                    type="password"
                    placeholder="Password"
                    {...formik.getFieldProps("password")}
                  />
                  {formik.errors.password && formik.touched.password ? (
                    <span className="text-sm  text-rose-500">
                      {formik.errors.password}
                    </span>
                  ) : null}
                </div>
                <button
                  type="submit"
                  disabled={isPostLoading}
                  className="mt-5 disabled:bg-violet-200 tracking-wide font-semibold bg-violet-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex gap-4 items-center justify-center focus:shadow-outline focus:outline-none"
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
                  <span className="ml-3">Login</span>
                  {isPostLoading && <TailSpin height="30" width="30" />}
                </button>
                <p className="mt-6 text-xs text-gray-600 text-center">
                  &copy; IFT Department FUTO
                </p>
              </form>
            </div>
          </div>
        </div>
        <div className="flex-1 bg-violet-100 text-center hidden lg:flex">
          <div className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat bg-loginImage"></div>
        </div>
      </div>
    </div>
  );
};

export default Login;
