import twitter from "twitter-text";

export default function countChars(str) {
  const length = twitter.getTweetLength(str);
  return length;
}
