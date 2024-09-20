import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/home/Home";
import Search from "./pages/search/Search";
import Movies from "./pages/movies/Movies"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/movies" element={<Movies/>}/>
        <Route path="/results" element={<Search/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
