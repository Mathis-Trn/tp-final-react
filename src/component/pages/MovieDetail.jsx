import { useParams, useNavigate } from "react-router";
import { useEffect, useState, useContext } from "react";
import { WatchlistContext } from '../../context/WatchlistProvider.jsx';
import styles from './MovieDetail.module.css';

const MovieDetail = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [similarMovies, setSimilarMovies] = useState([]);
    const { addMovie } = useContext(WatchlistContext);
    const [showPopup, setShowPopup] = useState(false);
    const API_KEY = import.meta.env.VITE_API_KEY;

    const handleSimilarMovieClick = (movieId) => {
        navigate(`/movie/${movieId}`);
    };

    const handleAddMovie = (movie) => {
        addMovie(movie);
        setShowPopup(true);
        setTimeout(() => {
            setShowPopup(false);
        }, 3000);
    };

    useEffect(() => {
        window.scrollTo(0, 0);

        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=fr-FR`)
            .then(response => response.json())
            .then(data => {
                setMovie(data);
                console.log(data);
            })
            .catch(error => {
                console.error("Erreur dans la recherche de film :", error);
            });

        fetch(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=${API_KEY}&language=fr-FR`)
            .then(response => response.json())
            .then(data => {
                setSimilarMovies(data.results);
            })
            .catch(error => {
                console.error("Erreur dans la recherche de films similaires :", error);
            });
    }, [id]);

    if (!movie) {
        return (
            <div className={styles.container}>
                <h1>Chargement...</h1>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>{movie.title}</h1>
            <div className={styles.contentWrapper}>
                <div className={styles.posterContainer}>
                    <img className={styles.poster} src={`https://media.themoviedb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
                    <button className={styles.addButton} onClick={() => handleAddMovie(movie)}>
                        Ajouter à ma Watchlist
                    </button>
                </div>
                <div className={styles.detailsContainer}>
                    <p className={styles.overview}>{movie.overview}</p>
                    <div className={styles.details}>
                        <p><strong>Date de sortie :</strong> {movie.release_date}</p>
                        <p><strong>Notation :</strong> {movie.vote_average}</p>
                        <p><strong>Langue d'origine :</strong> {movie.original_language}</p>
                        <p><strong>Nombre de vote :</strong> {movie.vote_count}</p>
                        <p><strong>Durée :</strong> {movie.runtime} minutes</p>
                        <p><strong>Budget :</strong> ${movie.budget.toLocaleString()}</p>
                        <p><strong>Revenu :</strong> ${movie.revenue.toLocaleString()}</p>
                        <p><strong>Statut :</strong> {movie.status}</p>
                        <p><strong>Tagline :</strong> {movie.tagline}</p>
                        <p><strong>Compagnies de production :</strong> {movie.production_companies.map(company => company.name).join(', ')}</p>
                        <p><strong>Pays de production :</strong> {movie.production_countries.map(country => country.name).join(', ')}</p>
                        <p><strong>Langues parlées :</strong> {movie.spoken_languages.map(language => language.name).join(', ')}</p>
                    </div>
                </div>
            </div>

            {movie.belongs_to_collection && (
                            <div className={styles.collection}>
                                <h2>Collection : {movie.belongs_to_collection.name}</h2>
                                <img src={`https://media.themoviedb.org/t/p/w500/${movie.belongs_to_collection.poster_path}`} alt={movie.belongs_to_collection.name} />
                            </div>
                        )}

            <button className={styles.addButton} onClick={() => handleAddMovie(movie)}>
                Ajouter à ma Watchlist
            </button>

            {showPopup && (
                <div className={styles.popup}>
                    Film ajouté à votre watchlist!
                </div>
            )}
            <div className={styles.similarMovies}>
                <h2>Films similaires</h2>
                <div className={styles.grid}>
                    {similarMovies.map(similarMovie => (
                        <div key={similarMovie.id} className={styles.movieCard} onClick={() => handleSimilarMovieClick(similarMovie.id)} style={{ cursor: 'pointer' }}>
                            <img className={styles.poster} src={`https://media.themoviedb.org/t/p/w200/${similarMovie.poster_path}`} alt={similarMovie.title} />
                            <h3 className={styles.movieTitle}>{similarMovie.title}</h3>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default MovieDetail;