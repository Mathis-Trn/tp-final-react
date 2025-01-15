import { useContext, useState } from 'react';
import { WatchlistContext } from '../../context/WatchlistProvider.jsx';
import MovieCard from '../component/MovieCard.jsx';
import style from './Watchlist.module.css';

const Watchlist = () => {
    const { watchlist, removeMovie } = useContext(WatchlistContext);
    const [showPopup, setShowPopup] = useState(false);

    const handleRemoveMovie = (movieId) => {
        removeMovie(movieId);
        setShowPopup(true);
        setTimeout(() => {
            setShowPopup(false);
        }, 3000);
    };

    let emptyWatchlist = "";

    if (watchlist.length === 0) {
        emptyWatchlist = "Votre watchlist est vide";
    }

    return (
        <div className={style.container}>
            <h1 className={style.title}>Ma Watchlist</h1>
            <p className={style.emptyMessage}>{emptyWatchlist}</p>
            <div className={style.grid}>
                {watchlist.map(movie => (
                    <div key={movie.id} className={style.movieCard}>
                        <MovieCard movie={movie} />
                        <button className={style.removeButton} onClick={() => handleRemoveMovie(movie.id)}>Retirer</button>
                    </div>
                ))}
            </div>
            {showPopup && (
                <div className={style.popup}>
                    Film retiré de votre watchlist!
                </div>
            )}
        </div>
    );
}

export default Watchlist;