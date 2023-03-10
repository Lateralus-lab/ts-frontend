import { Link, useNavigate } from "react-router-dom";
import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";

import { TypedUseSelectorHook, useSelector } from "react-redux";
import {
  selectCurrentToken,
  selectCurrentUser,
} from "../../features/auth/authSlice";
import { useDispatch } from "react-redux";
import { logOut } from "../../features/auth/authSlice";
import { RootState } from "../../app/store";
import { useLogOutMutation } from "../../features/auth/logoutApiSlice";

const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

const Header = () => {
  const userEmail = useTypedSelector(selectCurrentUser);
  const token = useTypedSelector(selectCurrentToken);

  const [logOutMutation] = useLogOutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logOutMutation(null);
    dispatch(logOut());
    navigate("/");
  };

  const welcomeUser = userEmail ? `Welcome, ${userEmail}!` : null;

  const isUserLoggedinContent = !token ? (
    <ul className="flex gap-4">
      <li>
        <Link className="flex items-center hover:text-gray-600" to="/">
          <FaSignInAlt />
          <span className="ml-1">Login</span>
        </Link>
      </li>
      <li>
        <Link className="flex items-center hover:text-gray-600" to="/signup">
          <FaUser />
          <span className="ml-1">Signup</span>
        </Link>
      </li>
    </ul>
  ) : (
    <ul className="flex gap-4">
      <li>
        <button
          className="flex items-center hover:text-gray-600"
          onClick={handleLogout}
        >
          <FaSignOutAlt />
          <span className="ml-1">Logout</span>
        </button>
      </li>
    </ul>
  );

  return (
    <header className="flex justify-between py-6 mb-[60px] border-b">
      <div className="items-center">
        <h1 className="text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-lg lg:text-2xl dark:text-white">
          Rave{" "}
          <mark className="px-2 text-white bg-blue-600 rounded dark:bg-blue-500">
            Nexus
          </mark>
        </h1>
      </div>

      <div className="flex max-w-xl gap-6 items-center">
        <div className="text-sm">{welcomeUser}</div>
        <div>{isUserLoggedinContent}</div>
      </div>
    </header>
  );
};

export default Header;
