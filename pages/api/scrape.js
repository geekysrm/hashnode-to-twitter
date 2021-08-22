import cheerio from "cheerio";
import axios from "axios";

export default async function handler(req, res) {
  const url = req.query.url;
  const containsHashnodeDotCom = url.includes("hashnode.com");

  const $ = await fetchHTML(`${url}`); // send URL from backend
  // Print the full HTML
  //   console.log(`Site HTML: ${$.html()}\n\n`);

  const firstInputId = $("input").attr("id");
  const isHashnodeBlogPostUrl =
    !containsHashnodeDotCom && firstInputId === "hn-user"; // differentiate between blog pages and other pages? if it contains hashnode.com then it is a normal hashnode page, not a hashnode blog post
  //   res.status(200).json({ isHashnodeBlogPostUrl });

  if (!isHashnodeBlogPostUrl) {
    res.status(401).json({ error: "not a hashnode blogpost url" });
  } else {
    // is hashnode blog post URL
    console.log($.html());
    res.status(200).json({ html: $.html() });
  }
}

async function fetchHTML(url) {
  const { data } = await axios.get(url);
  return cheerio.load(data);
}
