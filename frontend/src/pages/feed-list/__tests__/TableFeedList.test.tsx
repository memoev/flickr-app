import { render, screen, fireEvent } from "@testing-library/react";
import TableFeedList from "../TableFeedList";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FeedItems } from "../../../api/endpoints/public-feed/feedTypes";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 0,
    },
  },
});

const testData: FeedItems = [];

test("validate all headers are present", () => {
  render(
    <QueryClientProvider client={queryClient}>
      <TableFeedList feeds={testData} />
    </QueryClientProvider>
  );
  const titleElement = screen.getByText(/Title/i);
  const imageElement = screen.getByText(/Image/i);
  const tagsElement = screen.getByText(/Tags/i);

  expect(titleElement).toBeInTheDocument();
  expect(imageElement).toBeInTheDocument();
  expect(tagsElement).toBeInTheDocument();
});

test("validate a feed record generates a row", () => {
  testData.push({
    title: "SomeRandomTitle",
    tags: ["tag1", "tag2"],
    link: "https://picsum.photos/200/300",
  });
  render(
    <QueryClientProvider client={queryClient}>
      <TableFeedList feeds={testData} />
    </QueryClientProvider>
  );
  const titleElement = screen.getByText(/SomeRandomTitle/i);
  const imgElement = screen.getByAltText(/SomeRandomTitle/i);
  const tag1Element = screen.getByText(/tag1/i);

  expect(titleElement).toBeInTheDocument();
  expect(imgElement).toBeInTheDocument();
  expect(tag1Element).toBeInTheDocument();
});
