import { Link } from "react-router";
import style from './Navbar.module.css';

const Navbar = () => {
    return (
        <nav className={style.navbar}>
            <Link to="/" className={style.link}>Accueil</Link>
        </nav>
    );
};

export default Navbar;