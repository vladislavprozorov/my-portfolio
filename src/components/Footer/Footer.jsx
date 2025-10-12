import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className={styles.footer}>
            <div className="container">
                <p>
                    © {currentYear} Иван Иванов. Сделано с ❤️ и кодом.
                </p>
            </div>
        </footer>
    );
};

export default Footer;