import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SearchResults from "./components/SearchResults";
import ContentDetails from "./components/ContentDetails";
import Movies from "./components/Movies";
import TVShows from "./components/TVShows";

function App() {
  return (
      <BrowserRouter>
      <Header/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/search/:searchTerm" element={<SearchResults/>}/>
          <Route path="/:type/:id" element={<ContentDetails />} />
          <Route path="/movie" element={<Movies/>}/>
          <Route path="/tv" element={<TVShows/>}/>
        </Routes>
        <Footer/>
      </BrowserRouter>
  );
}

export default App;
