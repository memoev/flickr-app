export const getBaseFeedApiUrl = (): string => {
  return process.env.FEED_API_URL || "http://localhost:8000/api";
};
