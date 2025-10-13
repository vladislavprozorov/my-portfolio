import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <p className={styles.text}>
                    © {currentYear} vladislavprozorov
                </p>
            </div>
        </footer>
    );
};

export default Footer;