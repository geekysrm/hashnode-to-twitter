import { unfurl } from "unfurl.js";

export default async function handler(req, res) {
  const { url } = req.body;

  const result = await unfurl(url);

  res.status(200).json({ ogp: result });
}
