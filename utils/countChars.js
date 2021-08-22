import runes from "runes";

export default function countChars(str) {
  str = str.trim();
  // Regular expression to match emoji
  const regexExp =
    /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/gi;
  let countEmojis = 0;
  const charArray = runes(str);
  charArray.forEach((char) => {
    const isEmoji = regexExp.test(char);
    if (isEmoji) {
      countEmojis++;
    }
  });
}
