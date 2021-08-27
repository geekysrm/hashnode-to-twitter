import styles from "../styles/Preview.module.css";
import MainTweet from "./MainTweet";
// import { Button } from "antd";
import { useRouter } from "next/router";

import { TwitterOutlined } from "@ant-design/icons";
import SubTweet from "./SubTweet";
import axios from "axios";

const Preview = ({ tweets }) => {
  const router = useRouter();

  const mainTweet = tweets[0];
  let restTweets = [];
  for (let i = 1; i < tweets.length; i++) restTweets.push(tweets[i]);

  return (
    <div className={styles.rootContainer}>
      <h1 style={{ color: "white", textAlign: "center" }}>
        Here's how your tweets will look
      </h1>
      <div>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="mobile-web-app-capable" content="yes" />
        <div className={styles.page}>
          <h2 style={{ color: "white", textAlign: "left", marginBottom: 0 }}>
            Thread
          </h2>
          <MainTweet tweet={mainTweet} />
          {restTweets.map((tweet) => {
            return <SubTweet tweet={tweet} />;
          })}
        </div>
        <div className="fixed bottom-0.5 z-20 flex justify-center w-1/2 bg-[#1b2836] py-3 items-center">
          <button
            className="flex items-center justify-center px-4 py-3 text-base font-medium text-white bg-indigo-500 border border-transparent rounded-md shadow-sm bg-opacity-60 hover:bg-opacity-70 sm:px-8"
            onClick={async () => {
              console.log(tweets);
              const { data } = await axios.post(`/api/`, {
                tweets,
              });
              console.log(data.postedTweets);

              router.push(
                {
                  pathname: "/done",
                  query: { mainTweetId: data.postedTweets[0].id_str },
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
