import { AiOutlineLogout } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import UserAvatar from ".././assets/img/user.png";
import { useAppContext } from "../context/AppContext";

const Header = () => {
  const { user, logout } = useAppContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="flex justify-between bg-white items-center pb-2 z-50 py-8 px-6">
      <div className="flex items-center gap-4 ">
        <img src={UserAvatar} alt="User" className="w-8 h-8 object-contain" />
        <h4 className="font-semibold text-base text-blue-900">
          <span className="text-gray-500 font-medium"> Welcome! </span>
          {user && `${user.firstname} ${user.lastname}`}
        </h4>
      </div>

      <AiOutlineLogout
        onClick={handleLogout}
        size={22}
        className="text-rose-400 cursor-pointer"
      />
    </div>
  );
};

export default Header;
