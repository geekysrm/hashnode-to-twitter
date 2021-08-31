import { TwitThread } from "twit-thread";
import axios from "axios";
import { AUTH0_ACCESS_TOKEN } from "./constants";

async function init(user) {
  console.log(user);
  let axiosConfig = {
    headers: {
      authorization: `Bearer ${AUTH0_ACCESS_TOKEN}`,
    },
  };

  let res = await axios.get(
    `https://geekysrm2.us.auth0.com/api/v2/users/${user.sub}`,
    axiosConfig
  );

  let data = res.data;
  return data;
}

export default async function handler(req, res) {
  const { tweets, user } = req.body;
  const data = await init(user);
  const access_token = data.identities[0].access_token;
  const access_token_secret = data.identities[0].access_token_secret;

  const postedTweets = await postTweetThread({
    accessToken: access_token,
    accessTokenSecret: access_token_secret,
    tweets: tweets.slice(0, 6),
    replyID: null,
  });

  res.status(200).json({ postedTweets });
}

async function postTweetThread({ accessToken, accessTokenSecret, tweets }) {
  const config = {
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token: accessToken,
    access_token_secret: accessTokenSecret,
    timeout_ms: 5 * 1000,
  };
  const t = new TwitThread(config);

  const textToTweetArray = tweets.map((tweet) => {
    return { text: tweet };
  });

  const data = await t.tweetThread(textToTweetArray);
  return data;
}
