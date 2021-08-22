import Twit from "twit";
const { TwitThread } = require("twit-thread");
const cors = require("cors")({ origin: true });
const axios = require("axios");

async function init() {
  let axiosConfig = {
    headers: {
      authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjNySXRRd3hfUGIwQjgydk9FM3FqaCJ9.eyJpc3MiOiJodHRwczovL2dlZWt5c3JtMi51cy5hdXRoMC5jb20vIiwic3ViIjoiT1RZeGh1ZjJMT3hMOGNTclE3NnlrTE5PZ2l5SWIwUlBAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vZ2Vla3lzcm0yLnVzLmF1dGgwLmNvbS9hcGkvdjIvIiwiaWF0IjoxNjI5NTA2NDg5LCJleHAiOjE2MzIwOTg0ODksImF6cCI6Ik9UWXhodWYyTE94TDhjU3JRNzZ5a0xOT2dpeUliMFJQIiwic2NvcGUiOiJyZWFkOmNsaWVudF9ncmFudHMgY3JlYXRlOmNsaWVudF9ncmFudHMgZGVsZXRlOmNsaWVudF9ncmFudHMgdXBkYXRlOmNsaWVudF9ncmFudHMgcmVhZDp1c2VycyB1cGRhdGU6dXNlcnMgZGVsZXRlOnVzZXJzIGNyZWF0ZTp1c2VycyByZWFkOnVzZXJzX2FwcF9tZXRhZGF0YSB1cGRhdGU6dXNlcnNfYXBwX21ldGFkYXRhIGRlbGV0ZTp1c2Vyc19hcHBfbWV0YWRhdGEgY3JlYXRlOnVzZXJzX2FwcF9tZXRhZGF0YSByZWFkOnVzZXJfY3VzdG9tX2Jsb2NrcyBjcmVhdGU6dXNlcl9jdXN0b21fYmxvY2tzIGRlbGV0ZTp1c2VyX2N1c3RvbV9ibG9ja3MgY3JlYXRlOnVzZXJfdGlja2V0cyByZWFkOmNsaWVudHMgdXBkYXRlOmNsaWVudHMgZGVsZXRlOmNsaWVudHMgY3JlYXRlOmNsaWVudHMgcmVhZDpjbGllbnRfa2V5cyB1cGRhdGU6Y2xpZW50X2tleXMgZGVsZXRlOmNsaWVudF9rZXlzIGNyZWF0ZTpjbGllbnRfa2V5cyByZWFkOmNvbm5lY3Rpb25zIHVwZGF0ZTpjb25uZWN0aW9ucyBkZWxldGU6Y29ubmVjdGlvbnMgY3JlYXRlOmNvbm5lY3Rpb25zIHJlYWQ6cmVzb3VyY2Vfc2VydmVycyB1cGRhdGU6cmVzb3VyY2Vfc2VydmVycyBkZWxldGU6cmVzb3VyY2Vfc2VydmVycyBjcmVhdGU6cmVzb3VyY2Vfc2VydmVycyByZWFkOmRldmljZV9jcmVkZW50aWFscyB1cGRhdGU6ZGV2aWNlX2NyZWRlbnRpYWxzIGRlbGV0ZTpkZXZpY2VfY3JlZGVudGlhbHMgY3JlYXRlOmRldmljZV9jcmVkZW50aWFscyByZWFkOnJ1bGVzIHVwZGF0ZTpydWxlcyBkZWxldGU6cnVsZXMgY3JlYXRlOnJ1bGVzIHJlYWQ6cnVsZXNfY29uZmlncyB1cGRhdGU6cnVsZXNfY29uZmlncyBkZWxldGU6cnVsZXNfY29uZmlncyByZWFkOmhvb2tzIHVwZGF0ZTpob29rcyBkZWxldGU6aG9va3MgY3JlYXRlOmhvb2tzIHJlYWQ6YWN0aW9ucyB1cGRhdGU6YWN0aW9ucyBkZWxldGU6YWN0aW9ucyBjcmVhdGU6YWN0aW9ucyByZWFkOmVtYWlsX3Byb3ZpZGVyIHVwZGF0ZTplbWFpbF9wcm92aWRlciBkZWxldGU6ZW1haWxfcHJvdmlkZXIgY3JlYXRlOmVtYWlsX3Byb3ZpZGVyIGJsYWNrbGlzdDp0b2tlbnMgcmVhZDpzdGF0cyByZWFkOmluc2lnaHRzIHJlYWQ6dGVuYW50X3NldHRpbmdzIHVwZGF0ZTp0ZW5hbnRfc2V0dGluZ3MgcmVhZDpsb2dzIHJlYWQ6bG9nc191c2VycyByZWFkOnNoaWVsZHMgY3JlYXRlOnNoaWVsZHMgdXBkYXRlOnNoaWVsZHMgZGVsZXRlOnNoaWVsZHMgcmVhZDphbm9tYWx5X2Jsb2NrcyBkZWxldGU6YW5vbWFseV9ibG9ja3MgdXBkYXRlOnRyaWdnZXJzIHJlYWQ6dHJpZ2dlcnMgcmVhZDpncmFudHMgZGVsZXRlOmdyYW50cyByZWFkOmd1YXJkaWFuX2ZhY3RvcnMgdXBkYXRlOmd1YXJkaWFuX2ZhY3RvcnMgcmVhZDpndWFyZGlhbl9lbnJvbGxtZW50cyBkZWxldGU6Z3VhcmRpYW5fZW5yb2xsbWVudHMgY3JlYXRlOmd1YXJkaWFuX2Vucm9sbG1lbnRfdGlja2V0cyByZWFkOnVzZXJfaWRwX3Rva2VucyBjcmVhdGU6cGFzc3dvcmRzX2NoZWNraW5nX2pvYiBkZWxldGU6cGFzc3dvcmRzX2NoZWNraW5nX2pvYiByZWFkOmN1c3RvbV9kb21haW5zIGRlbGV0ZTpjdXN0b21fZG9tYWlucyBjcmVhdGU6Y3VzdG9tX2RvbWFpbnMgdXBkYXRlOmN1c3RvbV9kb21haW5zIHJlYWQ6ZW1haWxfdGVtcGxhdGVzIGNyZWF0ZTplbWFpbF90ZW1wbGF0ZXMgdXBkYXRlOmVtYWlsX3RlbXBsYXRlcyByZWFkOm1mYV9wb2xpY2llcyB1cGRhdGU6bWZhX3BvbGljaWVzIHJlYWQ6cm9sZXMgY3JlYXRlOnJvbGVzIGRlbGV0ZTpyb2xlcyB1cGRhdGU6cm9sZXMgcmVhZDpwcm9tcHRzIHVwZGF0ZTpwcm9tcHRzIHJlYWQ6YnJhbmRpbmcgdXBkYXRlOmJyYW5kaW5nIGRlbGV0ZTpicmFuZGluZyByZWFkOmxvZ19zdHJlYW1zIGNyZWF0ZTpsb2dfc3RyZWFtcyBkZWxldGU6bG9nX3N0cmVhbXMgdXBkYXRlOmxvZ19zdHJlYW1zIGNyZWF0ZTpzaWduaW5nX2tleXMgcmVhZDpzaWduaW5nX2tleXMgdXBkYXRlOnNpZ25pbmdfa2V5cyByZWFkOmxpbWl0cyB1cGRhdGU6bGltaXRzIGNyZWF0ZTpyb2xlX21lbWJlcnMgcmVhZDpyb2xlX21lbWJlcnMgZGVsZXRlOnJvbGVfbWVtYmVycyByZWFkOmVudGl0bGVtZW50cyByZWFkOmF0dGFja19wcm90ZWN0aW9uIHVwZGF0ZTphdHRhY2tfcHJvdGVjdGlvbiByZWFkOm9yZ2FuaXphdGlvbnMgdXBkYXRlOm9yZ2FuaXphdGlvbnMgY3JlYXRlOm9yZ2FuaXphdGlvbnMgZGVsZXRlOm9yZ2FuaXphdGlvbnMgY3JlYXRlOm9yZ2FuaXphdGlvbl9tZW1iZXJzIHJlYWQ6b3JnYW5pemF0aW9uX21lbWJlcnMgZGVsZXRlOm9yZ2FuaXphdGlvbl9tZW1iZXJzIGNyZWF0ZTpvcmdhbml6YXRpb25fY29ubmVjdGlvbnMgcmVhZDpvcmdhbml6YXRpb25fY29ubmVjdGlvbnMgdXBkYXRlOm9yZ2FuaXphdGlvbl9jb25uZWN0aW9ucyBkZWxldGU6b3JnYW5pemF0aW9uX2Nvbm5lY3Rpb25zIGNyZWF0ZTpvcmdhbml6YXRpb25fbWVtYmVyX3JvbGVzIHJlYWQ6b3JnYW5pemF0aW9uX21lbWJlcl9yb2xlcyBkZWxldGU6b3JnYW5pemF0aW9uX21lbWJlcl9yb2xlcyBjcmVhdGU6b3JnYW5pemF0aW9uX2ludml0YXRpb25zIHJlYWQ6b3JnYW5pemF0aW9uX2ludml0YXRpb25zIGRlbGV0ZTpvcmdhbml6YXRpb25faW52aXRhdGlvbnMiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.lJKbOokk3NNX1avmcJe8NvXc26VPOLtD7wO1lBQoE0sWw9q_HuGtE5T3mbOPEQNSaLa7woG_YLyLOSkIWT-T4wc9Rx6oEDwjA0rduDDBqNw1bV0DZFfe_9hSO0ovOuqzjs6BhrcJTjOBJosZE_BCNXNv2TB0LVtxHrcXV8HkiRlab8owliwEgCTE_SXufWJhrEsEfBVY_oLU76KITPGHLhxT9crDvQoArXglgieHk4vZFh9iUxgcbc74kU1f7E6zSFx076wNvH8SifrpULY7eYkYsZT3XM9JmIbuwN9XKBdyjYi3NZSOyyzR3_30l2gzuMlbiiS61h1BmTmgEl257w`,
    },
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
