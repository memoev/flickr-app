import { FeedItem } from "../../api/endpoints/public-feed/feedTypes";
import TableFeedList from "./TableFeedList";

type TableListProps = {
  feed?: FeedItem[];
  isLoading: boolean;
  isError: boolean;
};

const FeedList = ({ feed, isLoading, isError }: TableListProps) => {
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
