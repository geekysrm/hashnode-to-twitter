import Twit from "twit";
const { TwitThread } = require("twit-thread");
const cors = require("cors")({ origin: true });
const axios = require("axios");

async function init() {
  let axiosConfig = {
    headers: { authorization: `Bearer ${process.env.AUTH0_ACCESS_TOKEN}` },
  };

  let res = await axios.get(
    `https://geekysrm2.us.auth0.com/api/v2/users/twitter|1428888913507078146`, // make the userID dynamic by getting it from the UI
    axiosConfig
  );

  let data = res.data;
  return data;
}

export default async function handler(req, res) {
  // const body = JSON.parse(req.body); // body sent from frontend POST request
  // body will contain the tweets and replyID and auth0 userID of the user

  const data = await init();
  const access_token = data.identities[0].access_token;
  const access_token_secret = data.identities[0].access_token_secret;
  console.log("here 27");
  // const T = new Twit({
  //   consumer_key: process.env.TWITTER_CONSUMER_KEY,
  //   consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  //   access_token,
  //   access_token_secret,
  //   // timeout_ms: 60 * 1000, // optional HTTP request timeout to apply to all requests.
  //   // strictSSL: true, // optional - requires SSL certificates to be valid.
  // });

  // cors(req, resp, () => {
  //   const { accessToken, accessTokenSecret, tweets, replyID } = req.body;
  //   postThread({ accessToken, accessTokenSecret, tweets, replyID })
  //     .then((processedTweets) => resp.json({ processedTweets }))
  //     .catch((err) => resp.status(422).json({ message: err.message }));
  // });

  // postThread({
  //   accessToken: access_token,
  //   accessTokenSecret: access_token_secret,
  //   tweets: [],
  //   replyID: null,
  // });
  await postTweetThread({
    accessToken: access_token,
    accessTokenSecret: access_token_secret,
    tweets: [],
    replyID: null,
  });

  res.status(200).json({ name: "Soumya" });
}

// function postThread({ accessToken, accessTokenSecret, tweets, replyID }) {
//   const twitterAPI = getTwitterAPI({ accessToken, accessTokenSecret });

//   const initialPromise = replyID
//     ? getTweet(twitterAPI, replyID)
//         .then(() => replyID)
//         .catch(() => {
//           // TODO: Check the type of the error and throw the message below
//           //   only when tweet isn't found.
//           throw new Error(
//             "We can't find the tweet to reply, please check the URL ヽ(。_°)ノ"
//           );
//         })
//     : Promise.resolve(null);

//   const processedTweets = [];
//   return tweets
//     .reduce((prevPromise, tweet, index) => {
//       return prevPromise
//         .then((prevID) => postTweet(twitterAPI, tweet, prevID))
//         .then(({ user: { screen_name: tweetAuthorName }, id_str: id }) => {
//           processedTweets[index] = {
//             state: "published",
//             url: tweetURL(tweetAuthorName, id),
//           };
//           return id;
//         });
//     }, initialPromise)
//     .then(() => processedTweets);
// }

async function postTweetThread({
  accessToken,
  accessTokenSecret,
  tweets,
  replyID,
}) {
  const config = {
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token: accessToken,
    access_token_secret: accessTokenSecret,
    timeout_ms: 5 * 1000,
  };
  const t = new TwitThread(config);

  await t.tweetThread([
    { text: "hey 1/3" },
    { text: "this is a thread 2/3" },
    { text: "bye 3/3" },
  ]);
  console.log("done");
}

// function getTwitterAPI({ accessToken, accessTokenSecret }) {
//   return new Twit({
//     consumer_key: process.env.TWITTER_CONSUMER_KEY,
//     consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
//     access_token: accessToken,
//     access_token_secret: accessTokenSecret,
//   });
// }
