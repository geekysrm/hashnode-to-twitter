import twitter from "twitter-text";

export const getTweetHtml = (tweet) => {
  const tweetHtml = twitter.autoLink(twitter.htmlEscape(tweet), {
    usernameIncludeSymbol: true,
    targetBlank: true,
  });

  //   const links = twitter.extractUrls(tweet);
  //   const lastLink = links.slice(-1)[0];
  console.log(tweetHtml);

  return tweetHtml;
};
