import styles from './MovieList.module.css';
import MovieCard from '../component/MovieCard.jsx';
import { useState, useEffect } from 'react';

const MovieList = () => {
    const [movies, setMovies] = useState([]);
    const API_KEY = import.meta.env.VITE_API_KEY;

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=fr-FR&page=1`)
            .then(response => response.json())
            .then(data => {
                setMovies(data.results);
                console.log(data.results);
            })
            .catch(error => {
                console.error("Error fetching movies:", error);
            });
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.grid}>
                {movies.map((movie, index) => (
                    <MovieCard key={index} movie={movie} />
                ))}
            </div>
        </div>
    );
};

export default MovieList;