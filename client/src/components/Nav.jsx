import { Link, useLocation } from "react-router-dom";

import { useLogout } from "../hooks/useLogout";
const Nav = () => {
  const { pathname } = useLocation();
  const { logout } = useLogout();
  return (
    <>
      <div className="fixed top-4 right-4">
        <button
          onClick={() => logout()}
          className="bg-fuchsia-600 p-2 rounded-md hover:bg-fuchsia-500 text-white font-bold"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-log-out size-5"
          >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" x2="9" y1="12" y2="12" />
          </svg>
        </button>
      </div>
      <nav className="w-fit rounded-lg shadow-md bg-neutral-500 text-white fixed top-4 left-1/2 overflow-hidden -translate-x-1/2">
        <ul className="flex items-center justify-between">
          <li
            className={`cursor-pointer px-3 py-2 hover:bg-neutral-600 ${
              pathname === "/text-to-image" ? "bg-neutral-700" : ""
            }`}
          >
            <Link to="/text-to-image"> From Text</Link>
          </li>
          <li
            className={`cursor-pointer px-3 py-2 hover:bg-neutral-600 ${
              pathname === "/image-to-image" ? "bg-neutral-700" : ""
            }`}
          >
            <Link to="/image-to-image">From Image</Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Nav;
