import { Link } from "react-router-dom";
import { useContext } from "react";
import { FiLogIn, FiUser } from "react-icons/fi";
import { AuthContext } from "../../context/AuthContext";
import logo from "../../assets/logo.svg";

export function Header() {
  const { singnedIn, loadingAuth } = useContext(AuthContext);

  return (
    <div className="w-full flex items-center justify-center h-16 bg-white drop-shadow mb-4">
      <header className="flex w-full max-w-7xl items-center justify-between px-4 mx-auto">
        <Link to={"/"}>
          <img src={logo} alt=" logo" />
        </Link>

        {singnedIn && !loadingAuth && (
          <Link to={"/dashboard"}>
            <FiUser size={24} color="black" />
          </Link>
        )}
        {!singnedIn && !loadingAuth && (
          <Link to={"/login"}>
            <FiLogIn size={24} color="black" />
          </Link>
        )}
      </header>
    </div>
  );
}
