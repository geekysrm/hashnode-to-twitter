import styles from "../styles/Preview.module.css";
import MainTweet from "./MainTweet";
import { useRouter } from "next/router";
import SubTweet from "./SubTweet";
import axios from "axios";

const Preview = ({ tweets, user }) => {
  const router = useRouter();

  const mainTweet = tweets[0];
  let restTweets = [];
  for (let i = 1; i < tweets.length; i++) restTweets.push(tweets[i]);

  return (
    <div className={styles.rootContainer}>
      <div className="border-r border-l border-solid border-[#eff3f4] border-t rounded-sm">
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="mobile-web-app-capable" content="yes" />
        <div className={styles.page}>
          <div className="border-solid border-[#eff3f4] border-b pb-4">
            <p className="pl-3 mb-0 text-2xl font-semibold text-gray-900 ">
              Thread
            </p>
          </div>
          <MainTweet user={user} tweet={mainTweet} />
          {restTweets.map((tweet) => {
            return <SubTweet user={user} tweet={tweet} />;
          })}
          <div className="fixed bottom-0 z-20 flex items-center justify-center w-1/2 py-3 bg-white">
            <button
              className="flex items-center justify-center px-4 py-3 text-base font-medium text-white bg-indigo-500 border border-transparent rounded-md shadow-sm bg-opacity-60 hover:bg-opacity-70 sm:px-8"
              onClick={async () => {
                console.log(tweets);
                const { data } = await axios.post(`/api/`, {
                  tweets,
                });
                router.push(
                  {
                    pathname: "/done",
                    query: { postedTweets: JSON.stringify(data.postedTweets) },
                  },
                  "/done"
                );
              }}
            >
              Tweet <span className="ml-3">🚀</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preview;
