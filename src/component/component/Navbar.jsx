import { Link } from "react-router";
import { useContext } from 'react';
import { WatchlistContext } from '../../context/WatchlistProvider.jsx';
import style from './Navbar.module.css';

const Navbar = () => {
    const { watchlist } = useContext(WatchlistContext);

    return (
        <nav className={style.navbar}>
            <Link to="/" className={style.link}>Accueil</Link>
            <Link to="/watchlist" className={style.link}>
                Ma Watchlist ({watchlist.length})
            </Link>
        </nav>
    );
};

export default Navbar;