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
        <button
          // type="primary"
          // icon={<TwitterOutlined />}
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
          Fetch blog post
        </button>
      </div>
    </div>
  );
};

export default Preview;
