import cheerio from "cheerio";
import axios from "axios";

export default async function handler(req, res) {
  const url = req.query.url;

  const $ = await fetchHTML(url);

  const firstInputId = $("input").attr("id");
  const isHashnodeBlogPostUrl = firstInputId === "hn-user";

  if (!isHashnodeBlogPostUrl) {
    res.status(401).json({ error: "not a hashnode blogpost url" });
  } else {
    const blogPostText = $(
      "div#__next > div > div.blog-post-area > main > article > div.blog-content-wrapper.article-main-wrapper > section.blog-content-main"
    )
      .last("div")
      .find("div.prose")
      .text();
    const cleanedBlogPostText = blogPostText.trim().replaceAll("\n", " ");

    res.status(200).json({ blogPostText: cleanedBlogPostText });
  }
}

async function fetchHTML(url) {
  const { data } = await axios.get(url);
  return cheerio.load(data);
}
