import React from 'react';
import styles from './Contact.module.css';
import { FaGithub, FaTelegram, FaLinkedin } from 'react-icons/fa';

const Contact = () => {
    return (
        <section id="contact" className={styles.contact}>
            <div className="container" data-aos="fade-up">
                <h2 className="section-title">Свяжитесь со мной</h2>
                <p className={styles.contactText}>
                    Я всегда открыт для новых проектов и интересных предложений. <br />
                    Напишите мне, и мы сможем создать что-то потрясающее вместе!
                </p>
                <a href="mailto:your-email@example.com" className="cta-button">
                    your-email@example.com
                </a>
                <div className={styles.socialLinks}>
                    <a 
                        href="https://github.com/your-username" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        aria-label="GitHub"
                    >
                        <FaGithub />
                    </a>
                    <a 
                        href="https://t.me/your-username" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        aria-label="Telegram"
                    >
                        <FaTelegram />
                    </a>
                    <a 
                        href="https://linkedin.com/in/your-username" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        aria-label="LinkedIn"
                    >
                        <FaLinkedin />
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Contact;