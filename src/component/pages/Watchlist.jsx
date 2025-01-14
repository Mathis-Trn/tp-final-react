import { useContext } from 'react';
import { WatchlistContext } from '../../context/WatchlistProvider.jsx';
import MovieCard from '../component/MovieCard.jsx';
import style from './Watchlist.module.css';

const Watchlist = () => {
    const { watchlist, removeMovie } = useContext(WatchlistContext);

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
                        <button className={style.removeButton} onClick={() => removeMovie(movie.id)}>Retirer</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Watchlist;