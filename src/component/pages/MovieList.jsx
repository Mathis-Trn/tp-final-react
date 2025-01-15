import styles from './MovieList.module.css';
import MovieCard from '../component/MovieCard.jsx';
import { useState, useEffect, useCallback } from 'react';
import debounce from 'lodash.debounce';

const MovieList = () => {
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);
    const [category, setCategory] = useState('popular');
    const [searchQuery, setSearchQuery] = useState('');
    const API_KEY = import.meta.env.VITE_API_KEY;

    const fetchMovies = (query = '') => {
        const baseUrl = 'https://api.themoviedb.org/3';
        const url = query 
            ? `${baseUrl}/search/movie?api_key=${API_KEY}&language=fr-FR&query=${query}&page=${page}`
            : `${baseUrl}/movie/${category}?api_key=${API_KEY}&language=fr-FR&page=${page}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                setMovies(data.results);
            })
            .catch(error => {
                console.error("Erreur dans la recherche de film :", error);
            });
    };

    const debouncedSearch = useCallback(
        debounce((query) => {
            setPage(1);
            fetchMovies(query);
        }, 500),
        []
    );

    useEffect(() => {
        if (searchQuery) {
            debouncedSearch(searchQuery);
        } else {
            fetchMovies();
        }
        return () => debouncedSearch.cancel();
    }, [searchQuery, page, category]);

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleNextPage = () => {
        setPage(prevPage => prevPage + 1);
    };

    const handlePreviousPage = () => {
        setPage(prevPage => Math.max(prevPage - 1, 1));
    };

    const handleCategoryChange = (newCategory) => {
        setCategory(newCategory);
        setPage(1);
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Ma liste de film</h1>
            <div className={styles.searchBar}>
                <input
                    type="text"
                    placeholder="Rechercher un film..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className={styles.searchInput}
                />
            </div>
            {!searchQuery && (
                <div className={styles.categories}>
                    <button className={category === 'now_playing' ? styles.active : ''} onClick={() => handleCategoryChange('now_playing')}>
                        À l'affiche
                    </button>
                    <button className={category === 'popular' ? styles.active : ''} onClick={() => handleCategoryChange('popular')}>
                        Populaire
                    </button>
                    <button className={category === 'top_rated' ? styles.active : ''} onClick={() => handleCategoryChange('top_rated')}>
                        Les mieux notés
                    </button>
                    <button className={category === 'upcoming' ? styles.active : ''} onClick={() => handleCategoryChange('upcoming')}>
                        À venir
                    </button>
                </div>
            )}
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