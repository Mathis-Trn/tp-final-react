import { Routes, Route } from "react-router";
import MovieList from './component/pages/MovieList.jsx'
import MovieDetail from './component/pages/MovieDetail.jsx'
import Navbar from "./component/component/Navbar.jsx";

function App() {

  return (
    <>
      <Navbar/>

      <Routes>
        <Route path="/" element={<MovieList />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
      </Routes>
    </>
  );
}

export default App
