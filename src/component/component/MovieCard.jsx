import { useNavigate } from 'react-router';
import styles from './MovieCard.module.css';

const MovieCard = ({ movie }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/movie/${movie.id}`);
    };

    return (
        <div className={styles.card} onClick={handleClick}>
            {movie.adult && <span className={styles.adult}>-18</span>}
            <img 
                className={styles.image}
                src={`https://media.themoviedb.org/t/p/w500/${movie.poster_path}`} 
                alt={movie.title} 
            />
            <h2 className={styles.title}>{movie.title}</h2>
            <div className={styles.details}>
                <span className={styles.rating}>{movie.vote_average}</span>
                <span className={styles.date}>{movie.release_date}</span>
            </div>
        </div>
    );
};

export default MovieCard;