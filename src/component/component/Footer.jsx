import style from './Footer.module.css';

const Footer = () => {
    const year = new Date().getFullYear();
    
    return (
        <footer className={style.footer}>
            <p>© {year} Movie App. Tous droits réservés.</p>
        </footer>
    );
};

export default Footer;