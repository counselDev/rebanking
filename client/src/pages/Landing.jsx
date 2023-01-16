import { Link } from "react-router-dom";
import BannerImg from "../assets/img/invest.svg";
import Logo from "../assets/img/logo.png";
import { useAppContext } from "../context/AppContext";

const Landing = () => {
  const { handleFieldChange } = useAppContext();
  return (
    <div>
      <section className="bg-gray-50 text-gray-800 px-4 py-4 lg:px-12 ">
        <header className="flex justify-center lg:justify-between items-center md:px-28">
          <div className="flex items-center justify-conter gap-4 ">
            <img src={Logo} alt="logo" className="w-12 h-12" />
            <h3 className="font-semibold text-indigo-500 text-xl">Rebank</h3>
          </div>

          <div className=" hidden md:flex items-center gap-6 justify-center">
            <Link
              onClick={() => handleFieldChange("whoIsLogging", "customer")}
              rel="noopener noreferrer"
              to="/login"
              className="px-3 py-2  rounded border border-violet-600 text-violet-500"
            >
              Customers
            </Link>
            <Link
              onClick={() => handleFieldChange("whoIsLogging", "user")}
              rel="noopener noreferrer"
              to="/login"
              className="px-3 py-2 border rounded border-violet-600 text-violet-500 "
            >
              Agents
            </Link>
          </div>
        </header>
        <div className="container flex flex-col justify-center items-center lg:p-6 mx-auto sm:py-12 lg:py-24 lg:flex-row lg:justify-between">
          <div className="flex items-center justify-center max-w-72 p-6 mt-8 lg:mt-0 h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128">
            <img
              src={BannerImg}
              alt=""
              className="object-contain h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128"
            />
          </div>
          <div className="flex w-full flex-col justify-center p-6 text-center rounded-sm lg:max-w-md xl:max-w-lg lg:text-left">
            <h1 className="text-4xl mt-12 lg:mt-0 font-bold leading-none sm:text-6xl">
              A Better and <span className="text-violet-400">Simpified</span>{" "}
              way to
              <span className="text-violet-400"> Efficient </span>
              Savings
            </h1>
            <p className="mt-6 mb-8 text-lg sm:mb-12">
              A SaaS based core Banking System for Unconventional Financial
              Institution
            </p>

            <div className="flex flex-col space-y-4 sm:items-center sm:justify-center sm:flex-row sm:space-y-0 sm:space-x-4 lg:justify-start">
              <Link
                onClick={() => handleFieldChange("whoIsLogging", "customer")}
                rel="noopener noreferrer"
                to="/login"
                className="px-8 py-3 text-lg font-semibold rounded bg-violet-600 text-white"
              >
                Customers
              </Link>
              <Link
                onClick={() => handleFieldChange("whoIsLogging", "user")}
                rel="noopener noreferrer"
                to="/login"
                className="px-8 py-3 text-lg font-semibold border rounded border-gray-400"
              >
                Agents
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
