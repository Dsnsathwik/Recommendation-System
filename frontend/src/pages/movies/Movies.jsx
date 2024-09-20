import MovieGrid from "../../components/moviesGrid/movieGrid"
import Navbar from "../../components/navbar/navbar"
import SearchBar from "../../components/searchBar/searchBar"

const Movies = () => {
      
    return (
        <>
            <Navbar/>
            <SearchBar/>
            <MovieGrid moviesPerRow={4} />
        </>
    )
}

export default Movies