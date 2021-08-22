import cheerio from "cheerio";
import axios from "axios";

export default async function handler(req, res) {
  // const body = JSON.parse(req.body); // body sent from frontend POST request
  const $ = await fetchHTML("https://townhall.hashnode.com/auth0-hackathon"); // send URL from backend
  // Print the full HTML
  //   console.log(`Site HTML: ${$.html()}\n\n`);

  // Print some specific page content
  const firstInputId = $("input").attr("id");
  const isHashnodeBlogPostUrl = firstInputId === "hn-user"; // differentiate between blog pages and other pages? if it contains hashnode.com then it is a normal hashnode page, not a hashnode blog post
  res.status(200).json({ isHashnodeBlogPostUrl });
}

async function fetchHTML(url) {
  const { data } = await axios.get(url);
  return cheerio.load(data);
}
