import "./App.css";
import FeedList from "./pages/feed-list/FeedList.page";
import SearchBox from "./components/SearchBox";

export const App = () => {
  return (
    <div className="App">
      <div className="Search">
        <SearchBox />
      </div>
      <FeedList />
    </div>
  );
};

export default App;
