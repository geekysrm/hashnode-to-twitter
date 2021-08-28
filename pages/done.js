import { useState, useEffect } from "react";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import Head from "next/head";
import { useRouter } from "next/router";
import Header from "../components/Header";

export default function ProtectedDonePage({ user }) {
  const router = useRouter();

  const [postedTweets, setPostedTweets] = useState(null);

  useEffect(() => {
    const { postedTweets: postedTweetsString } = router.query;
    console.log(postedTweetsString);
    if (!postedTweetsString) {
      console.log("here");
      router.push("/");
    } else {
      const postedTweets = JSON.parse(postedTweetsString);
      setPostedTweets(postedTweets);
    }
  }, []);

  if (!postedTweets) return <></>;
  return (
    <div className="mx-auto max-w-7xl">
      <Head>
        <script
          async
          src="https://platform.twitter.com/widgets.js"
          charset="utf-8"
        ></script>
      </Head>
      <Header user={user} />
      <section className="flex flex-col items-center mx-auto">
        <h2 className="pt-5 pb-4 pl-5 text-2xl font-bold leading-7 text-center text-gray-900 sm:text-3xl sm:truncate">
          Congrats! 🎉 <p>Your tweet thread was successfully posted!</p>
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
        <div className="flex flex-col items-center w-full">
          {postedTweets.map((tweet) => (
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
