export default async function handler(req, res) {
  const { url } = req.query;

  // Basic validation to prevent unnecessary crashes
  if (!url) {
    return res.status(400).send("Error: No URL provided");
  }

  try {
    // Add a timeout to prevent the function from hanging indefinitely
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    const apiUrl = `https://is.gd{encodeURIComponent(url)}`;
    
    const response = await fetch(apiUrl, { signal: controller.signal });
    const shortUrl = await response.text();

    clearTimeout(timeoutId);

    if (response.ok && shortUrl.startsWith("https://is.gd")) {
      return res.status(200).send(shortUrl);
    } else {
      // If the shortener rejects the link, return its error message
      return res.status(500).send(shortUrl || "Invalid link or API rejection");
    }
  } catch (error) {
    console.error("Vercel Function Error:", error);
    return res.status(500).send("Server Error: " + error.message);
  }
}
