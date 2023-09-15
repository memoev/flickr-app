import { Request, Response } from "express";
import axios from "axios";
import { parseString, ValidationError } from "xml2js";
import { FlickrEntry, FlickrResponse } from "../interfaces/Flickr";
import { modelTransformation } from "../utils/helper";

export const getFeed = async (req: Request, res: Response) => {
  try {
    const { tags } = req.query;
    const FLICKR_API_URL = !!tags
      ? `${process.env.FLICKR_API_URL}?tags=${tags}`
      : process.env.FLICKR_API_URL;

    // Fetch data from the Flickr public feed
    const response = await axios.get(FLICKR_API_URL);
    const { data } = response;
    const parsedData: Array<FlickrEntry> = [];

    // Parse the XML response into a JavaScript object
    parseString(data, (err: ValidationError, result: FlickrResponse) => {
      if (err) {
        throw err;
      }
      const { entry } = result.feed;
      parsedData.push(...entry);
    });

    // Transform the data into a more usable format
    const transformedData = modelTransformation(parsedData);

    res.status(200).json(transformedData);
  } catch (error) {
    console.error("Error fetching Flickr data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
