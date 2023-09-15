import { useGetFeedEndpoint } from "../../api/endpoints/public-feed/feedGetApi";
import TableFeedList from "./TableFeedList";

const FeedList = () => {
  const { data: feed, isLoading, isError } = useGetFeedEndpoint();

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : isError ? (
        <div>Error</div>
      ) : feed?.length === 0 ? (
        <div>No feeds</div>
      ) : (
        feed && <TableFeedList feeds={feed} />
      )}
    </div>
  );
};

export default FeedList;
