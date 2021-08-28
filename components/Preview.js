import styles from "../styles/Preview.module.css";
import MainTweet from "./MainTweet";
// import { Button } from "antd";
import { useRouter } from "next/router";

import { TwitterOutlined } from "@ant-design/icons";
import SubTweet from "./SubTweet";
import axios from "axios";

const Preview = ({ tweets, user }) => {
  const router = useRouter();

  const mainTweet = tweets[0];
  let restTweets = [];
  for (let i = 1; i < tweets.length; i++) restTweets.push(tweets[i]);

  return (
    <div className={styles.rootContainer}>
      <div>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="mobile-web-app-capable" content="yes" />
        <div className={styles.page}>
          <span className="pl-3 mb-0 text-2xl font-semibold text-gray-100 ">
            Thread
          </span>
          <MainTweet user={user} tweet={mainTweet} />
          {restTweets.map((tweet) => {
            return <SubTweet user={user} tweet={tweet} />;
          })}
        </div>
        <div className="fixed bottom-0 z-20 flex justify-center w-1/2 bg-[#1b2836] py-3 items-center">
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
            Tweet 🚀
          </button>
        </div>
      </div>
    </div>
  );
};

export default Preview;
