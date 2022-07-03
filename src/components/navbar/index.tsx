import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { ROUTES } from "../../router";

import { Logo } from "../logo";

const navbarStyles = {
  default:
    "block border-b border-gray-100 py-2 pr-4 pl-3 text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-gray-500 md:dark:hover:bg-transparent md:dark:hover:text-white",
  active:
    "block rounded bg-blue-700 py-2 pr-4 pl-3 text-white dark:text-white md:bg-transparent md:p-0 md:text-gray-900 underline dark:md:text-white",
};

export const Navbar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  return (
    <nav className="py-6 px-2 dark:bg-gray-900 sm:px-4 md:pt-12">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        <Link to="/" className="mr-6 flex flex-1">
          <Logo />
          <span className="sr-only">Wieni</span>
        </Link>

        <button
          onClick={() => setIsNavOpen(!isNavOpen)}
          data-collapse-toggle="mobile-menu"
          type="button"
          className="ml-3 inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden"
          aria-controls="mobile-menu"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="h-6 w-6"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            />
          </svg>
          <svg
            className="hidden h-6 w-6"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <div
          className={`${
            isNavOpen ? "block" : "hidden"
          } w-full md:block md:w-auto`}
          id="mobile-menu"
        >
          <ul className="mt-4 flex flex-col md:mt-0 md:flex-row md:space-x-8 md:text-sm md:font-medium">
            <li>
              <NavLink
                data-testid="navbar-link--home"
                to={ROUTES.HOME}
                className={({ isActive }) =>
                  isActive ? navbarStyles.active : navbarStyles.default
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                data-testid="navbar-link--recipes"
                to={ROUTES.RECIPES_NO_PAGE}
                className={({ isActive }) =>
                  isActive ? navbarStyles.active : navbarStyles.default
                }
              >
                Recipes
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
