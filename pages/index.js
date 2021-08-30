import { useState } from "react";
import { useUser } from "@auth0/nextjs-auth0";
import useLocalStorage from "../utils/useLocalStorage";
import axios from "axios";
import { useRouter } from "next/router";
import checkValidUrl from "../utils/checkValidUrl";
import Header from "../components/Header";
import Spinner from "../components/icons/Spinner";
import Head from "next/head";
import { HiOutlineHashtag } from "react-icons/hi";
import { FaTwitter, FaArrowsAltH, FaGithub } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { AiOutlinePicture } from "react-icons/ai";
import { ImListNumbered } from "react-icons/im";

export default function Home() {
  const router = useRouter();

  const { user, error } = useUser();
  if (error) return <div>{error.message}</div>; // change
  const [inputUrl, setInputUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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

    setLoading(true);

    try {
      const { data } = await axios.get(`/api/scrape?url=${inputUrl}`);
      const { blogPostText, error } = data;

      if (blogPostText) {
        await setPostText(blogPostText); // blog post text stored in localStorage as postText
        await setPostUrl(inputUrl); // url stored in localStorage as postUrl
        router.push("/edit");
      }
    } catch (error) {
      console.error(error?.response?.data?.error);
      setErrorMessage(error?.response?.data?.error);
      setLoading(false);
    }
  };
  return (
    <>
      <Head>
        <title>Hashnode to Twitter</title>
      </Head>
      <div className="overflow-y-auto">
        <div className="bg-white">
          <Header user={user} />
          <main>
            {/* Hero section */}
            <div className="relative">
              <div className="absolute inset-x-0 bottom-0 bg-gray-100 h-1/2" />
              <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="relative shadow-xl sm:rounded-2xl sm:overflow-hidden">
                  <div className="absolute inset-0">
                    <img
                      className="object-cover w-full h-full"
                      src="/images/banner.jpg"
                      alt="Hashnode to Twitter"
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-r from-yellow-200 to-blue-700"
                      style={{ mixBlendMode: "multiply" }}
                    />
                  </div>
                  <div className="relative px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8">
                    <h1 className="text-4xl font-extrabold tracking-tight text-center sm:text-5xl lg:text-6xl">
                      <span className="block text-white">
                        Hashnode to Twitter
                      </span>
                    </h1>
                    <p className="max-w-lg mx-auto mt-6 text-xl text-center text-indigo-100 sm:max-w-3xl">
                      Post bite-sized summaries of your Hashnode blog post to
                      increase reach 🚀 🚀
                      {/* Improve above */}
                    </p>
                    <div className="flex flex-col max-w-sm mx-auto mt-10 sm:max-w-none sm:flex sm:justify-center">
                      <div className="flex flex-col items-center justify-center w-full">
                        <label className="mb-2 text-gray-200">
                          Enter a Hashnode blog post URL below or{" "}
                          <span
                            className="font-medium text-blue-300 cursor-pointer"
                            onClick={() =>
                              setInputUrl(
                                "https://geekysrm.hashnode.dev/what-is-tailwind-css"
                              )
                            }
                          >
                            Use example
                          </span>
                        </label>
                        <input
                          type="text"
                          placeholder="https://townhall.hashnode.com/auth0-hackathon"
                          className="block w-full h-10 px-2 mb-4 border-gray-300 rounded-md md:w-1/2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg"
                          value={inputUrl}
                          onChange={(e) => setInputUrl(e.target.value)}
                        />
                      </div>
                      <div className="flex flex-col space-y-4 sm:space-y-0 sm:mx-auto sm:inline-grid sm:gap-5">
                        <button
                          disabled={loading}
                          onClick={handleFetchClick}
                          className={`flex items-center justify-center px-4 py-3 text-base font-medium text-white bg-indigo-600 hover:bg-indigo-800 border border-transparent rounded-md shadow-sm bg-opacity-90 sm:px-8 ${
                            loading ? `cursor-not-allowed` : ``
                          }`}
                        >
                          Fetch and Tweet
                          {loading && (
                            <Spinner className="w-5 h-5 ml-2 text-white animate-spin" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Logo Cloud */}
            {/* <div className="bg-gray-100">
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
            </div> */}
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
                          Pulvinar laoreet sagittis viverra duis. In venenatis
                          sem arcu pretium pharetra at. Lectus viverra dui
                          tellus ornare pharetra.
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
                            “Cras velit quis eros eget rhoncus lacus ultrices
                            sed diam. Sit orci risus aenean curabitur donec
                            aliquet. Mi venenatis in euismod ut.”
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
                          Pulvinar laoreet sagittis viverra duis. In venenatis
                          sem arcu pretium pharetra at. Lectus viverra dui
                          tellus ornare pharetra.
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
                  Your blog's reach to the moon 🚀 🌙
                </h2>
                <p className="max-w-3xl mt-4 text-lg text-purple-200">
                  Features of <b>Hashnode to Twitter</b> at a glance.
                </p>
                <div className="grid grid-cols-1 mt-12 gap-x-6 gap-y-12 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-16">
                  <div>
                    <div>
                      <span className="flex items-center justify-center w-12 h-12 bg-white rounded-md bg-opacity-10">
                        <FaTwitter className="w-6 h-6 text-white" />
                      </span>
                    </div>
                    <div className="mt-6">
                      <h3 className="text-lg font-medium text-white">
                        Post Thread
                      </h3>
                      <p className="mt-2 text-base text-purple-200">
                        Convert your article summary to easy-to-consume tweet
                        threads with CTA to your blog post.
                      </p>
                    </div>
                  </div>
                  <div>
                    <div>
                      <span className="flex items-center justify-center w-12 h-12 bg-white rounded-md bg-opacity-10">
                        <FiEdit className="w-6 h-6 text-white" />
                      </span>
                    </div>
                    <div className="mt-6">
                      <h3 className="text-lg font-medium text-white">
                        Live Preview
                      </h3>
                      <p className="mt-2 text-base text-purple-200">
                        See a live preview of what you will tweet before
                        actually tweeting it!
                      </p>
                    </div>
                  </div>
                  <div>
                    <div>
                      <span className="flex items-center justify-center w-12 h-12 bg-white rounded-md bg-opacity-10">
                        <HiOutlineHashtag className="w-6 h-6 text-white" />
                      </span>
                    </div>
                    <div className="mt-6">
                      <h3 className="text-lg font-medium text-white">
                        Hashtags and emojis
                      </h3>
                      <p className="mt-2 text-base text-purple-200">
                        Pick and use relevant #hashtags and emojis 👋 while
                        posting your blog summary as Twitter threads.
                      </p>
                    </div>
                  </div>
                  <div>
                    <div>
                      <span className="flex items-center justify-center w-12 h-12 bg-white rounded-md bg-opacity-10">
                        <AiOutlinePicture className="w-6 h-6 text-white" />
                      </span>
                    </div>
                    <div className="mt-6">
                      <h3 className="text-lg font-medium text-white">
                        Twitter Open Graph images
                      </h3>
                      <p className="mt-2 text-base text-purple-200">
                        Twitter Open Graph images are fetched for URLs in each
                        tweet.
                      </p>
                    </div>
                  </div>
                  <div style={{ gridColumn: "2/3" }}>
                    <div>
                      <span className="flex items-center justify-center w-12 h-12 bg-white rounded-md bg-opacity-10">
                        <ImListNumbered className="w-6 h-6 text-white" />
                      </span>
                    </div>
                    <div className="mt-6">
                      <h3 className="text-lg font-medium text-white">
                        Live character counter
                      </h3>
                      <p className="mt-2 text-base text-purple-200">
                        Keep track of accurate character-count while editing
                        tweets.
                      </p>
                    </div>
                  </div>
                  <div>
                    <div>
                      <span className="flex items-center justify-center w-12 h-12 bg-white rounded-md bg-opacity-10">
                        <FaArrowsAltH className="w-6 h-6 text-white" />
                      </span>
                    </div>
                    <div className="mt-6">
                      <h3 className="text-lg font-medium text-white">
                        Fully responsive
                      </h3>
                      <p className="mt-2 text-base text-purple-200">
                        App is fully usable in desktop and mobile devices.
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
            </div>
            {/* CTA Section */}
            <div className="bg-white">
              <div className="max-w-4xl px-4 py-16 mx-auto sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 lg:flex lg:items-center lg:justify-between">
                <h2 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                  <span className="block">
                    Ready to make your Hashnode articles{" "}
                    <span className="text-indigo-500">popular?</span>
                  </span>
                  <span className="text-xl font-semibold text-indigo-500">
                    Enter your Hashnode blog post's URL and tweet away!
                  </span>
                </h2>
                <div className="mt-6 space-y-4 sm:space-y-0 sm:flex sm:space-x-5">
                  <a
                    href="#"
                    className="inline-flex items-center justify-center px-4 py-2 ml-4 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm whitespace-nowrap hover:bg-indigo-800 bg-opacity-90"
                  >
                    Login
                  </a>
                  <a
                    href="https://github.com/geekysrm/hashnode-to-twitter"
                    target="_blank"
                    rel="noreferrer noopener"
                    className="text-base font-medium text-gray-800 whitespace-nowrap hover:text-gray-900"
                  >
                    <button
                      type="button"
                      className="inline-flex items-center px-4 py-2 text-base font-medium text-gray-800 bg-gray-200 border border-transparent rounded-md shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2"
                    >
                      <FaGithub className="mr-1" /> View Source
                    </button>
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
                    <img src="/images/hashnode.png" width={22} height={22} />
                  </a>

                  <a
                    href="https://twitter.com/geekysrm"
                    target="_blank"
                    rel="noreferrer noopener"
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <span className="sr-only">Twitter</span>
                    <FaTwitter className="w-6 h-6" />
                  </a>
                  <a
                    href="https://github.com/geekysrm"
                    target="_blank"
                    rel="noreferrer noopener"
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <span className="sr-only">GitHub</span>
                    <FaGithub className="w-6 h-6" />
                  </a>
                </div>
                <p className="mt-8 text-base text-gray-400 md:mt-0 md:order-1">
                  Made with ❤️ by{" "}
                  <a
                    href="https://soumya.dev"
                    target="_blank"
                    rel="noreferrer noopener"
                    className="font-semibold hover:underline hover:text-indigo-400"
                  >
                    geekySRM
                  </a>
                </p>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}
