import { Link, useNavigate } from "react-router-dom";
import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";

type Token = {
  accessToken: string;
  setAccessToken: (accessToken: string) => void;
  toggleRefresh: (status: boolean) => void;
};

const Header = ({ accessToken, setAccessToken, toggleRefresh }: Token) => {
  const navigate = useNavigate();

  const logOut = () => {
    const requestOptions: any = {
      method: "GET",
      credentials: "include",
    };

    fetch(`/logout`, requestOptions)
      .catch((e) => {
        console.log("error logging out", e);
      })
      .finally(() => {
        setAccessToken("");
        toggleRefresh(false);
      });

    navigate("/");
  };

  return (
    <header className="flex justify-between py-6 mb-[60px] border-b">
      <div>
        <div>TicketService</div>
      </div>

      <div>
        {accessToken === "" ? (
          <ul className="flex gap-4">
            <li>
              <Link className="flex items-center hover:text-gray-600" to="/">
                <FaSignInAlt />
                <span className="ml-1">Login</span>
              </Link>
            </li>
            <li>
              <Link
                className="flex items-center hover:text-gray-600"
                to="/signup"
              >
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
                onClick={logOut}
              >
                <FaSignOutAlt />
                <span className="ml-1">Logout</span>
              </button>
            </li>
          </ul>
        )}
      </div>
    </header>
  );
};

export default Header;
