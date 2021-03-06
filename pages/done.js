import { useState, useEffect } from "react";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import Head from "next/head";
import Header from "../components/Header";

export default function ProtectedDonePage({ user }) {
  const [postedTweets, setPostedTweets] = useState([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const postedTweetsString =
        window.localStorage.getItem("postedTweetsString");
      if (postedTweetsString) {
        const postedTweets = JSON.parse(postedTweetsString);
        setPostedTweets(postedTweets);
      }
    }
  }, []);

  if (postedTweets?.length === 0) return <></>;
  return (
    <div className="mx-auto max-w-7xl">
      <Head>
        <title>Tweets Posted - Hashnode to Twitter</title>
        <script
          async
          src="https://platform.twitter.com/widgets.js"
          charset="utf-8"
        ></script>
      </Head>
      <Header user={user} />
      <section className="flex flex-col items-center mx-auto">
        <h2 className="pt-5 pb-4 pl-5 text-2xl font-bold leading-7 text-center text-gray-900 sm:text-3xl sm:truncate">
          Congrats! 🎉{" "}
          <p className="mt-1">Your tweet thread was successfully posted!</p>
        </h2>
        <span className="text-gray-500">
          Click{" "}
          <a
            href={`https://twitter.com/${user.nickname}/status/${postedTweets[0].id_str}`}
            target="_blank"
            rel="noreferrer noopener"
            className="text-blue-500 hover:text-blue-600"
          >
            here
          </a>{" "}
          to view it on Twitter.
        </span>
        <p className="absolute top-1/2">Loading tweets...</p>
        <div className="z-40 flex flex-col items-center w-full px-5 md:px-0">
          {postedTweets?.map((tweet) => (
            <blockquote className="twitter-tweet">
              <a
                href={`https://twitter.com/${user.nickname}/status/${tweet.id_str}`}
              ></a>
            </blockquote>
          ))}
        </div>
      </section>
    </div>
  );
}

export const getServerSideProps = withPageAuthRequired();
