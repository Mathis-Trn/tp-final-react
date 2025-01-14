import { Link } from "react-router";
import style from './Navbar.module.css';

const Navbar = () => {
    return (
        <nav className={style.navbar}>
            <Link to="/" className={style.link}>Accueil</Link>
            <Link to="/watchlist" className={style.link}>Ma Watchlist</Link>
        </nav>
    );
};

export default Navbar;