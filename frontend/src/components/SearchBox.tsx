import { Box, Button, TextField } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import FeedList from "../pages/feed-list/FeedList.page";
import { FeedItems } from "../api/endpoints/public-feed/feedTypes";
import {
  useGetFeedEndpoint,
  useGetFeedEndpointWithParams,
} from "../api/endpoints/public-feed/feedGetApi";

const SearchBox = () => {
  // State to store the input value
  const { data, isLoading, isError } = useGetFeedEndpoint();
  const { mutate: queryWithParams, isLoading: isLoadingWithParams } =
    useGetFeedEndpointWithParams();
  const [feedItems, setFeedItems] = useState<FeedItems>();
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (data) {
      setFeedItems(data);
    }
  }, [data]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputElement = inputRef.current;
    if (inputElement) {
      inputElement.value = e.target.value;
    }
  };

  // Function to handle the button click
  const handleButtonClick = () => {
    const inputElement = inputRef.current;
    if (inputElement) {
      const tag = inputElement.value;
      queryWithParams({ tags: tag });
    }
  };

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <h2>SEARCH IMAGES ON FLICKR</h2>
        <TextField
          id="outlined-basic"
          label="Outlined"
          variant="outlined"
          placeholder="Enter tag..."
          size="small"
          ref={inputRef}
          onChange={handleInputChange}
        />
        <Button variant="contained" onClick={handleButtonClick}>
          Search!
        </Button>
      </Box>
      <Box>
        <FeedList feed={feedItems} isLoading={isLoading} isError={isError} />
      </Box>
    </>
  );
};

export default SearchBox;
