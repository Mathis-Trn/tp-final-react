import { useParams } from "react-router";
import { useEffect, useState } from "react";
import styles from './MovieDetail.module.css';

const MovieDetail = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const API_KEY = import.meta.env.VITE_API_KEY;

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=fr-FR`)
            .then(response => response.json())
            .then(data => {
                setMovie(data);
                console.log(data);
            })
            .catch(error => {
                console.error("Erreur dans la recherche de film :", error);
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
            <img className={styles.poster} src={`https://media.themoviedb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
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
                {movie.belongs_to_collection && (
                    <div className={styles.collection}>
                        <h2>Collection : {movie.belongs_to_collection.name}</h2>
                        <img src={`https://media.themoviedb.org/t/p/w500/${movie.belongs_to_collection.poster_path}`} alt={movie.belongs_to_collection.name} />
                    </div>
                )}
            </div>
        </div>
    );
}

export default MovieDetail;