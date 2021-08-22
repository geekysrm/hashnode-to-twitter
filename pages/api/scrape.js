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
    !containsHashnodeDotCom && firstInputId === "hn-user";
  //   res.status(200).json({ isHashnodeBlogPostUrl });

  if (!isHashnodeBlogPostUrl) {
    res.status(401).json({ error: "not a hashnode blogpost url" });
  } else {
    // is hashnode blog post URL
    // console.log($.html());
    const html = $.html();
    const hello = $(
      "div#__next > div > div.blog-post-area > main > article > div.blog-content-wrapper.article-main-wrapper > section.blog-content-main"
    )
      .last("div")
      .find("div.prose")
      .html();
    console.log(hello);
    // res.status(200).json({ html });
  }
}

async function fetchHTML(url) {
  const { data } = await axios.get(url);
  return cheerio.load(data);
}
