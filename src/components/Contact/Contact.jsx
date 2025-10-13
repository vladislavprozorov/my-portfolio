// src/components/Contact/Contact.jsx (Мобильно-оптимизированная версия)

import React from 'react';
import styles from './Contact.module.css';
import { FaGithub, FaTelegram, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const Contact = () => {
    const email = "skayterder@vk.com"; // Вынесем email в переменную для удобства
    
    return (
        <section id="contact" className={styles.contact}>
            <div className="container" data-aos="fade-up">
                <h2 className="section-title">Свяжитесь со мной</h2>
                <p className={styles.contactText}>
                    Я всегда открыт для новых проектов и интересных предложений.
                    <br className={styles.breakLine} />
                    Напишите мне, и мы сможем создать что-то потрясающее вместе!
                </p>
                
                {/* Email кнопка с иконкой */}
                <a 
                    href={`mailto:${email}`} 
                    className={`cta-button ${styles.emailButton}`}
                >
                    <FaEnvelope className={styles.emailIcon} />
                    <span>{email}</span>
                </a>
                
                {/* Социальные ссылки */}
                <div className={styles.socialLinks}>
                    <a 
                        href="https://github.com/vladislavprozorov" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        aria-label="GitHub"
                        className={styles.socialLink}
                    >
                        <FaGithub />
                        <span className={styles.socialLabel}>GitHub</span>
                    </a>
                    <a 
                        href="https://t.me/mscnever" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        aria-label="Telegram"
                        className={styles.socialLink}
                    >
                        <FaTelegram />
                        <span className={styles.socialLabel}>Telegram</span>
                    </a>
                    <a 
                        href="https://linkedin.com/in/vladislavprozorov" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        aria-label="LinkedIn"
                        className={styles.socialLink}
                    >
                        <FaLinkedin />
                        <span className={styles.socialLabel}>LinkedIn</span>
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Contact;