import { Routes, Route } from "react-router";
import MovieList from './component/pages/MovieList.jsx'
import { Link } from "react-router";

function App() {

  return (
    <>
      <nav>
        <Link to="/">Accueil</Link>
      </nav>

      <Routes>
        <Route path="/" element={<MovieList />} />
      </Routes>
    </>
  );
}

export default App
