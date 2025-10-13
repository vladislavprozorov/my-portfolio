// src/components/Footer/Footer.jsx

import React from 'react';
import styles from './Footer.module.css';
import { FaGamepad } from 'react-icons/fa';

const Footer = ({ onHintClick, isHackerModeActive }) => {
    const currentYear = new Date().getFullYear();
    const hintClassName = `${styles.easterEggHint} ${isHackerModeActive ? styles.active : ''}`;

    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <p className={styles.text}>
                    © {currentYear} vladislavprozorov
                </p>
                
                <div 
                  className={hintClassName} 
                  title="Переключить Hacker Mode"
                  onClick={onHintClick}
                >
                  {/* ИСПОЛЬЗУЕМ НОВЫЙ КЛАСС ДЛЯ ТЕКСТА */}
                  <span className={styles.hintText}>Пасхалка?</span> 
                  <FaGamepad size={20} /> {/* Слегка уменьшим, чтобы соответствовать тексту */}
                </div>
            </div>
        </footer>
    );
};

export default Footer;