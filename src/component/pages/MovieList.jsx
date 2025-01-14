import styles from './MovieList.module.css';
import MovieCard from '../component/MovieCard.jsx';
import { useState, useEffect } from 'react';

const MovieList = () => {
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);
    const API_KEY = import.meta.env.VITE_API_KEY;

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=fr-FR&page=${page}`)
            .then(response => response.json())
            .then(data => {
                setMovies(data.results);
                console.log(data.results);
            })
            .catch(error => {
                console.error("Erreur dans la recherche de film :", error);
            });
    }, [page]);

    const handleNextPage = () => {
        setPage(prevPage => prevPage + 1);
    };

    const handlePreviousPage = () => {
        setPage(prevPage => Math.max(prevPage - 1, 1));
    };

    return (
        <div className={styles.container}>
            <div className={styles.grid}>
                {movies.map((movie, index) => (
                    <MovieCard key={index} movie={movie} />
                ))}
            </div>
            <div className={styles.pagination}>
                <button onClick={handlePreviousPage} disabled={page === 1}>Précédent</button>
                <span>Page {page}</span>
                <button onClick={handleNextPage}>Suivant</button>
            </div>
        </div>
    );
};

export default MovieList;