import { Link } from "react-router-dom";
import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";

import { useSelector } from "react-redux";
import {
  selectCurrentToken,
  selectCurrentUser,
} from "../../features/auth/authSlice";
import { useDispatch } from "react-redux";
import { logOut } from "../../features/auth/authSlice";

const Header = () => {
  const user = useSelector(selectCurrentUser);
  const token = useSelector(selectCurrentToken);

  const dispatch = useDispatch();

  const welcomeUser = user ? `Welcome, ${user}!` : null;

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
          onClick={() => dispatch(logOut())}
        >
          <FaSignOutAlt />
          <span className="ml-1">Logout</span>
        </button>
      </li>
    </ul>
  );

  return (
    <header className="flex justify-between py-6 mb-[60px] border-b">
      <div>
        <div>TicketService</div>
      </div>

      <div className="flex max-w-xl gap-6 items-center">
        <div className="text-sm">{welcomeUser}</div>
        <div>{isUserLoggedinContent}</div>
      </div>
    </header>
  );
};

export default Header;
