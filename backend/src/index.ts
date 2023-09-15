import express, { Express, Request, Response } from "express";
import axios from "axios";

const PORT = 3000;
const app: Express = express();

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

app.get("/api/public-feed", async (req: Request, res: Response) => {
  try {
    // Replace 'YOUR_FLICKR_API_KEY' with your actual Flickr API key
    const flickrApiUrl = `https://www.flickr.com/services/feeds/photos_public.gne`;

    // Fetch data from the Flickr public feed
    const response = await axios.get(flickrApiUrl);
    const { data } = response;

    // Extract and send the image URLs to the client
    res.json(data);
  } catch (error) {
    console.error("Error fetching Flickr data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log("Server is running on port 3000");
});
