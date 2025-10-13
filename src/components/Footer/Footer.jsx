// src/components/Footer/Footer.jsx

import React from 'react';
import styles from './Footer.module.css';
import { FaGamepad, FaFilePdf, FaFileAlt } from 'react-icons/fa';

const Footer = ({ onHintClick, isHackerModeActive }) => {
    const currentYear = new Date().getFullYear();
    const hintClassName = `${styles.easterEggHint} ${isHackerModeActive ? styles.active : ''}`;

    return (
        <footer className={styles.footer}>
                        <div className={styles.container}>
                                <p className={styles.text}>
                                        © {currentYear} vladislavprozorov
                                </p>

                                <div className={styles.cvLinks}>
                                    <a href={`${import.meta.env.BASE_URL}CV.pdf`} target="_blank" rel="noopener noreferrer" className={styles.cvLink} title="Скачать резюме (PDF)">
                                        <FaFilePdf /> <span>PDF</span>
                                    </a>
                                    <a href={`${import.meta.env.BASE_URL}CV-ATS.txt`} target="_blank" rel="noopener noreferrer" className={styles.cvLink} title="Открыть ATS-версию (TXT)">
                                        <FaFileAlt /> <span>ATS</span>
                                    </a>
                                </div>

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