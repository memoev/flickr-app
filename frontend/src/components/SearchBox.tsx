import { Box, Button, TextField } from "@mui/material";
import React, { useRef } from "react";
import { useGetFeedEndpointWithParams } from "../api/endpoints/public-feed/feedGetApi";

const SearchBox: React.FC = () => {
  // State to store the input value
  const [inputValue, setInputValue] = React.useState<string>("");
  const { mutate: queryWithParams, isLoading: isLoadingWithParams } =
    useGetFeedEndpointWithParams();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  // Function to handle the button click
  const handleButtonClick = () => {
    const tag = inputValue;
    queryWithParams({ tags: tag });
    setInputValue("");
  };

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <h2>SEARCH IMAGES ON FLICKR</h2>
        <TextField
          id="outlined-basic"
          label="Tags"
          variant="outlined"
          placeholder="Enter tag..."
          size="small"
          value={inputValue}
          // ref={inputRef}
          onChange={handleInputChange}
        />
        <Button variant="contained" onClick={handleButtonClick}>
          Search!
        </Button>
      </Box>
    </>
  );
};

export default SearchBox;
