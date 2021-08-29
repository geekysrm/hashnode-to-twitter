import runes from "runes";
import twitter from "twitter-text";

// export default function countChars(str) {
//   str = str.trim();
//   // Regular expression to match emoji
//   const regexExp =
//     /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/gi;
//   let countEmojis = 0;
//   const charArray = runes(str);
//   charArray.forEach((char) => {
//     const isEmoji = regexExp.test(char);
//     if (isEmoji) {
//       countEmojis++;
//     }
//   });
// }

export default function countChars(str) {
  const length = twitter.getTweetLength(str);
  console.log(length);
  return length;
}
