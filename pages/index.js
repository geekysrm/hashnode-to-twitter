import { useState } from "react";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0";
import { FaGithub } from "react-icons/fa";
import useLocalStorage from "../utils/useLocalStorage";
import axios from "axios";
import { useRouter } from "next/router";
import checkValidUrl from "../utils/checkValidUrl";

export default function Home() {
  const router = useRouter();

  const { user, error } = useUser();
  if (error) return <div>{error.message}</div>; // change
  const [inputUrl, setInputUrl] = useState("");
  const [postText, setPostText] = useLocalStorage("postText", "");
  const [postUrl, setPostUrl] = useLocalStorage("postUrl", "");

  const handleFetchClick = async () => {
    if (!inputUrl) {
      return;
      // show error in UI that please enter a URL
    }
    const isValidUrl = checkValidUrl(inputUrl);
    if (!isValidUrl) {
      return;
      // show error in UI that please enter a valid URL
    }

    // also check if it is a valid URL or not
    const { data } = await axios.get(`/api/scrape?url=${inputUrl}`);
    const { blogPostText, error } = data;

    if (error) {
      // show error message in UI that not a hashnode blog, please enter a hashnode blog post url
    }
    if (blogPostText) {
      await setPostText(blogPostText); // blog post text stored in localStorage as postText
      await setPostUrl(inputUrl); // url stored in localStorage as postUrl
      router.push("/edit");
    }
  };
  return (
    <div className="overflow-y-auto">
      <div className="bg-white">
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
        <main>
          {/* Hero section */}
          <div className="relative">
            <div className="absolute inset-x-0 bottom-0 bg-gray-100 h-1/2" />
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
              <div className="relative shadow-xl sm:rounded-2xl sm:overflow-hidden">
                <div className="absolute inset-0">
                  {/* <img
                    className="object-cover w-full h-full"
                    src="https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2830&q=80&sat=-100"
                    alt="People working on laptops"
                  /> */}
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-purple-800 to-indigo-700"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </div>
                <div className="relative px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8">
                  <h1 className="text-4xl font-extrabold tracking-tight text-center sm:text-5xl lg:text-6xl">
                    <span className="block text-white">
                      Hashnode to Twitter
                    </span>
                  </h1>
                  <p className="max-w-lg mx-auto mt-6 text-xl text-center text-indigo-200 sm:max-w-3xl">
                    Post bite-sized summaries of your Hashnode blog post to
                    increase reach 🚀 🚀
                    {/* Improve above */}
                  </p>
                  <div className="max-w-sm mx-auto mt-10 sm:max-w-none sm:flex sm:justify-center">
                    <div className="space-y-4 sm:space-y-0 sm:mx-auto sm:inline-grid sm:gap-5">
                      <input
                        type="text"
                        placeholder="https://townhall.hashnode.com/auth0-hackathon"
                        className="block w-full h-10 px-2 border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg"
                        value={inputUrl}
                        onChange={(e) => setInputUrl(e.target.value)}
                      />
                      {/* Add example URL i.e. townhall blog on Auth0? */}

                      <button
                        onClick={handleFetchClick}
                        className="flex items-center justify-center px-4 py-3 text-base font-medium text-white bg-indigo-500 border border-transparent rounded-md shadow-sm bg-opacity-60 hover:bg-opacity-70 sm:px-8"
                      >
                        Fetch and Tweet
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Logo Cloud */}
          <div className="bg-gray-100">
            <div className="px-4 py-16 mx-auto max-w-7xl sm:px-6 lg:px-8">
              <p className="text-sm font-semibold tracking-wide text-center text-gray-500 uppercase">
                Trusted by over 5 very average small businesses
              </p>
              <div className="grid grid-cols-2 gap-8 mt-6 md:grid-cols-6 lg:grid-cols-5">
                <div className="flex justify-center col-span-1 md:col-span-2 lg:col-span-1">
                  <img
                    className="h-12"
                    src="https://tailwindui.com/img/logos/tuple-logo-gray-400.svg"
                    alt="Tuple"
                  />
                </div>
                <div className="flex justify-center col-span-1 md:col-span-2 lg:col-span-1">
                  <img
                    className="h-12"
                    src="https://tailwindui.com/img/logos/mirage-logo-gray-400.svg"
                    alt="Mirage"
                  />
                </div>
                <div className="flex justify-center col-span-1 md:col-span-2 lg:col-span-1">
                  <img
                    className="h-12"
                    src="https://tailwindui.com/img/logos/statickit-logo-gray-400.svg"
                    alt="StaticKit"
                  />
                </div>
                <div className="flex justify-center col-span-1 md:col-span-2 md:col-start-2 lg:col-span-1">
                  <img
                    className="h-12"
                    src="https://tailwindui.com/img/logos/transistor-logo-gray-400.svg"
                    alt="Transistor"
                  />
                </div>
                <div className="flex justify-center col-span-2 md:col-span-2 md:col-start-4 lg:col-span-1">
                  <img
                    className="h-12"
                    src="https://tailwindui.com/img/logos/workcation-logo-gray-400.svg"
                    alt="Workcation"
                  />
                </div>
              </div>
            </div>
          </div>
          {/* Alternating Feature Sections */}
          <div className="relative pt-16 pb-32 overflow-hidden">
            <div
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-gray-100"
            />
            <div className="relative">
              <div className="lg:mx-auto lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:grid-flow-col-dense lg:gap-24">
                <div className="max-w-xl px-4 mx-auto sm:px-6 lg:py-16 lg:max-w-none lg:mx-0 lg:px-0">
                  <div>
                    <div>
                      <span className="flex items-center justify-center w-12 h-12 rounded-md bg-gradient-to-r from-purple-600 to-indigo-600">
                        <svg
                          className="w-6 h-6 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                          />
                        </svg>
                      </span>
                    </div>
                    <div className="mt-6">
                      <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">
                        Stay on top of customer support
                      </h2>
                      <p className="mt-4 text-lg text-gray-500">
                        Semper curabitur ullamcorper posuere nunc sed. Ornare
                        iaculis bibendum malesuada faucibus lacinia porttitor.
                        Pulvinar laoreet sagittis viverra duis. In venenatis sem
                        arcu pretium pharetra at. Lectus viverra dui tellus
                        ornare pharetra.
                      </p>
                      <div className="mt-6">
                        <a
                          href="#"
                          className="inline-flex px-4 py-2 text-base font-medium text-white border border-transparent rounded-md shadow-sm bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                        >
                          Get started
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="pt-6 mt-8 border-t border-gray-200">
                    <blockquote>
                      <div>
                        <p className="text-base text-gray-500">
                          “Cras velit quis eros eget rhoncus lacus ultrices sed
                          diam. Sit orci risus aenean curabitur donec aliquet.
                          Mi venenatis in euismod ut.”
                        </p>
                      </div>
                      <footer className="mt-3">
                        <div className="flex items-center space-x-3">
                          <div className="flex-shrink-0">
                            <img
                              className="w-6 h-6 rounded-full"
                              src="https://images.unsplash.com/photo-1509783236416-c9ad59bae472?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80"
                              alt=""
                            />
                          </div>
                          <div className="text-base font-medium text-gray-700">
                            Marcia Hill, Digital Marketing Manager
                          </div>
                        </div>
                      </footer>
                    </blockquote>
                  </div>
                </div>
                <div className="mt-12 sm:mt-16 lg:mt-0">
                  <div className="pl-4 -mr-48 sm:pl-6 md:-mr-16 lg:px-0 lg:m-0 lg:relative lg:h-full">
                    <img
                      className="w-full shadow-xl rounded-xl ring-1 ring-black ring-opacity-5 lg:absolute lg:left-0 lg:h-full lg:w-auto lg:max-w-none"
                      src="https://tailwindui.com/img/component-images/inbox-app-screenshot-1.jpg"
                      alt="Inbox user interface"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-24">
              <div className="lg:mx-auto lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:grid-flow-col-dense lg:gap-24">
                <div className="max-w-xl px-4 mx-auto sm:px-6 lg:py-32 lg:max-w-none lg:mx-0 lg:px-0 lg:col-start-2">
                  <div>
                    <div>
                      <span className="flex items-center justify-center w-12 h-12 rounded-md bg-gradient-to-r from-purple-600 to-indigo-600">
                        <svg
                          className="w-6 h-6 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                          />
                        </svg>
                      </span>
                    </div>
                    <div className="mt-6">
                      <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">
                        Better understand your customers
                      </h2>
                      <p className="mt-4 text-lg text-gray-500">
                        Semper curabitur ullamcorper posuere nunc sed. Ornare
                        iaculis bibendum malesuada faucibus lacinia porttitor.
                        Pulvinar laoreet sagittis viverra duis. In venenatis sem
                        arcu pretium pharetra at. Lectus viverra dui tellus
                        ornare pharetra.
                      </p>
                      <div className="mt-6">
                        <a
                          href="#"
                          className="inline-flex px-4 py-2 text-base font-medium text-white border border-transparent rounded-md shadow-sm bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                        >
                          Get started
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-12 sm:mt-16 lg:mt-0 lg:col-start-1">
                  <div className="pr-4 -ml-48 sm:pr-6 md:-ml-16 lg:px-0 lg:m-0 lg:relative lg:h-full">
                    <img
                      className="w-full shadow-xl rounded-xl ring-1 ring-black ring-opacity-5 lg:absolute lg:right-0 lg:h-full lg:w-auto lg:max-w-none"
                      src="https://tailwindui.com/img/component-images/inbox-app-screenshot-2.jpg"
                      alt="Customer profile user interface"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Gradient Feature Section */}
          <div className="bg-gradient-to-r from-purple-800 to-indigo-700">
            <div className="max-w-4xl px-4 py-16 mx-auto sm:px-6 sm:pt-20 sm:pb-24 lg:max-w-7xl lg:pt-24 lg:px-8">
              <h2 className="text-3xl font-extrabold tracking-tight text-white">
                Inbox support built for efficiency
              </h2>
              <p className="max-w-3xl mt-4 text-lg text-purple-200">
                Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus.
                Et magna sit morbi lobortis. Blandit aliquam sit nisl euismod
                mattis in.
              </p>
              <div className="grid grid-cols-1 mt-12 gap-x-6 gap-y-12 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-16">
                <div>
                  <div>
                    <span className="flex items-center justify-center w-12 h-12 bg-white rounded-md bg-opacity-10">
                      <svg
                        className="w-6 h-6 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                        />
                      </svg>
                    </span>
                  </div>
                  <div className="mt-6">
                    <h3 className="text-lg font-medium text-white">
                      Unlimited Inboxes
                    </h3>
                    <p className="mt-2 text-base text-purple-200">
                      Ac tincidunt sapien vehicula erat auctor pellentesque
                      rhoncus. Et magna sit morbi lobortis.
                    </p>
                  </div>
                </div>
                <div>
                  <div>
                    <span className="flex items-center justify-center w-12 h-12 bg-white rounded-md bg-opacity-10">
                      <svg
                        className="w-6 h-6 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                        />
                      </svg>
                    </span>
                  </div>
                  <div className="mt-6">
                    <h3 className="text-lg font-medium text-white">
                      Manage Team Members
                    </h3>
                    <p className="mt-2 text-base text-purple-200">
                      Ac tincidunt sapien vehicula erat auctor pellentesque
                      rhoncus. Et magna sit morbi lobortis.
                    </p>
                  </div>
                </div>
                <div>
                  <div>
                    <span className="flex items-center justify-center w-12 h-12 bg-white rounded-md bg-opacity-10">
                      <svg
                        className="w-6 h-6 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </span>
                  </div>
                  <div className="mt-6">
                    <h3 className="text-lg font-medium text-white">
                      Spam Report
                    </h3>
                    <p className="mt-2 text-base text-purple-200">
                      Ac tincidunt sapien vehicula erat auctor pellentesque
                      rhoncus. Et magna sit morbi lobortis.
                    </p>
                  </div>
                </div>
                <div>
                  <div>
                    <span className="flex items-center justify-center w-12 h-12 bg-white rounded-md bg-opacity-10">
                      <svg
                        className="w-6 h-6 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                    </span>
                  </div>
                  <div className="mt-6">
                    <h3 className="text-lg font-medium text-white">
                      Compose in Markdown
                    </h3>
                    <p className="mt-2 text-base text-purple-200">
                      Ac tincidunt sapien vehicula erat auctor pellentesque
                      rhoncus. Et magna sit morbi lobortis.
                    </p>
                  </div>
                </div>
                <div>
                  <div>
                    <span className="flex items-center justify-center w-12 h-12 bg-white rounded-md bg-opacity-10">
                      <svg
                        className="w-6 h-6 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    </span>
                  </div>
                  <div className="mt-6">
                    <h3 className="text-lg font-medium text-white">
                      Team Reporting
                    </h3>
                    <p className="mt-2 text-base text-purple-200">
                      Ac tincidunt sapien vehicula erat auctor pellentesque
                      rhoncus. Et magna sit morbi lobortis.
                    </p>
                  </div>
                </div>
                <div>
                  <div>
                    <span className="flex items-center justify-center w-12 h-12 bg-white rounded-md bg-opacity-10">
                      <svg
                        className="w-6 h-6 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
                        />
                      </svg>
                    </span>
                  </div>
                  <div className="mt-6">
                    <h3 className="text-lg font-medium text-white">
                      Saved Replies
                    </h3>
                    <p className="mt-2 text-base text-purple-200">
                      Ac tincidunt sapien vehicula erat auctor pellentesque
                      rhoncus. Et magna sit morbi lobortis.
                    </p>
                  </div>
                </div>
                <div>
                  <div>
                    <span className="flex items-center justify-center w-12 h-12 bg-white rounded-md bg-opacity-10">
                      <svg
                        className="w-6 h-6 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                        />
                      </svg>
                    </span>
                  </div>
                  <div className="mt-6">
                    <h3 className="text-lg font-medium text-white">
                      Email Commenting
                    </h3>
                    <p className="mt-2 text-base text-purple-200">
                      Ac tincidunt sapien vehicula erat auctor pellentesque
                      rhoncus. Et magna sit morbi lobortis.
                    </p>
                  </div>
                </div>
                <div>
                  <div>
                    <span className="flex items-center justify-center w-12 h-12 bg-white rounded-md bg-opacity-10">
                      <svg
                        className="w-6 h-6 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                    </span>
                  </div>
                  <div className="mt-6">
                    <h3 className="text-lg font-medium text-white">
                      Connect with Customers
                    </h3>
                    <p className="mt-2 text-base text-purple-200">
                      Ac tincidunt sapien vehicula erat auctor pellentesque
                      rhoncus. Et magna sit morbi lobortis.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Stats section */}
          <div className="relative bg-gray-900">
            <div className="absolute bottom-0 h-80 xl:inset-0 xl:h-full xl:w-full">
              <div className="w-full h-full xl:grid xl:grid-cols-2">
                <div className="h-full xl:relative xl:col-start-2">
                  <img
                    className="object-cover w-full h-full opacity-25 xl:absolute xl:inset-0"
                    src="https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2830&q=80&sat=-100"
                    alt="People working on laptops"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-gray-900 xl:inset-y-0 xl:left-0 xl:h-full xl:w-32 xl:bg-gradient-to-r"
                  />
                </div>
              </div>
            </div>
            <div className="max-w-4xl px-4 mx-auto sm:px-6 lg:max-w-7xl lg:px-8 xl:grid xl:grid-cols-2 xl:grid-flow-col-dense xl:gap-x-8">
              <div className="relative pt-12 pb-64 sm:pt-24 sm:pb-64 xl:col-start-1 xl:pb-24">
                <h2 className="text-sm font-semibold tracking-wide uppercase">
                  <span className="text-transparent bg-gradient-to-r from-purple-300 to-indigo-300 bg-clip-text">
                    Valuable Metrics
                  </span>
                </h2>
                <p className="mt-3 text-3xl font-extrabold text-white">
                  Get actionable data that will help grow your business
                </p>
                <p className="mt-5 text-lg text-gray-300">
                  Rhoncus sagittis risus arcu erat lectus bibendum. Ut in
                  adipiscing quis in viverra tristique sem. Ornare feugiat
                  viverra eleifend fusce orci in quis amet. Sit in et vitae
                  tortor, massa. Dapibus laoreet amet lacus nibh integer quis.
                  Eu vulputate diam sit tellus quis at.
                </p>
                <div className="grid grid-cols-1 mt-12 gap-y-12 gap-x-6 sm:grid-cols-2">
                  <p>
                    <span className="block text-2xl font-bold text-white">
                      8K+
                    </span>
                    <span className="block mt-1 text-base text-gray-300">
                      <span className="font-medium text-white">Companies</span>{" "}
                      use laoreet amet lacus nibh integer quis.
                    </span>
                  </p>
                  <p>
                    <span className="block text-2xl font-bold text-white">
                      25K+
                    </span>
                    <span className="block mt-1 text-base text-gray-300">
                      <span className="font-medium text-white">
                        Countries around the globe
                      </span>{" "}
                      lacus nibh integer quis.
                    </span>
                  </p>
                  <p>
                    <span className="block text-2xl font-bold text-white">
                      98%
                    </span>
                    <span className="block mt-1 text-base text-gray-300">
                      <span className="font-medium text-white">
                        Customer satisfaction
                      </span>{" "}
                      laoreet amet lacus nibh integer quis.
                    </span>
                  </p>
                  <p>
                    <span className="block text-2xl font-bold text-white">
                      12M+
                    </span>
                    <span className="block mt-1 text-base text-gray-300">
                      <span className="font-medium text-white">
                        Issues resolved
                      </span>{" "}
                      lacus nibh integer quis.
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* CTA Section */}
          <div className="bg-white">
            <div className="max-w-4xl px-4 py-16 mx-auto sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 lg:flex lg:items-center lg:justify-between">
              <h2 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                <span className="block">Ready to get started?</span>
                <span className="block text-transparent bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text">
                  Get in touch or create an account.
                </span>
              </h2>
              <div className="mt-6 space-y-4 sm:space-y-0 sm:flex sm:space-x-5">
                <a
                  href="#"
                  className="flex items-center justify-center px-4 py-3 text-base font-medium text-white border border-transparent rounded-md shadow-sm bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                >
                  Learn more
                </a>
                <a
                  href="#"
                  className="flex items-center justify-center px-4 py-3 text-base font-medium text-indigo-800 border border-transparent rounded-md shadow-sm bg-indigo-50 hover:bg-indigo-100"
                >
                  Get started
                </a>
              </div>
            </div>
          </div>
        </main>
        <footer className="bg-gray-50" aria-labelledby="footerHeading">
          <h2 id="footerHeading" className="sr-only">
            Footer
          </h2>
          <div className="px-4 pt-16 pb-8 mx-auto max-w-7xl sm:px-6 lg:pt-24 lg:px-8">
            <div className="pt-8 mt-12 border-t border-gray-200 md:flex md:items-center md:justify-between lg:mt-16">
              <div className="flex space-x-6 md:order-2">
                <a
                  href="https://geekysrm.hashnode.dev/"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">Hashnode</span>
                  <img
                    src="https://i.imgur.com/9hzNnvU.png"
                    width={22}
                    height={22}
                  />
                </a>

                <a
                  href="https://twitter.com/geekysrm"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">Twitter</span>
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a
                  href="https://github.com/geekysrm"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">GitHub</span>
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
              <p className="mt-8 text-base text-gray-400 md:mt-0 md:order-1">
                Made with ❤️ by{" "}
                <a
                  href="https://soumya.dev"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="hover:underline"
                >
                  geekySRM
                </a>
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
