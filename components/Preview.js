import styles from "../styles/Preview.module.css";
import MainTweet from "./MainTweet";
import { useRouter } from "next/router";
import SubTweet from "./SubTweet";
import axios from "axios";
import { getTweetHtml } from "../utils/extractTwitterEntities";
import { useState } from "react";
import { FaTwitter } from "react-icons/fa";
import useLocalStorage from "../utils/useLocalStorage";

const Preview = ({ tweets, user }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [postedTweetsString, setpostedTweetsString] = useLocalStorage(
    "postedTweetsString",
    ""
  );
  console.log(tweets);

  const originalMainTweet = tweets[0];
  const { tweetHtml: mainTweet, lastLink } = getTweetHtml(originalMainTweet);
  let restTweets = [];
  for (let i = 1; i < tweets.length; i++) {
    const originalSubTweet = tweets[i];
    const { tweetHtml: subTweet, lastLink } = getTweetHtml(originalSubTweet);
    restTweets.push({ subTweet, lastLink });
  }

  return (
    <div className={styles.rootContainer}>
      <div className="border-r border-l border-solid border-[#eff3f4] border-t rounded-sm">
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="mobile-web-app-capable" content="yes" />
        <div className={styles.page}>
          <div className="border-solid border-[#eff3f4] border-b pb-4">
            <p className="flex items-center pl-3 mb-0 text-2xl font-semibold text-gray-900">
              <p>Thread</p>
              <p className="ml-2 text-lg text-gray-500">(Preview)</p>
            </p>
          </div>
          <MainTweet user={user} tweet={mainTweet} lastLink={lastLink} />
          {restTweets.map((tweet) => {
            return (
              <SubTweet
                key={tweet.subTweet}
                user={user}
                tweet={tweet.subTweet}
                lastLink={tweet.lastLink}
              />
            );
          })}

          <div className="fixed bottom-0 z-20 flex flex-col items-center justify-center w-full py-3 bg-white md:flex-row md:-ml-16 md:w-1/2">
            {(loading && tweets?.length) > 6 && (
              <p className="mb-2 mr-2 text-indigo-600 md:absolute md:left-1/4">
                Posting first 6 tweets...
              </p>
            )}
            <button
              className={`flex items-center justify-center px-4 py-3 text-base font-medium text-white bg-indigo-600 hover:bg-indigo-800 border border-transparent rounded-md shadow-sm bg-opacity-90 sm:px-8 ${
                loading ? `cursor-not-allowed` : ``
              }`}
              onClick={async () => {
                setLoading(true);
                const { data } = await axios.post(`/api/`, {
                  tweets,
                  user,
                });
                await setpostedTweetsString(data.postedTweets);

                router.push("/done");
              }}
            >
              Tweet{" "}
              <span className={`ml-3 ${loading ? `animate-bounce` : ``}`}>
                <FaTwitter />
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preview;
