import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import FeedList from "./pages/feed-list/FeedList.page";
import SearchBox from "./components/SearchBox";

const queryClient = new QueryClient();

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <SearchBox />
      </div>
    </QueryClientProvider>
  );
};

export default App;
