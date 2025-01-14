import { Routes, Route } from "react-router";
import MovieList from './component/pages/MovieList.jsx'
import MovieDetail from './component/pages/MovieDetail.jsx'
import Navbar from "./component/component/Navbar.jsx";
import Watchlist from "./component/pages/Watchlist.jsx";
import WatchlistProvider from "./context/WatchlistProvider.jsx";

function App() {

  return (
    <>
      <WatchlistProvider>
        <Navbar/>

        <Routes>
          <Route path="/" element={<MovieList />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
          <Route path="/watchlist" element={<Watchlist />} />
        </Routes>
      </WatchlistProvider>
    </>
  );
}

export default App
