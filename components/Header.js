import { FaGithub } from "react-icons/fa";
import Link from "next/link";

export default function Header({ user }) {
  return (
    <header>
      <div className="relative bg-white">
        <div className="flex items-center justify-between px-4 py-6 mx-auto max-w-7xl sm:px-6 md:justify-start md:space-x-10 lg:px-8">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <a href="#">
              <span className="sr-only">Hashnode to Twitter</span>
              <img
                className="w-auto h-8 sm:h-10"
                src="https://tailwindui.com/img/logos/workflow-mark-purple-600-to-indigo-600.svg"
                alt=""
              />
            </a>
          </div>

          <div className="items-center justify-end md:flex md:flex-1 lg:w-0">
            <a
              href="https://github.com/geekysrm/hashnode-to-twitter"
              target="_blank"
              rel="noreferrer noopener"
              className="text-base font-medium text-gray-800 whitespace-nowrap hover:text-gray-900"
            >
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 text-base font-medium text-gray-800 bg-gray-200 border border-transparent rounded-md shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 "
              >
                <FaGithub style={{ marginRight: "4px" }} /> View Source
              </button>
            </a>

            {user ? (
              <div>
                <img src={user.picture} alt={user.name} />
                <h2>{user.name}</h2>
                <p>{user.email}</p>
                <div>
                  {" "}
                  <Link href="/api/auth/logout">
                    <a>Logout</a>
                  </Link>
                </div>
              </div>
            ) : (
              <Link href="/api/auth/login">
                <a className="inline-flex items-center justify-center px-4 py-2 ml-8 text-base font-medium text-white border border-transparent rounded-md shadow-sm whitespace-nowrap bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700">
                  Login
                </a>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
