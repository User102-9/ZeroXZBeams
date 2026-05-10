export default async function handler(req, res) {
  const { url } = req.query;
  if (!url) return res.status(400).send("No URL");

  try {
    const response = await fetch(`https://is.gd{encodeURIComponent(url)}`);
    const shortUrl = await response.text();
    res.status(200).send(shortUrl);
  } catch (error) {
    res.status(500).send("Server Error");
  }
}
