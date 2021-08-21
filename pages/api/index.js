// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Twit from "twit";
const cors = require("cors")({ origin: true });
const axios = require("axios");

const init = async () => {
  let axiosConfig = {
    headers: { authorization: `Bearer ${process.env.AUTH0_ACCESS_TOKEN}` },
  };

  let res = await axios.get(
    `https://geekysrm2.us.auth0.com/api/v2/users/twitter|1854681409`,
    axiosConfig
  );

  let data = res.data;
  console.log(data);
  return data;
};

export default async function go(req, res) {
  const data = await init();
  const access_token = data.identities[0].access_token;
  const access_token_secret = data.identities[0].access_token_secret;
  const T = new Twit({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token,
    access_token_secret,
    // timeout_ms: 60 * 1000, // optional HTTP request timeout to apply to all requests.
    // strictSSL: true, // optional - requires SSL certificates to be valid.
  });

  // cors(req, resp, () => {
  //   const { accessToken, accessTokenSecret, tweets, replyID } = req.body;
  //   postThread({ accessToken, accessTokenSecret, tweets, replyID })
  //     .then((processedTweets) => resp.json({ processedTweets }))
  //     .catch((err) => resp.status(422).json({ message: err.message }));
  // });

  console.log(T);

  res.status(200).json({ name: "Soumya" });
}
