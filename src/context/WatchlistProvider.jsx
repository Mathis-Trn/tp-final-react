import { createContext, useState, useEffect } from 'react';

export const WatchlistContext = createContext();

const WatchlistProvider = ({ children }) => {
    const [watchlist, setWatchlist] = useState(() => {
        const savedWatchlist = localStorage.getItem('watchlist');
        return savedWatchlist ? JSON.parse(savedWatchlist) : [];
    });

    useEffect(() => {
        localStorage.setItem('watchlist', JSON.stringify(watchlist));
    }, [watchlist]);

    const addMovie = (movie) => {
        const isMovieInWatchlist = watchlist.some(item => item.id === movie.id);
        if (!isMovieInWatchlist) {
            setWatchlist([...watchlist, movie]);
        } else {
            console.error("Le film est déjà dans la watchlist");
        }
    };

    const removeMovie = (id) => {
        setWatchlist(watchlist.filter(movie => movie.id !== id));
    };

    return (
        <WatchlistContext.Provider value={{ watchlist, addMovie, removeMovie }}>
            {children}
        </WatchlistContext.Provider>
    );
}

export default WatchlistProvider;